import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const category = {
    id: uuidv4(),
    name,
    description,
  };
  categories.push(category);
  return res.status(201).json(category);
});

export { categoriesRoutes };
