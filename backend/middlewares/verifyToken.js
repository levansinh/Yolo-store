import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json("token khong fdung");
      }
      req.userId = user._id;
      next();
    });
  }
};

const verifyTokenWithAdmin = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json("token khong fdung");
      }
      if (user.isAdmin == true)  {
        req.userId = user._id;
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  }
};

export { verifyToken, verifyTokenWithAdmin };
