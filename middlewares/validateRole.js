function validateRole(allowedRules) {
  return function (req, res, next) {
    if (!req.user || typeof req.user !== "object") {
      return res.status(400).json({ message: "Invalid or missing JSON body" });
    }
    if (!allowedRules.includes(req.user.role))
      return res.status(401).send({ message: "Invalid Role" });
    next();
  };
}

module.exports = { validateRole };
