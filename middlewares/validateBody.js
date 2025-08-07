function validateBody(params) {
  return function (req, res, next) {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Invalid or missing JSON body" });
    }
    console.log(req.body);
    for (let i = 0; i < params.length; i++) {
      if (!req.body[params[i]]) {
        return res.status(400).send({ message: `Missing field ${params[i]}` });
      }
    }

    next();
  };
}

module.exports = { validateBody };
