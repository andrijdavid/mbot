const BaseResponsePreprocessor = require('./BaseResponsePreprocessor');

module.exports = class UpperCaseResponsePreprocessor extends BaseResponsePreprocessor {
    constructor(msg) {
        super(msg);
    }

    apply() {
        let msg = super.apply();
        msg.text = msg.text.toUpperCase();
        return msg;
    }
};