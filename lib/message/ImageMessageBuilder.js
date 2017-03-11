'use strict';
const AttachmentMessageBuilder = require('./AttachmentMessageBuilder');

class ImageMessageBuilder extends AttachmentMessageBuilder {
    constructor() {
        super();
        this.setType('image');
    }
}

module.exports = ImageMessageBuilder;