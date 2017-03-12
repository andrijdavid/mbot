'use strict';
import EventEmitter from 'eventemitter3';
import Message from './Message';
import UpperCaseResponsePreprocessor from "./ResponsePreprocessor/UpperCaseResponsePreprocessor";
import Sentiment from './Sentiment';

export default class Chat extends EventEmitter {
    constructor(bot, userId) {
        super();
        if (!bot || !userId) {
            throw new Error('You need to specify a MBot instance and a userId');
        }
        this.bot = bot;
        this.userId = userId;
        this._sentiment = new Sentiment(this);
        this._responsePreprocessor = [];
        this.__init();
    }

    __init() {
        this._sentiment.on('veryAngry', () => {
            this._responsePreprocessor = [
                UpperCaseResponsePreprocessor
            ];
        });

        this._sentiment.on('angry', () => {
            this._responsePreprocessor = [
                UpperCaseResponsePreprocessor
            ];
        });

        this._sentiment.on('neutral', () => {
            this._responsePreprocessor = [];
        });

        this._sentiment.on('happy', () => {
            this._responsePreprocessor = [];
        });

        this._sentiment.on('veryHappy', () => {
            this._responsePreprocessor = [];
        });
    }

    say(message, options) {
        message = this.beforeSend(message);
        return this.bot.say(this.userId, message, options);
    }

    sendVideoMessage(message, options) {
        message = this.beforeSend(message);
        return this.bot.sendVideoMessage(this.userId, message, options);
    }

    sendAudioMessage(message, options){
        message = this.beforeSend(message);
        return this.bot.sendAudioMessage(this.userId, message, options);
    }

    sendImageMessage(message, options){

        message = this.beforeSend(message);
        return this.bot.sendImageMessage(this.userId, message, options);
    }

    sendFileMessage(message, options){
        message = this.beforeSend(message);
        return this.bot.sendFileMessage(this.userId, message, options);
    }

    sendAttachment(message, options){
        message = this.beforeSend(message);
        return this.bot.sendAttachmentMessage(this.userId, message, options);
    }

    sendTextMessage(text, quickReplies, options) {
        text = this.beforeSend(text);

        return this.bot.sendTextMessage(this.userId, text, quickReplies, options);
    }

    sendButtonTemplate(text, buttons, options) {
        return this.bot.sendButtonTemplate(this.userId, text, buttons, options);
    }

    sendGenericTemplate(cards, options) {
        return this.bot.sendGenericTemplate(this.userId, cards, options);
    }

    sendTemplate(payload, options) {
        return this.bot.sendTemplate(this.userId, payload, options);
    }

    sendAttachment(type, url, quickReplies, options) {
        return this.bot.sendAttachment(this.userId, type, url, quickReplies, options);
    }

    sendAction(action, options) {
        return this.bot.sendAction(this.userId, action, options);
    }

    sendMessage(message, options) {
        message = this.beforeSend(message);
        return this.bot.sendMessage(this.userId, message, options);
    }

    sendRequest(body, endpoint, method) {
        return this.bot.sendRequest(body, endpoint, method);
    }

    sendTypingIndicator(milliseconds) {
        return this.bot.sendTypingIndicator(this.userId, milliseconds);
    }

    getUserProfile() {
        return this.bot.getUserProfile(this.userId);
    }

    conversation(factory) {
        return this.bot.conversation(this.userId, factory);
    }

    _applyPreprocessor(msg) {
        let prep;
        for (let i = 0; i < this._responsePreprocessor.length; i++) {
            prep = new this._responsePreprocessor[i](msg);
            msg = prep.apply();
        }
        return msg;
    }

    beforeSend(message){
        message = this._applyPreprocessor(message);
        return message;
    }
}

