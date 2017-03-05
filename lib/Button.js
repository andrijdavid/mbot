
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
        this._title = value;
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

Button.TYPE = {
    URL: 'web_url',
    POSTBACK: 'postback',
    CALL: 'phone_number',
    SHARE: 'element_share',
    BUY: 'payment',
    ACCOUNT_LINK: 'account_link',
    ACCOUNT_UNLINK: 'account_unlink'
};

Button.PAYMENT_TYPE = {
    FIXED: 'FIXED_AMOUNT',
    FLEXIBLE: 'FLEXIBLE_AMOUNT'
};

Button.HEIGHT_RATIO = {
    COMPACT: 'compact',
    TALL: 'tall',
    FULL: 'full'
};

module.exports = Button;