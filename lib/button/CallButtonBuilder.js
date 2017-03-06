const Button = require('../Button');
class CallButtonBuilder {

    constructor(){
        this.title = null;
        this.phoneNumber = null;
    }

    setTitle(title){
        this.title = title;
        return this;
    }

    setPhoneNumber(phoneNumber){
        this.phoneNumber = phoneNumber;
        return this;
    }

    build(){
        return new Button(Button.TYPE.CALL, this.title, this.phoneNumber);
    }
}

module.exports = CallButtonBuilder;