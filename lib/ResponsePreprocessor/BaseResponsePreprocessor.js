const Message = require('../Message');
module.exports = class BaseResponsePreprocessor {

  constructor(msg){
      if(msg instanceof Message)
        this._msg = msg;
      else if(typeof msg == 'string')
          this._msg = new Message(msg);
      else if(typeof msg == 'object')
          this._msg = new Message(msg.text, msg.quickReplies, msg.buttons);
  }

    get msg() {
        return this._msg;
    }

    set msg(value) {
        this._msg = value;
    }

  apply(){
      return this.msg.trim();
  }
};