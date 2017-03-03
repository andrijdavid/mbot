'use strict';
const EventEmitter = require('eventemitter3');
const Message = require('./Message');
const UpperCaseResponsePreprocessor = require("./ResponsePreprocessor/UpperCaseResponsePreprocessor");
const Sentiment = require('./Sentiment');

class Chat extends EventEmitter {
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

  __init(){
      this._sentiment.on('veryAngry', () => {
          this._responsePreprocessor = [
              new UpperCaseResponsePreprocessor()
          ];
      });
      this._sentiment.on('angry', () => {
          this._responsePreprocessor = [
              new UpperCaseResponsePreprocessor()
          ];
      });
      this._sentiment.on('neutral', () => {
          this._responsePreprocessor = [
          ];
      });
      this._sentiment.on('happy', () => {
          this._responsePreprocessor = [
          ];
      });
      this._sentiment.on('veryHappy', () => {
          this._responsePreprocessor = [
          ];
      });
  }

  say(message, options) {
      let msg = new Message(message);
      msg = this._applyPreprocessor(msg);
      return this.bot.say(this.userId, message, options);
  }

  sendTextMessage(text, quickReplies, options) {
    //let msg = new Message(text, quickReplies);
      //msg = this._applyPreprocessor(msg);
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
    //let msg = new Message(message);
    //msg = this._applyPreprocessor(msg);
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

  _applyPreprocessor(msg){

    for(let i = 0; i < this._responsePreprocessor.length; i++)
    {
      this._responsePreprocessor[i].msg = msg;
      msg = this._responsePreprocessor[i].apply();
    }
    return msg;
  }
}

module.exports = Chat;
