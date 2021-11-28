require("dotenv").config;

const twillio = require("twilio");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const sid = process.env.SID;

export default async (req, res) => {
  const { phone } = req.body;

  const client = twillio(accountSid, authToken);
  client.verify
    .services(sid)
    .verifications.create({
      to: phone,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).json({
        message: "Verification is sent!!",
        phonenumber: phone,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
