const MBot = require('../index');
const bot = new MBot({
    "name": "Misaina",
    "accessToken": "EAAIzFryBI4YBAA7Az6bCovVPQuwGp0fpkvsWznWlhy58n8da5sK0KHCcdgD3UjmzX1ni6O4otR7F4etRJ4hZC7QH79nfKXZC3IxfZBFhvmDOq5zRYOsKaaJjyjP5VsrFPZBLQMYnOA1FEyQnVNu73XTRBKPZBHnbWPciV6kkKKwZDZD",
    "verifyToken": "zaertzvioUOHJBUUGLIUtoy321321e32r1t3e1t",
    "appSecret": "32ee4c6e5a889406aa4096b6176d9aba",
    "subdomain" : "misaina"
});

const path = require('path');
const RiveScript = require('rivescript');
const ian = new RiveScript({utf8: true});

ian.loadDirectory(path.join(__dirname, "brain"), ()=>{
    console.log("Batch #" + batch_num + " has finished loading!");

    // Now the replies must be sorted!
    ian.sortReplies();

    // And now we're free to get a reply from the brain!
    bot.on('message', (payload, chat) => {
        chat.say(ian.reply("local-user", payload.message.text));
    });
    console.log("The bot says: " + reply);
}, err => console.error(err));
