'use strict';
const Message = require('../Message');


class AttachmentMessageBuilder {
    constructor() {
        this.type = null;
        this.url = null;
        this.isReusable = true;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setIsReusable(reusable) {
        this.isReusable = reusable;
        return this;
    }

    setType(type){
        this.type = type;
        return this;
    }


    build() {
        return new Message(null, null, null, {
            type: this.type,
            payload: {
                url: this.url,
                is_reusable: this.isReusable
            }
        });
    }
}

module.exports = AttachmentMessageBuilder;