const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  max: 1000, // how many number of request allowed in given time (1000 in 15 minuts req)
  windowMs: 15 * 60 * 1000, // 15 minuts converted into miliseconds
  statusCode: 429,
  message: {
    error:
      "We have received too many request from this IP, Please try after 15 minuts",
  },
});

module.exports = limiter;