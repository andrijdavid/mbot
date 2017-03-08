'use strict';
const wikipedia = require('wikipedia-js');
const striptags = require('striptags');
module.exports = (bot) => {
    bot.hear([/wikipedia (.*)/i,/wiki (.*)/i], (payload, chat, data) => {
        const query = data.match[1];
        let options = {query: query, format: "html", summaryOnly: true, lang: "fr"};
        wikipedia.searchArticle(options, (err, text) => {
            if (err) {
                console.error(err);
            }
            let message = striptags(text);
            chat.say(message);
        });
    });
};
