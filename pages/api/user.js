const User = require("../../models/user");
import dbConnect from "../../db/database";

dbConnect();

export default async (req, res) => {
  await handleUser(req, res);
};

const handleUser = async (req, res) => {
  const { phone, name, sid } = req.body;

  const user = await User.findOne({ phone });

  if (user) {
    res.status(200).json({
      message: "User is found",
      user,
    });
  } else {
    const newUser = await User({
      sid,
      phone,
      name,
    });
    await newUser.save();
    res.status(200).json({
      message: "New user is created",
      user: newUser,
    });
  }
};
