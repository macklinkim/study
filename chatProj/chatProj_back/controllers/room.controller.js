const Room = require("../Modules/room");
const roomController = {};
roomController.getAllRooms = async () => {
  const roomList = await Room.find({});
  return roomList;
};

module.exports = roomController;