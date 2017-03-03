const Mbot = require('../index');
const bot = new Mbot({
    "name": "Misaina",
    "accessToken": "EAAIzFryBI4YBAA7Az6bCovVPQuwGp0fpkvsWznWlhy58n8da5sK0KHCcdgD3UjmzX1ni6O4otR7F4etRJ4hZC7QH79nfKXZC3IxfZBFhvmDOq5zRYOsKaaJjyjP5VsrFPZBLQMYnOA1FEyQnVNu73XTRBKPZBHnbWPciV6kkKKwZDZD",
    "verifyToken": "zaertzvioUOHJBUUGLIUtoy321321e32r1t3e1t",
    "appSecret": "32ee4c6e5a889406aa4096b6176d9aba",
    "subdomain" : "misaina"
});
const fetch = require('node-fetch');
const GIPHY_URL = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=`;


bot.setGreetingText('Hey there! Welcome to MBot!');
bot.setGetStartedButton((payload, chat) => {
    chat.say('Welcome to MBot. What are you looking for?');
});
bot.setPersistentMenu([
    {
        type: 'postback',
        title: 'Help',
        payload: 'PERSISTENT_MENU_HELP'
    },
    {
        type: 'postback',
        title: 'Settings',
        payload: 'PERSISTENT_MENU_SETTINGS'
    },
    {
        type: 'web_url',
        title: 'Go to Website',
        url: 'http://yostik.io'
    }
]);

bot.on('postback:PERSISTENT_MENU_HELP', (payload, chat) => {
    chat.say(`I'm here to help!`);
});

bot.on('postback:PERSISTENT_MENU_SETTINGS', (payload, chat) => {
    chat.say(`Here are your settings: ...`);
});

bot.hear('help', (payload, chat) => {
    const text = payload.message.text;
    const buttons = [
        { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
        { type: 'postback', title: 'Notifications', payload: 'HELP_NOTIFICATIONS' }
    ];
    chat.sendButtonTemplate(`Need help? Try one of these options`, buttons);
});


bot.hear('hello', (payload, chat) => {
    chat.getUserProfile().then((user) => {
        chat.say(`Hello, ${user.first_name}!`);
    });
});


bot.hear(/gif (.*)/i, (payload, chat, data) => {
    const query = data.match[1];
    chat.say('Searching for the perfect gif...');
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


bot.start();