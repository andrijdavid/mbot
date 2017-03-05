
class Button {

    constructor(type, title, payload){
        this._type= type;
        this._title=title;
        this._payload=payload;
    }

    get payload() {
        return this._payload;
    }

    set payload(value) {
        this._payload = value;
    }
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }


    toString(){
        let btn = {type: this.type, title: this.title, payload: this.payload};
        return btn;
    }
}


module.exports = Button;