const Message = require('../Message');

class TextMessageBuilder {

    constructor(text = ''){
        this.text = text;
    }

    setText(text){
        this.text = text;
        return this;
    }

    build(){
        return new Message(this.text);
    }
}

module.exports = TextMessageBuilder;