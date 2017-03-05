const AttachmentMessageBuilder = require('./AttachmentMessageBuilder');

class VideoMessageBuilder extends AttachmentMessageBuilder {
    constructor() {
        super();
        this.setType('video');
    }

}

module.exports = VideoMessageBuilder;