const Note = require("../../models/note");
import dbConnect from "../../db/database";

dbConnect();

export default async (req, res) => {
  await saveNote(req, res);
};

const saveNote = async (req, res) => {
  try {
    const { name, nameId, phone, msg } = req.body;

    const newNote = new Note({ name, nameId, targetedPhone: phone, text: msg });
    const resNote = await newNote.save();
    res.status(200).json({
      note: resNote,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
