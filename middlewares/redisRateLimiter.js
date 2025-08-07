const redis = require("../redis/client");

function redisRateLimiter(maxReq, windowInSec) {
  return async function (req, res, next) {
    const userId = req.user?.id;
    const key = `rate:${userId}`;
    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, windowInSec);
      }

      if (current > maxReq) {
        return res.status(429).send("Rate limit exceeded (Redis)");
      }

      next();
    } catch (error) {
      console.error("Redis error:", err);
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = redisRateLimiter;
