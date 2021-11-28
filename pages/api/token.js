require("dotenv").config;

const twillio = require("twilio");
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.APIKEY;
const apiSecret = process.env.SECRET;
// const sid = process.env.SID;
const AccessToken = require("twilio").jwt.AccessToken;
import Cookies from "cookies";

export default async (req, res) => {
  //   const client = twillio(accountSid, authToken);
  const cookies = new Cookies(req, res);
  const { uid } = req.body;

  const token = new AccessToken(accountSid, apiKey, apiSecret, {
    identity: uid,
  });

  console.log(token);
  console.log(token.toJwt());

  cookies.set("jwt", token.toJwt(), {
    httpOnly: true,
  });

  res.status(200).json({
    message: "Success! Redirecting you to Home Page",
  });
};
