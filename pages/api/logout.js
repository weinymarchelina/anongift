import Cookies from "cookies";

export default async (req, res) => {
  const cookies = new Cookies(req, res);

  cookies.set("jwt");
  res.status(200).json({
    message: "You have logged out",
  });
};
