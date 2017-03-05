const Message = require('../message');

class TextMessageBuilder {

    constructor(text = ''){
        this.text = text;
    }

    setText(text){
        this.text = text;
        return this;
    }

    build(){
        return new Message(text);
    }
}

module.exports = TextMessageBuilder;