module.exports = 
class Client {
    constructor(userid, username, type, socket){
        this.userid = userid;
        this.username = username;
        this.type = type;
        this.socket = socket;
    }

    SetUserID(userid){
        this.userid = userid;
    }

    SetUserName(username){
        this.username = username;
    }

    SetSocket(socket){
        this.socket = socket;
    }
    
}