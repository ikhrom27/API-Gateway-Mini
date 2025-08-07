function rateLimiter(maxReq, windowInSec) {
  let cache = {};
  return function (req, res, next) {
    const now = Date.now();
    const windowStart = now - windowInSec * 1000;

    if (!cache[req.ip]) {
      cache[req.ip] = [];
    }

    cache[req.ip] = cache[req.ip].filter((time) => time > windowStart);

    if (cache[req.ip].length > maxReq)
      return res.status(503).send({ message: "Too Many Request" });

    cache[req.ip].push(now);

    next();
  };
}

module.exports = rateLimiter;
