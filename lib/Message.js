const Helpers = require('./utils/helpers');
const franc = require('franc');
const natural = require('natural');
const compromise = require('compromise');
const Base = require('./Base');

class Message {
    constructor(text = '', quickReplies = [], buttons = [], attachment = null) {
        this._text = text;
        this._quick_replies = quickReplies;
        this._buttons = buttons;
        this._lang = null;
        this._attachment = attachment;
        this.sentiment = null;
        this._metadata = null;
    }

    static from(obj) {
        let message = new Message(obj.text, obj.quick_replies, obj.buttons, obj.attachment);
        // message.metadata = obj.metadata || null;
        delete obj.text;
        //return Object.assign(message, obj);
        return message;
    }

    get metadata() {
        return this._metadata;
    }

    set metadata(value) {
        this._metadata = value;
    }

    get attachment() {
        return this._attachment;
    }

    set attachment(value) {
        this._attachment = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
        this._lang = franc(value);
    }

    isText() {
        return Helpers.isNotEmpty(this.text);
    }

    isAttachment() {
        return this.attachment.length > 1;
    }

    set lang(value) {
        this._lang = value;
        // French
        if (value === 'fra') {
            const sentimentFr = require('sentiment-french');
            this.sentiment = sentimentFr(this.text);
        }
        // English
        else if (value === 'eng') {
            const sentiment = require('Sentimental');
            this.sentiment = sentiment.analyse(this.text);
        }
        // Malagasy
        else if (value === 'plt') {

        }
    }

    get lang() {
        return this._lang;
    }

    get quick_replies() {
        return this._quick_replies;
    }

    set quick_replies(value) {
        if (Helpers.isArray(values))
            this._quick_replies = value;
        else
            this._quick_replies.push(value);
    }

    get buttons() {
        return this._buttons;
    }

    set buttons(value) {
        if (Helpers.isArray(value))
            this._buttons = value;
        else
            this._buttons.push(value);
    }

    toString() {
        let msg = {};
        if (Helpers.isNotEmpty(this._text))
            msg.text = this._text;
        if (Helpers.isNotEmpty(this._quick_replies))
            msg.quickReplies = this._quick_replies;
        if (Helpers.isNotEmpty(this._metadata))
            msg.metadata = this._metadata;
        if (Helpers.isNotEmpty(this._attachment))
            msg.attachment = this._attachment;
        return msg;
    }

    static ACTION() {
        return {
            READED: 'mark_seen',
            TYPING_ON: 'typing_on',
            TYPING_OFF: 'typing_off'
        };
    }

    static ATTACHMENT_TYPE() {
        return {
            IMAGE: 'image',
            AUDIO: 'audio',
            VIDEO: 'video',
            FILE: 'file',
            TEMPLATE: 'template',
            LOCATION: 'location'
        };
    }
}



module.exports = Message;