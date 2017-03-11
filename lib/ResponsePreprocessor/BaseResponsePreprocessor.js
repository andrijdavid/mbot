const Message = require('../Message');
module.exports = class BaseResponsePreprocessor {
    constructor(msg) {
        if (msg instanceof Message && msg.isText())
            this._msg = msg;
        else if (typeof msg == 'string')
            this._msg = new Message(msg);
        else if (typeof msg == 'object')
            this._msg = Message.from(msg);
    }


    get msg() {
        return this._msg;
    }

    apply() {
        this._msg.text = this._msg.text.trim();
        return this._msg;
    }
};