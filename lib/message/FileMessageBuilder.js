const AttachmentMessageBuilder = require('./AttachmentMessageBuilder');

class FileMessageBuilder extends AttachmentMessageBuilder {
    constructor() {
        super();
        this.setType('file');

    }

}

module.exports = FileMessageBuilder;