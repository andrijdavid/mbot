'use strict';

const Chat = require('./Chat');
const Conversation = require('./Conversation');
const EventEmitter = require('eventemitter3');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Message = require('./Message');
const fetch = require('node-fetch');
const normalizeString = require('./utils/normalize-string');
const helpers = require('./utils/helpers');
const lt = require('localtunnel');
const isOnline = require('is-online');
const Sentiment = require('./Sentiment');
const path = require("path");
const fs = require("fs");
const FB = require('fb');
const Tokenizer = require('sentence-tokenizer');

class MBot extends EventEmitter {

    constructor(options) {
        super();
        if (!options || (options && (!options.accessToken || !options.verifyToken || !options.appSecret || !options.name ))) {
            throw new Error('You need to specify a name, accessToken, verifyToken and appSecret');
        }
        this.subdomain = options.subdomain;
        this.accessToken = options.accessToken;
        this.verifyToken = options.verifyToken;
        this.appSecret = options.appSecret;
        this.name = options.name;
        this.typinginterval = options.typingInterval || 1345;
        this.broadcastEchoes = options.broadcastEchoes || false;
        this.app = express();
        this.app.use(bodyParser.json({verify: this._verifyRequestSignature.bind(this)}));
        this._hearMap = [];
        this._conversations = [];
        this._fb = new FB.Facebook(options);

    }

    start(port) {
        this._initWebhook();
        this.app.set('port', process.env.PORT || port || 3000);
        this.server = this.app.listen(this.app.get('port'), () => {
            const portNum = this.app.get('port');
            console.log('MBot running on port', portNum);
            console.log(`Facebook Webhook running on localhost:${portNum}/webhook`);
            isOnline().then(online => {
                if (online)
                    this._exposes(portNum);
            }).catch(err => console.error(error));

        });
    }

    __init() {
        if (fs.existsSync('modules'))
            this.loadAllModule();

    }

    loadAllModule(moduleDir = "modules") {
        console.info('Loading all modules in ' + moduleDir);
        const normalizedPath = path.join(__dirname, moduleDir);
        fs.readdirSync(normalizedPath).forEach(function (file) {
            this.module(require("./" + moduleDir + "/" + file));
        });
    }

