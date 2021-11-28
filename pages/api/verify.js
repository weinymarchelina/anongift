require("dotenv").config;

const twillio = require("twilio");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const sid = process.env.SID;
const User = require("../../models/user");
import dbConnect from "../../db/database";

dbConnect();

export default async (req, res) => {
  const { name, phone, code } = req.body;

  const client = twillio(accountSid, authToken);

  if (code.length !== 6)
    res.status(403).json({ message: "Please input a valid OTP" });

  client.verify
    .services(sid)
    .verificationChecks.create({
      to: phone,
      code: code,
    })
    .then(async (data) => {
      if (data.status === "approved") {
        const user = await User.findOne({ phone });

        if (user) {
          console.log("User is found");
          res.status(200).json({
            message: "User is found",
            user,
          });
        } else {
          const newUser = await User({
            sid: data.sid,
            phone,
            name,
          });
          await newUser.save();
          console.log("New user is created");
          res.status(200).json({
            message: "New user is created",
            user: newUser,
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "An error happened",
      });
    });
};
