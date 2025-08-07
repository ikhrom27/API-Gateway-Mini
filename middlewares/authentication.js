const jwt = require("jsonwebtoken");
const users = require("../users");

function authentication(req, res, next) {
  const token = req.header("Authorization");

  try {
    if (!token) return res.status(401).send({ message: "No Auth" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = users.find((user) => (user.id = decoded));
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = authentication;
