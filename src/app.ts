import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "./shared/container";

import { routes } from "./routes";
import { AppError } from "./shared/utils/AppError";
import swaggerFile from "./swagger.json";

dotenv.config({ path: `${__dirname}/../.env` });

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

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
