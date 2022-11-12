import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { resolve } from "path";
import swaggerUI from "swagger-ui-express";
import "./shared/container";
import "./shared/providers";

import { routes } from "./routes";
import { rateLimeterMiddleware } from "./shared/middlewares/rateLimiterMiddleware";
import { AppError } from "./shared/utils/AppError";
import swaggerFile from "./swagger.json";

const app = express();

app.use(cors());
app.use(rateLimeterMiddleware);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use("/avatar", express.static(resolve(__dirname, "../uploads/avatar")));
app.use("/cars", express.static(resolve(__dirname, "../uploads/cars")));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!!" });
});

app.use(routes);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong!",
  });
});

export { app };
