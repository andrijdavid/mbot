'use strict';
const youtube = require('youtube-search');
const opts = {
    maxResults: 10,
    key: 'AIzaSyDKpJcZxx4E5jIBOrJaYNx-aXyOHFkmbIE'
};
const VideoMessageBuilder = require('../lib/message/VideoMessageBuilder');
const fs = require('fs');
const youtubeDl = require('youtube-dl');
const path = require('path');

module.exports = (bot) => {
    bot.hear(/youtube (.*)/i, (payload, chat, data) => {
        const query = data.match[1];
        console.log('youtube', data);
        youtube(query, opts, function (err, result) {
            if (err)
                console.error(err);
            console.info('result', result);
            let msg = new VideoMessageBuilder();
            msg.setUrl('https://misaina.heruokuapp.com/myvideo.mp4');
            chat.sendVideoMessage(msg.build());
        })
    });
};
