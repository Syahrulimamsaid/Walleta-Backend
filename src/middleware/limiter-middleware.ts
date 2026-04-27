import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

export default rateLimiter;