const Helpers = require('./utils/helpers');
const franc = require('franc');
const natural = require('natural');
const compromise = require('compromise');

class Button {

    constructor(type, title, payload){
        this._type= type;
        this._title=title;
        this._payload=payload;
    }

    get payload() {
        return this._payload;
    }

    set payload(value) {
        this._payload = value;
    }
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value.trim();
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }


    toString(){
        let btn = {type: this.type, title: this.title, payload: this.payload};
        return btn;
    }
}

class Message {


    constructor(text = '', quickReplies=[], buttons=[]){
        this.text = text;
        this._quickReplies = quickReplies;
        this._buttons = buttons;
        this._lang = null;
        this.sentiment = null;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value.trim();
        this.lang = franc(value);
    }


    set lang(value) {
        this._lang = value;
        // French
        if(value === 'fra'){
            const sentimentFr = require('sentiment-french');
            this.sentiment = sentimentFr(this.text);
        }
        // English
        else if(value === 'eng'){
            const sentiment = require('Sentimental');
            this.sentiment = sentiment.analyse(this.text);
        }
        // Malagasy
        else if(value === 'plt'){

        }
    }
    get lang() {
        return this._lang;
    }

    get quickReplies() {
        return this._quickReplies;
    }

    set quickReplies(value) {
        if(Helpers.isArray(values))
            this._quickReplies = value;
        else
            this._quickReplies.push(value);
    }

    get buttons() {
        return this._buttons;
    }

    set buttons(value) {
        if(Helpers.isArray(value))
            this._buttons = value;
        else
            this._buttons.push(value);
    }

    toString(){
        let msg = {
            text: this.text,
        };
        if(this.quickReplies.length > 0)
            msg.quickReplies = this.quickReplies;
        return msg;
    }
}


module.exports = Message;