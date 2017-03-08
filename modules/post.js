'use strict';
module.exports = (bot) => {
    bot.hear(/post (.*)/i, (payload, chat, data) => {
        const query = data.match[1];
       bot.post(query, ()=> chat.say('done'));
    });
};/**
 * Created by CoderBus on 08/03/2017.
 */
