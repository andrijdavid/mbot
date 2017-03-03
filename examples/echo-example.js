'use strict';
const MBot = require('../');
const config = require('config');

const bot = new MBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();
