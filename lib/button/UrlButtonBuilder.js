const Button = require('../Button');

class UrlButtonBuilder {
    constructor() {
        this.type = Button.TYPE.URL;
        this.title = null;
        this.link = null;
        this.webviewHeight = null;
        this.messengerExtensions = null;
        this.fallback = null;
    }

    setTitle(str) {
        this.title = str;
        return this;
    }

    getTitle() {
        return this.title;
    }

    setLink(url) {
        this.link = url;
        return this;
    }

    getLink() {
        return this.link;
    }

    setWebviewHeight(height) {
        let heightRatio = Object.keys(Button.HEIGHT_RATIO).map(function (element) {
            return Button.HEIGHT_RATIO[element];
        }, []);
        if (heightRatio.indexOf(height) < 0) throw new Error('Invalid value webview_height_ratio.');
        this.webviewHeight = height;
        return this;
    }

    getWebviewHeight() {
        return this.webviewHeight;
    }

    isMessengerExtensions(enable) {
        if (enable != null) {
            this.messengerExtensions = enable;
            return this;
        }
        return this.messengerExtensions;
    }

    setFallbackLink(url) {
        this.fallback = url;
        return this;
    }

    getFallbackLink() {
        return this.fallback;
    }

    build(){
        let btn = new Button(this.type, this.title);
        btn.url = this.link;
        btn.messenger_extensions = this.messengerExtensions;
        btn.fallback_url = this.fallback;
        btn.webview_height_ratio = this.webviewHeight;
        return btn;
    }
}