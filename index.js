'use strict';
const MBot = require('./lib/MBot');
const Message = require('./lib/Message');

MBot.Message = Message;
MBot.TextMessageBuilder = require('./lib/message/TextMessageBuilder');
MBot.AttachmentMessageBuilder = require('./lib/message/AttachmentMessageBuilder');
MBot.ImageMessageBuilder = require('./lib/message/ImageMessageBuilder');
MBot.AudioMessageBuilder = require('./lib/message/AudioMessageBuilder');
MBot.VideoMessageBuilder = require('./lib/message/VideoMessageBuilder');
MBot.FileMessageBuilder = require('./lib/message/FileMessageBuilder');
MBot.QuickRepliesMessageBuilder = require('./lib/message/QuickRepliesMessageBuilder');

module.exports = MBot;
