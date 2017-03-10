const EventEmitter = require('eventemitter3');

module.exports = class Base extends EventEmitter{

    static TextMessageBuilder() {
        return new require('./message/TextMessageBuilder')();
    }

    static AttachmentMessageBuilder() {
        return new require('./message/AttachmentMessageBuilder')();
    }

    static ImageMessageBuilder() {
        return new require('./message/ImageMessageBuilder')();
    }

    static AudioMessageBuilder() {
        return new require('./message/AudioMessageBuilder')();
    }

    static VideoMessageBuilder() {
        return new require('./message/VideoMessageBuilder')();
    }

    static FileMessageBuilder() {
        return new require('./message/FileMessageBuilder')();
    }

    static QuickRepliesMessageBuilder() {
        return new require('./message/QuickRepliesMessageBuilder')();
    }
};