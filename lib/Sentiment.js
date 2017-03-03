const EventEmitter = require('eventemitter3');
const Helpers = require('./utils/helpers');

class Sentiment extends EventEmitter {

    constructor(){
        super();
        // bot's emotions
        this._mood = 2;
        this._initSentiment();
        this.emit('boot');
        this.sentimental = null;
    }

    isVeryHappy(){
        return this._mood === 4;
    }

    isHappy() {
        return this._mood === 3;
    }

    isNeutral(){
        return this._mood === 2;
    }

    isVeryAngry(){
        return this._mood === 0;
    }

    isAngry(){
        return this._mood === 1;
    }

    incrementHappiness(){
        if(this.isHappy())
            return;
        this.emit('change', {type: 'incrementing'});
        return ++this._mood;
    }

    decrementHappiness(){
        if(this.isVeryAngry())
            return;
        this.emit('change', {type: 'decrementing'});
        return --this._mood;
    }

    _initSentiment() {
        this.on('change', (obj)=>{
            this.wantToSendEmoji();
            if(obj.type == 'incrementing') {

            } else {

            }
        });
    }

    wantToSendEmoji(){
        if(this.isHappy() && Boolean(Helpers.random(0, 1.5))){
            this.emit('wantToSentHappyEmoji');
            return true;
        }
        if(this.isVeryHappy() && Boolean(Helpers.random(0,2))){
            this.emit('wantToSentVeryHappyEmoji');
            return true;
        }
        return false;
    }
}

module.exports = Sentiment;