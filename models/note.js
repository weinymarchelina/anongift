const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    name: String,
    nameId: String,
    targetedPhone: String,
    text: String,
  },
  { timestamps: true }
);

let User = mongoose.models?.notes || mongoose.model("notes", NoteSchema);

module.exports = User;