    post(post, callback) {
        this._fb.api('me/feed', 'post', { message: post }, function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log('Post Id: ' + res.id);
            callback(res);

        });
    }

    // exposes your localhost to the world for easy testing and sharing!
    _exposes(port) {
        let opts = {};
        if (this.subdomain)
            opts.subdomain = this.subdomain;
        const tunnel = lt(port, opts, function (err, tunnel) {
            if (err) {
                console.error(`Localtunnel Error ${err}`);
            }
            // the assigned public url for your tunnel
            // i.e. https://abcdefgjhij.localtunnel.me
            console.log(`Facebook Webhook also running on: ${tunnel.url}`);
        });

        tunnel.on('error', function (error) {
            console.error(`Localtunnel Error ${error}`);
        });

        tunnel.on('close', function () {
            // tunnels are closed
            console.info('Your way to the internet was closed :(');
        });
    }

    close() {
        this.server.close();
    }

    sendTextMessage(recipientId, text, quickReplies, options) {
        const message = {text};
        const formattedQuickReplies = this._formatQuickReplies(quickReplies);
        if (formattedQuickReplies && formattedQuickReplies.length > 0) {
            message.quick_replies = formattedQuickReplies;
        }
        this.sendTypingIndicator(recipientId, 1015);
        return this.sendMessage(recipientId, message, options);
    }

    sendButtonTemplate(recipientId, text, buttons, options) {
        const payload = {
            template_type: 'button',
            text
        };
        const formattedButtons = this._formatButtons(buttons);
        payload.buttons = formattedButtons;
        return this.sendTemplate(recipientId, payload, options);
    }

    sendGenericTemplate(recipientId, elements, options) {
        const payload = {
            template_type: 'generic',
            elements
        };
        return this.sendTemplate(recipientId, payload, options);
    }

    sendTemplate(recipientId, payload, options) {
        const message = {
            attachment: {
                type: 'template',
                payload
            }
        };
        return this.sendMessage(recipientId, message, options);
    }

    sendAttachment(recipientId, type, url, quickReplies, options) {
        const message = {
            attachment: {
                type,
                payload: {url}
            }
        };
        const formattedQuickReplies = this._formatQuickReplies(quickReplies);
        if (formattedQuickReplies && formattedQuickReplies.length > 0) {
            message.quick_replies = formattedQuickReplies;
        }
        return this.sendMessage(recipientId, message, options);
    }

    sendAction(recipientId, action, options) {
        return this.sendRequest({
            recipient: {
                id: recipientId
            },
            sender_action: action
        });
    }

    sendMessage(recipientId, message, options) {
        if (message.text.length < 620)
            return this.__sendOneMessage(recipientId, message, options);
        else {
            let tokenizer = new Tokenizer('Chuck');

            tokenizer.setEntry(message.text);
            let messages = tokenizer.getSentences();
            let length = 0;
            let msg = [];
            let fmsg = '';
            for (let i = 0; i < messages.length; i++) {
                fmsg += messages[i] + ' ';
                length += messages[i] + 1;
                if (length > 400) {
                    message.text = fmsg;
                    msg.push(message);
                    fmsg = '';
                    length = 0;
                }
            }
            return this.sendTypingIndicator(recipientId, this.typinginterval).then(() => this.__sendMultipleMessageOnce(recipientId, msg, options)).catch(err => console.error( err));
        }
    }

    __sendMultipleMessageOnce(recipientId, message, options) {
        if (Array.isArray(message))
        {
            let set = new Set();
            for(let i = 0; i < message.length; i++){
                set.add(this.__sendOneMessage(recipientId, message[i], options));
            }
            return set;
        }
        return this.__sendOneMessage(recipientId, message, options);

    }

    __sendOneMessage(recipientId, message, options) {
        const onDelivery = options && options.onDelivery;
        const onRead = options && options.onRead;
        const req = () => (
            this.sendRequest({
                recipient: {
                    id: recipientId
                },
                message
            }).then((json) => {
                if (typeof onDelivery === 'function') {
                    this.once('delivery', onDelivery);
                }
                if (typeof onRead === 'function') {
                    this.once('read', onRead);
                }
                return json;
            }).catch(err => console.error(err))
        );
        if (options && options.typing) {
            const autoTimeout = (message && message.text) ? message.text.length * 10 : 1000;
            const timeout = (typeof options.typing === 'number') ? options.typing : autoTimeout;
            return this.sendTypingIndicator(recipientId, timeout).then(req).catch(err => console.error( err));
        }
        return req();
    }

    sendRequest(body, endpoint, method) {
        endpoint = endpoint || 'messages';
        method = method || 'POST';
        return fetch(`https://graph.facebook.com/v2.6/me/${endpoint}?access_token=${this.accessToken}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .catch(err => console.error(`Error sending message: ${err}`));
    }

    sendThreadRequest(body, method) {
        return this.sendRequest(body, 'thread_settings', method);
    }

    sendTypingIndicator(recipientId, milliseconds) {
        const timeout = isNaN(milliseconds) ? 0 : milliseconds;
        if (milliseconds > 20000) {
            milliseconds = 20000;
            console.error('sendTypingIndicator: max milliseconds value is 20000 (20 seconds)');
        }
        return new Promise((resolve, reject) => {
            return this.sendAction(recipientId, 'typing_on').then(() => {
                setTimeout(() => this.sendAction(recipientId, 'typing_off').then((json) => resolve(json)).catch(err=> console.error(err)), timeout);
            }).catch(err => console.error('sendTypyingIndicator Error',err));
        });
    }

    getUserProfile(userId) {
        const url = `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${this.accessToken}`;
        return fetch(url)
            .then(res => res.json())
            .catch(err => console.log(`Error getting user profile: ${err}`));
    }

    setGreetingText(text) {
        return this.sendThreadRequest({
            setting_type: 'greeting',
            greeting: {text}
        });
    }

    setGetStartedButton(action) {
        const payload = (typeof action === 'string') ? action : 'BOOTBOT_GET_STARTED';
        if (typeof action === 'function') {
            this.on(`postback:${payload}`, action);
        }
        return this.sendThreadRequest({
            setting_type: 'call_to_actions',
            thread_state: 'new_thread',
            call_to_actions: [{payload}]
        });
    }

    deleteGetStartedButton() {
        return this.sendThreadRequest({
            setting_type: 'call_to_actions',
            thread_state: 'new_thread'
        }, 'DELETE');
    }

    setPersistentMenu(buttons) {
        const formattedButtons = this._formatButtons(buttons);
        return this.sendThreadRequest({
            setting_type: 'call_to_actions',
            thread_state: 'existing_thread',
            call_to_actions: formattedButtons
        });
    }

    deletePersistentMenu() {
        return this.sendThreadRequest({
            setting_type: 'call_to_actions',
            thread_state: 'existing_thread'
        }, 'DELETE');
    }

    say(recipientId, message, options) {
        if (Array.isArray(message)) {
            let set = new Set();
            for (let i = 0; i < message.length; i++) {
                set.add(this.__sayOne(recipientId, message[i], options));
            }
            return set;
        }
        else {
            return this.__sayOne(recipientId, message, options);
        }
    }

    __sayOne(recipientId, message, options) {
        if (typeof message === 'string') {
            return this.sendTextMessage(recipientId, message, [], options);
        } else if (message && message.text) {
            if (message.quickReplies && message.quickReplies.length > 0) {
                return this.sendTextMessage(recipientId, message.text, message.quickReplies, options);
            } else if (message.buttons && message.buttons.length > 0) {
                return this.sendButtonTemplate(recipientId, message.text, message.buttons, options);
            } else {
                return this.sendTextMessage(recipientId, message, [], options);
            }
        } else if (message && message.attachment) {
            return this.sendAttachment(recipientId, message.attachment, message.url, message.quickReplies, options);
        }
        console.error('Invalid format for .say() message.');
    }

    hear(keywords, callback) {
        keywords = Array.isArray(keywords) ? keywords : [keywords];
        keywords.forEach(keyword => this._hearMap.push({keyword, callback}));
        return this;
    }

    module(factory) {
        return factory.apply(this, [this]);
    }

    conversation(recipientId, factory) {
        if (!recipientId || !factory || typeof factory !== 'function') {
            return console.error(`You need to specify a recipient and a callback to start a conversation`);
        }
        const convo = new Conversation(this, recipientId);
        this._conversations.push(convo);
        convo.on('end', (endedConvo) => {
            const removeIndex = this._conversations.indexOf(endedConvo);
            this._conversations.splice(removeIndex, 1);
        });
        factory.apply(this, [convo]);
        return convo;
    }

    _formatButtons(buttons) {
        return buttons && buttons.map((button) => {
                if (typeof button === 'string') {
                    return {
                        type: 'postback',
                        title: button,
                        payload: 'BOOTBOT_BUTTON_' + normalizeString(button)
                    };
                } else if (button && button.title) {
                    return button;
                }
                return {};
            });
    }

    _formatQuickReplies(quickReplies) {
        return quickReplies && quickReplies.map((reply) => {
                if (typeof reply === 'string') {
                    return {
                        content_type: 'text',
                        title: reply,
                        payload: 'BOOTBOT_QR_' + normalizeString(reply)
                    };
                } else if (reply && reply.title) {
                    return Object.assign({
                        content_type: 'text',
                        payload: 'BOOTBOT_QR_' + normalizeString(reply.title)
                    }, reply);
                }
                return reply;
            });
    }

    _handleEvent(type, event, data) {
        const chat = new Chat(this, event.sender.id);
        this.emit(type, event, chat, data);
    }

    _handleMessageEvent(event) {
        console.log('Event', event);
        event.message = Message.from(event.message);
        if (this._handleConversationResponse('message', event)) {
            return;
        }
        const text = event.message.text;
        const senderId = event.sender.id;
        let captured = false;
        if (!text) {
            return;
        }

        this._hearMap.forEach(hear => {
            if (typeof hear.keyword === 'string' && hear.keyword.toLowerCase() === text.toLowerCase()) {
                const res = hear.callback.apply(this, [event, new Chat(this, senderId), {
                    keyword: hear.keyword,
                    captured
                }]);
                captured = true;
                return res;
            } else if (hear.keyword instanceof RegExp && hear.keyword.test(text)) {
                const res = hear.callback.apply(this, [event, new Chat(this, senderId), {
                    keyword: hear.keyword,
                    match: text.match(hear.keyword),
                    captured
                }]);
                captured = true;
                return res;
            }
        });

        this._handleEvent('message', event, {captured});
    }

    _handleAttachmentEvent(event) {
        if (this._handleConversationResponse('attachment', event)) {
            return;
        }
        this._handleEvent('attachment', event);
    }

    _handlePostbackEvent(event) {
        if (this._handleConversationResponse('postback', event)) {
            return;
        }
        const payload = event.postback.payload;
        if (payload) {
            this._handleEvent(`postback:${payload}`, event);
        }
        this._handleEvent('postback', event);
    }

    _handleQuickReplyEvent(event) {
        if (this._handleConversationResponse('quick_reply', event)) {
            return;
        }
        const payload = event.message.quick_reply && event.message.quick_reply.payload;
        if (payload) {
            this._handleEvent(`quick_reply:${payload}`, event);
        }
        this._handleEvent('quick_reply', event);
    }

    _handleConversationResponse(type, event) {
        const userId = event.sender.id;
        let captured = false;
        this._conversations.forEach(convo => {
            if (userId && userId === convo.userId && convo.isActive()) {
                captured = true;
                return convo.respond(event, {type});
            }
        });
        return captured;
    }

    _initWebhook() {
        this.app.get('/webhook', (req, res) => {
            if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === this.verifyToken) {
                console.log('Validation Succeded.')
                res.status(200).send(req.query['hub.challenge']);
            } else {
                console.error('Failed validation. Make sure the validation tokens match.');
                res.sendStatus(403);
            }
        });

        this.app.post('/webhook', (req, res) => {
            var data = req.body;
            if (data.object !== 'page') {
                return;
            }

            // Iterate over each entry. There may be multiple if batched.
            data.entry.forEach((entry) => {
                // Iterate over each messaging event
                entry.messaging.forEach((event) => {
                    if (event.message && event.message.is_echo && !this.broadcastEchoes) {
                        return;
                    }
                    if (event.optin) {
                        this._handleEvent('authentication', event);
                    } else if (event.message && event.message.text) {
                        this._handleMessageEvent(event);
                        if (event.message.quick_reply) {
                            this._handleQuickReplyEvent(event);
                        }
                    } else if (event.message && event.message.attachments) {
                        this._handleAttachmentEvent(event);
                    } else if (event.postback) {
                        this._handlePostbackEvent(event);
                    } else if (event.delivery) {
                        this._handleEvent('delivery', event);
                    } else if (event.read) {
                        this._handleEvent('read', event);
                    } else if (event.account_linking) {
                        this._handleEvent('account_linking', event);
                    } else {
                        console.log('Webhook received unknown event: ', event);
                    }
                });
            });

            // Must send back a 200 within 20 seconds or the request will time out.
            res.sendStatus(200);
        });
    }

    _verifyRequestSignature(req, res, buf) {
        var signature = req.headers['x-hub-signature'];
        if (!signature) {
            throw new Error('Couldn\'t validate the request signature.');
        } else {
            var elements = signature.split('=');
            var method = elements[0];
            var signatureHash = elements[1];
            var expectedHash = crypto.createHmac('sha1', this.appSecret)
                .update(buf)
                .digest('hex');

            if (signatureHash != expectedHash) {
                throw new Error("Couldn't validate the request signature.");
            }
        }
    }

    getExpress() {
        return this.app;
    }

}

module.exports = MBot;
