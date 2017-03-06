const Button = require('../Button');

class AccountUnlinkButtonBuilder {
    constructor(){
        this.type = Button.TYPE.ACCOUNT_UNLINK;
        this.url = null;
    }

    build(){
        let btn = new Button(this.type);
        return btn;
    }
}

module.exports = AccountUnlinkButtonBuilder;