class MessageType2 {

    constructor(data){
        this.room = data.room;
        this.name = data.name;
        this.message = data.message;
    }

    getModel(){
        var model = {
            name: this.name,
            room: this.room,
            message: this.message
        };

        return model;
    }

}

exports.MessageType2 = MessageType2;