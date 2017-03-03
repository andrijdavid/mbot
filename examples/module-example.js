'use strict';
const MBot = require('../');
const config = require('config');
const echoModule = require('./modules/echo');
const helpModule = require('./modules/help');

const bot = new MBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});

bot.module(echoModule);
bot.module(helpModule);
bot.start();
