const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    sid: String,
    sendReq: Array,
    delivery: Array,
  },
  { timestamps: true }
);

let User = mongoose.models?.users || mongoose.model("users", UserSchema);

module.exports = User;
