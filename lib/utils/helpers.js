class Helpers {

    static trim(str){
        return str.trim();
    }

    static random(min, max){
        let rand = Math.random();
        return rand*max -rand*min + min;
    }

    static isArray(obj){

    }
}
module.exports = Helpers;