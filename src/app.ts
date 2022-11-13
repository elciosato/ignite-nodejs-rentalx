import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { resolve } from "path";
import swaggerUI from "swagger-ui-express";
import "./shared/container";
import "./shared/providers";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { routes } from "./routes";
import { rateLimeterMiddleware } from "./shared/middlewares/rateLimiterMiddleware";
import { AppError } from "./shared/utils/AppError";
import swaggerFile from "./swagger.json";

const app = express();
app.use(cors());

app.use(rateLimeterMiddleware);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use("/avatar", express.static(resolve(__dirname, "../uploads/avatar")));
app.use("/cars", express.static(resolve(__dirname, "../uploads/cars")));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!!" });
});

app.use(routes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong!",
  });
});

export { app };
