import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
