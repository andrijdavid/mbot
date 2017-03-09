const WikipediaRepository = require('./WikipediaRepository');
const YoutubeRepository = require('./YoutubeRepository');
const GiphyRepository = require('./GiphyRepository');

module.exports = class Repository {

    static giphy() {
        return new GiphyRepository();
    }

    static youtube() {
        return new YoutubeRepository();
    }

    static Wikipedia() {
        return new WikipediaRepository();
    }

};