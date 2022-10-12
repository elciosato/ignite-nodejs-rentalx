import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/categories", categoriesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});