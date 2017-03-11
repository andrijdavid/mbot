'use strict';
const fetch = require('node-fetch');
const Mbot = require('../index');
const giphy = require('giphy')('dc6zaTOxFJmzC');

module.exports = (bot) => {
    bot.hear(/gif (.*)/i, (payload, chat, data) => {
        const query = data.match[1];
        giphy.search({
            q: query,
            rating: 'g'
        }, function(err, search, res){
            let result = search.data;
            let oneRandomRes = result[Math.floor(Math.random() * result.length)];
            chat.sendImageMessage(Mbot.ImageMessageBuilder().setUrl(oneRandomRes.images.fixed_height.url).build());
        });
    });
};
