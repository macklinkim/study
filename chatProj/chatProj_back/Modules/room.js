const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room: String,
  },
  { timestamp: true }

);

module.exports = mongoose.model("Room", roomSchema);