const FileMessageBuilder = require('./message/FileMessageBuilder');
const VideoMessageBuilder = require('./message/VideoMessageBuilder');
const AudioMessageBuilder = require('./message/AudioMessageBuilder');
const QuickRepliesMessageBuilder = require('./message/QuickRepliesMessageBuilder');
const TextMessageBuilder = require('./message/TextMessageBuilder');
const AttachmentMessageBuilder = require('./message/AttachmentMessageBuilder');
const ImageMessageBuilder = require('./message/ImageMessageBuilder');
const EventEmitter = require('eventemitter3');

module.exports = class Base extends EventEmitter {


    static TextMessageBuilder() {
        return new TextMessageBuilder();
    }

    static AttachmentMessageBuilder() {
        return new AttachmentMessageBuilder();
    }

    static ImageMessageBuilder() {
        return new ImageMessageBuilder();
    }

    static AudioMessageBuilder() {
        return new AudioMessageBuilder();
    }

    static VideoMessageBuilder() {
        return new VideoMessageBuilder();
    }

    static FileMessageBuilder() {
        return new FileMessageBuilder();
    }

    static QuickRepliesMessageBuilder() {
        return new QuickRepliesMessageBuilder();
    }


};