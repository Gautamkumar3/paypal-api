const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send("token is missing");
  }
  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (!err) {
        req.userId = user.id;
        next();
      } else {
        return res.status(403).send({ msg: "invalid token" });
      }
    });
  } catch (er) {
    res.status(403).send({ status: "error", message: er.message });
  }
};

module.exports = AuthMiddleware;
