const Helpers = require('./utils/helpers');

class Button {

    constructor(type, title, payload){
        this._type= type;
        this._title=title;
        this._payload=payload;
        this._url = null;
        this.payment_summary = {};
        this.webview_height_ratio= null;
        this.fallback_url = null;
        this.messenger_extensions = null;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
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
        let btn = {};
        if(Helpers.isNotEmpty(this.type))
            btn.type = this.type;
        if(Helpers.isNotEmpty(this.title))
            btn.title= this.title;
        if(Helpers.isNotEmpty(this.payload))
            btn.payload=this.payload;
        if(Helpers.isNotEmpty(this.url))
            btn.url = this.url;
        if(Helpers.isNotEmpty(this.payment_summary))
            btn.payment_summary = this.payment_summary;
        if(Helpers.isNotEmpty(this.webview_height_ratio))
            btn.webview_height_ratio = this.webview_height_ratio;
        if(Helpers.isNotEmpty(this.fallback_url))
            btn.fallback_url = this.fallback_url;
        if(Helpers.isNotEmpty(this.messenger_extensions))
            btn.messenger_extensions = this.messenger_extensions;
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