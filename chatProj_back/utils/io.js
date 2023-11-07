const chatController = require("../controllers/chat.controller");
const userController = require("../controllers/user.controller")
const roomController = require("../controllers/room.controller")

module.exports = function(io){
  //io
  io.on("connection", async(socket)=>{

    console.log("client is connected.", socket.id);
    
    socket.emit("room", await roomController.getAllRooms());

    socket.on("login", async(userName, cb)=>{
      console.log("backend : ", userName);
      try{
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joind to this room.`,
          user: {id: null, name : "system"},
        };
        io.emit("message", welcomeMessage);
        cb({ok:true, data:user});

      }catch(error){
        cb({ok:false, error: error.message});
      }

    });
    socket.on("sendMessage", async (message, cb)=>{
      //유저찾기 socket id로
      try {
        const user = await userController.checkUser(socket.id);
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message",newMessage);
        cb({ok:true});
        
      } catch (error) {
        cb({ok:false, error: error.message});
      }
    });
    socket.on("disconnection", ()=>{
      console.log("user disconnected.");
    });
  });

};