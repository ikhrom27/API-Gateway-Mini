function validateRole(params) {
  return function (req, res, next) {
    if (!req.user || typeof req.user !== "object") {
      return res.status(400).json({ message: "Invalid or missing JSON body" });
    }
    for (let i = 0; i < params.length; i++) {
      if (!req.user[params[i]]) {
        return res.status(401).send({ message: `Invalid Role` });
      }
    }

    next();
  };
}

module.exports = { validateRole };
