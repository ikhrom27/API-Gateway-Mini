const users = require("./users");
const jwt = require("jsonwebtoken");

module.exports = class Controller {
  static async login(req, res) {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) return res.status(401).send({ message: "Invalid user" });

    const token = jwt.sign(user.id, process.env.SECRET_KEY);

    return res.status(200).send({ message: `Welcome ${user.username}`, token });
  }
};
