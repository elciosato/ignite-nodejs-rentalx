import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCategoryController } from "../useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./uploads/tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listCategoriesController.handle
);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
