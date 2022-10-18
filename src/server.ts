import express from "express";
import swaggerUI from "swagger-ui-express";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

import "./database/data-source";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
