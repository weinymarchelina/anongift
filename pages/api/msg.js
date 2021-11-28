require("dotenv").config;

const twillio = require("twilio");
const authToken = "ebe4a6b3ec001525ce42f5cab0834af8";
const accountSid = "ACe0e5a130a1f663191f473b421c6da0f2";
const twilioNumber = process.env.MY_NUMBER;

export default async (req, res) => {
  const { phone, message } = req.body;

  const client = twillio(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: phone,
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).json({
        message: "Your message is sent to the number",
      });
    });
};
