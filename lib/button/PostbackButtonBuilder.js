const Button = require('../Button');

class PostbackButtonBuilder{

    constructor(){
        this.type = Button.TYPE.POSTBACK;
        this.title = null;
        this.data = null;
    }

    setTitle(title){
        this.title = title;
        return this;
    }

    setData(data){
        this.data = data;
        return this;
    }

    build(){
        return new Button(this.type, this.title, this.data);
    }
}

module.exports = PostbackButtonBuilder;