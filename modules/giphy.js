'use strict';
const fetch = require('node-fetch');
const GIPHY_URL = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=`;
module.exports = (bot) => {
    bot.hear(/gif (.*)/i, (payload, chat, data) => {
        const query = data.match[1];
        fetch(GIPHY_URL + query)
            .then(res => res.json())
            .then(json => {
                chat.say({
                    attachment: 'image',
                    url: json.data.image_url
                }, {
                    typing: true
                });
            });
    });
};
