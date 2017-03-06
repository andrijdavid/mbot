const Button = require('../Button');

class ShareButtonBuilder {
    constructor(){
        this.type = Button.TYPE.SHARE;
    }

    build(){
        return new Button(this.type);
    }
}

module.exports = ShareButtonBuilder;