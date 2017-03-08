'use strict';
const youtube = require('youtube-search');
const opts = {
    maxResults: 10,
    key: 'AIzaSyDKpJcZxx4E5jIBOrJaYNx-aXyOHFkmbIE'
};

module.exports = (bot) => {
    bot.hear(/youtube (.*)/i, (payload, chat, data) => {
        const query = data.match[1];
        console.log('youtube', data);
        youtube(query, opts, function(err, result){
            if(err)
                console.error(err);
            console.info('result', result);
            let msg = new bot.VideoMessageBuilder();
            msg.setUrl(result[0].link);
            chat.sendVideoMessage(msg.build());
        })
    });
};
