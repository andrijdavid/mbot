'use strict';
const Mbot = require('../index');
module.exports = (bot) => {
    bot.hear('test', (payload, chat) => {
        chat.say('Auto test');
        let txtmsg = Mbot.TextMessageBuilder().setText('TextMessageBuilder test').build();
        let audiomsg = Mbot.AudioMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/audios/perfect/mp3`).build();
        let videomsg = Mbot.VideoMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/videos/vide.MP4`).build();
        let imagemsg = Mbot.ImageMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/images/impossible.PNG`).build();
        let filemsg = Mbot.FileMessageBuilder().setUrl(`https://${bot.name}.herokuapp.com/files/carnet.pdf`).build();
        chat.say(txtmsg);
        chat.say(audiomsg);
        chat.say(videomsg);
        chat.say(imagemsg);
        chat.say(filemsg);
    });
};