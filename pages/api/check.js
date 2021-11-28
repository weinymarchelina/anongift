const jwt = require("jsonwebtoken");
import Cookies from "cookies";
const apiSecret = process.env.SECRET;

export default async (req, res) => {
  const cookies = new Cookies(req, res);

  const token = cookies.get("jwt");
  if (token) {
    jwt.verify(token, apiSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Please login first",
        });
      } else {
        console.log(decodedToken);

        //get user from decodedToken.grants.identity
        res.status(200).json({
          message: "Success! You can send msg now",
          //   user,
        });
      }
    });
  } else {
    res.status(401).json({
      message: "Please login first",
    });
  }
};
