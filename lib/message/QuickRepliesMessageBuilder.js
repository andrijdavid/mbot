'use strict';
const Message = require('../Message');


class QuickRepliesMessageBuilder {

    constructor() {
        this.text = null;
        this.quickReplies = [];
    }

    setText(text) {
        this.text = text;
        return this;
    }

    addTextReply(title, data) {
        this.quickReplies.push({
            content_type: 'text',
            title: title,
            payload: data
        });
        return this;
    }

    addImageReply(title, data, imageUrl) {
        this.quickReplies.push({
            content_type: 'text',
            title: title,
            image_url: imageUrl,
            payload: data
        });
        return this;
    }

    addLocationReply() {
        this.quickReplies.push({
            content_type: 'location'
        });
        return this;
    }

    build() {
        return new Message(this.text, this.quickReplies);
    }
}

module.exports = QuickRepliesMessageBuilder;