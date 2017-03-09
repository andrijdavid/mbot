'use strict';
const RiveScript = require('rivescript');
const ian = new RiveScript({utf8: true});
const path = require('path');

module.exports = (bot) => {

    ian.loadDirectory(path.join(__dirname, "brain"), (batch_num) => {
        console.log("Batch #" + batch_num + " has finished loading!");

        // Now the replies must be sorted!
        ian.sortReplies();

        // And now we're free to get a reply from the brain!
        bot.on('message', (payload, chat, data) => {
            if (!data.captured) {
                const msgBuilder = new MBot.TextMessageBuilder();
                msgBuilder.setText(ian.reply("local-user", payload.message.text));
                chat.say(ian.reply("local-user", payload.message.text));
            }
        });

    }, err => console.error(err));
};/**
 * Created by CoderBus on 08/03/2017.
 */
