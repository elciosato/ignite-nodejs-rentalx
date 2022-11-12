import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "../utils/AppError";

const redisClient = createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimeterMiddleware",
  points: 10, // 10 requests
  duration: 5, // per 1 second by IP
});

export async function rateLimeterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await redisClient.connect();

    await rateLimiter.consume(req.ip);
    return next();
  } catch (error) {
    console.log(error);
    throw new AppError("Too Many Requests", 429);
  } finally {
    await redisClient.disconnect();
  }
}
