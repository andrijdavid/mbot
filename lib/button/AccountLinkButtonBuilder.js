const Button = require('../Button');

class AccountLinkButtonBuilder {
    constructor(){
        this.type = Button.TYPE.ACCOUNT_LINK;
        this.url = null;
    }

    setUrl(url){
        this.url = url;
        return this;
    }


    build(){
        let btn = new Button(this.type);
        btn.url = this.url;
        return btn;
    }
}

module.exports = AccountLinkButtonBuilder;