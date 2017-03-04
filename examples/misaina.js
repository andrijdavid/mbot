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


bot.setGreetingText('Hey salut! Je suis Misaina.');
bot.setGetStartedButton((payload, chat) => {
    chat.say('Bienvenue a toi mon ami. Que puis-je faire pour toi?');
});
bot.setPersistentMenu([
    {
        type: 'postback',
        title: 'Aide',
        payload: 'PERSISTENT_MENU_HELP'
    },
    {
        type: 'postback',
        title: 'Paramètre',
        payload: 'PERSISTENT_MENU_SETTINGS'
    }
]);

bot.on('postback:PERSISTENT_MENU_HELP', (payload, chat) => {
    chat.say(`Je suis là pour t'aider`);
});

bot.on('postback:GAME', (payload, chat) => {
    jouer(chat);
});

bot.on('postback:PERSISTENT_MENU_SETTINGS', (payload, chat) => {
    chat.say(`Tes paramètres : ...`);
});

bot.hear('aide', (payload, chat) => {
    const text = payload.message.text;
    const buttons = [

        { type: 'postback', title: 'Paramètre', payload: 'HELP_SETTINGS' },
        { type: 'postback', title: 'Jouer', payload: 'GAME' },
        { type: 'postback', title: 'Notifications', payload: 'HELP_NOTIFICATIONS' }
    ];
    chat.sendButtonTemplate(`Besoin d'aide. Choisi parmi ces boutons ;)`, buttons);
});


bot.hear('Salut', (payload, chat) => {
    chat.getUserProfile().then((user) => {
        chat.say(['say', {text: `Salut, ${user.first_name}!. Veux-tu jouer aujourd'hui?`,
            buttons: [
                { type: 'postback', title: 'Oui', payload: 'GAME' },
                { type: 'postback', title: 'Non', payload: 'HELP_FAQ' },
            ]
        }, 'say2'])
    });
});

bot.hear('quiz', function (payload, chat) {
    jouer(chat);
});

function jouer(chat){
    chat.conversation((convo) => {
        askQuestion(convo);
    });
    function askQuestion(convo){
        convo.ask({text: `Qui est le président des USA ?`, quickReplies:
            ['Barack Obama', 'Hery Rajaonarimampianina', 'Donald Trump']
        }, (payload, convo) => {
            const text = payload.message.text;
            convo.set('name', text);
            if(text === 'Donald Trump'){
                convo.say('bravo (y) (y) :D');
            }
            else{
                convo.say('Ohh!! Dommage! Ce n\'est pas la bonne réponse. Prochaine question ...').then(() => nextQuestion(convo));
            }
        });
    }

    function nextQuestion(convo){
        convo.ask({text: `Où se trouve la mer de la tranquilité?`, quickReplies:
            ['Entre les îles de la Polynesie', 'Au golf du pôle sud', 'Sur la lune']
        }, (payload, convo) => {
            const text = payload.message.text;
            convo.set('name', text);
            if(text === 'Sur la lune'){
                convo.say('bravo (y) (y) :D');
            }
            else {
                convo.say('Ohh!! Dommage! Ce n\'est pas la bonne réponse.  Prochaine question ...').then(() => convo.end());
            }
        });
    }
}
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
///////////////////
const wikipedia = require('wikipedia-js');
const striptags = require('striptags');


bot.hear([/wikipedia (.*)/i,/wiki (.*)/i], (payload, chat, data) => {
    const query = data.match[1];
    console.log('wikipedia', data);
    let options = {query: query, format: "html", summaryOnly: true, lang: "fr"};
    wikipedia.searchArticle(options, function (err, text) {
        if (err) {
            console.error(err);
        }
        console.log('response', text);
        let message = striptags(text);
        console.log('striped response', message);
        chat.say(message);
    });
});
bot.start();