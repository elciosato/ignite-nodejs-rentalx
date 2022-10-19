import "reflect-metadata";
import express from "express";
import swaggerUI from "swagger-ui-express";

// eslint-disable-next-line import-helpers/order-imports
import AppDataSource from "./database/DataSource";

import "./shared/container";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use(routes);

    app.get("/", (req, res) => {
      res.json({ message: "Hello World!!!" });
    });

    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => console.log(error));
