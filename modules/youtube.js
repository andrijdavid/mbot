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
            const video = youtubeDl(result[0].link,
                // Optional arguments passed to youtube-dl.
                ['--format=18'],
                // Additional options can be given for calling `child_process.execFile()`.
                {cwd: path.join(__dirname, '../public')}
                );

            // Will be called when the download starts.
            video.on('info', function (info) {
                console.log('Download started');
                console.log('filename: ' + info.filename);
                console.log('size: ' + info.size);
            });

            video.pipe(fs.createWriteStream('myvideo.mp4'));

            let msg = new VideoMessageBuilder();
            msg.setUrl('https://misaina.heruokuapp.com/myvideo.mp4');
            chat.sendVideoMessage(msg.build());
        })
    });
};
