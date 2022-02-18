module.exports = 
class Room {
    constructor(roomid, roomname){
        this.roomid = roomid;
        this.roomname = roomname;
    }

    AddUser(user){
        this.clients.push(user);
    }
    
}