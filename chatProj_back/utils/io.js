const userController = require("../controllers/user.controller")

module.exports = function(io){
  //io
  io.on("connection", async(socket)=>{
    console.log("client is connected.", socket.id);
    
    socket.on("login", async(userName, cb)=>{
      console.log("backend : ", userName);
      try{
        const user = await userController.saveUser(userName, socket.id);
        cb({ok:true, data:user});

      }catch(error){
        cb({ok:false, error: error.message});
      }

    });
    socket.on("disconnection", ()=>{
      console.log("user disconnected.");
    });
  });

};