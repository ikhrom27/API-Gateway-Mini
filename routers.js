const router = require("express").Router();
const { login } = require("./controllers");
const {
  validateBody,
  rateLimiter,
  redisRateLimiter,
  authentication,
  validateRole,
} = require("./middlewares");

router.post(
  "/login",
  rateLimiter(3, 10),
  validateBody(["username", "password"]),
  login
);

router.get("/data", rateLimiter(5, 15), (req, res) => {
  res.status(200).send({ message: "DATA PUBLIK" });
});

router.get(
  "/admin",
  authentication,
  redisRateLimiter(3, 10),
  validateRole(["admin"]),
  (req, res) => {
    res.status(200).send({ message: "DATA ADMINs" });
  }
);

module.exports = router;
