import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

// eslint-disable-next-line import-helpers/order-imports
import AppDataSource from "./infra/typeORM/database/DataSource";

import "./shared/container";

import { routes } from "./routes";
import { AppError } from "./shared/utils/AppError";
import swaggerFile from "./swagger.json";

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

    // app.get("/", (req, res) => {
    //   chicken.log();
    //   res.json({ message: "Hello World!!!" });
    // });

    app.use(routes);

    app.use(
      (err: AppError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err.statusCode || 500).json({
          message: err.message || "Something went wrong!",
        });
      }
    );

    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => console.log(error));
