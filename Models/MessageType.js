class MessageType {
    fields = {
        room: null,
        name: null,
        message: null
    };

    constructor(newFields){
        for(var field in this.fields) {
            if(this.fields[field] !== 'undefined') {
                this.fields[field] = newFields[field];
            }
        }
    }
    // fill(newFields) {
    //     for(var field in this.fields) {
    //         if(this.fields[field] !== 'undefined') {
    //             this.fields[field] = newFields[field];
    //         }
    //     }
    // }


    getName(){
        return this.fields.name;
    }
    setName(newName){
        this.fields.name = newName;
    }

    getMessage(){
        return this.fields.message;
    }
    setMessage(newMessage){
        this.fields.message = newMessage; 
    }

}

exports.MessageType = MessageType;