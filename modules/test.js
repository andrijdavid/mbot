'use strict';
const Mbot = require('../index');
const Message = require('../lib/Message');
const TextMessageBuilder = require('../lib/message/TextMessageBuilder');
module.exports = (bot) => {
    bot.hear('test', (payload, chat) => {
        chat.say('Auto test');
        try {
            let txtmsg = new TextMessageBuilder();
            txtmsg.setText('TextMessageBuilder test');
            chat.say(txtmsg.build());
        } catch (e) {
            console.error(e);
        }

        try {
            let audiomsg = Mbot.AudioMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/audios/perfect/mp3`).build();
            chat.say(audiomsg);
        } catch (e) {
            console.error(e);
        }
        try {
            let videomsg = Mbot.VideoMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/videos/vide.MP4`).build();
            chat.say(videomsg);
        } catch (e) {
            console.error(e);
        }
        try {
            let imagemsg = Mbot.ImageMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/images/impossible.PNG`).build();
            chat.say(imagemsg);
        } catch (e) {
            console.error(e);
        }
        try {
            let filemsg = Mbot.FileMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/files/carnet.pdf`).build();
            chat.say(filemsg);
        } catch (e) {
            console.error(e);
        }
    });
};