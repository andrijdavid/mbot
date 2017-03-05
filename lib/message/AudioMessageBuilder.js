const AttachmentMessageBuilder = require('./AttachmentMessageBuilder');

class AudioMessageBuilder extends AttachmentMessageBuilder {
    constructor() {
       super();
       this.setType('audio');

    }

}

module.exports = AudioMessageBuilder;