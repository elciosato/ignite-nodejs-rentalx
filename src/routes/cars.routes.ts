import { Request, Router } from "express";
import multer from "multer";

import uploadConfig from "../shared/config/upload";
import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCarsController } from "../useCases/createCar/CreateCarsController";
import { CreateCarSpecificationController } from "../useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../useCases/uploadCarImage/UploadCarImagesController";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/:id/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

const uploadCarImages = multer(uploadConfig.upload("carImages"));

carsRoutes.post(
  "/:id/images",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("files"),
  uploadCarImagesController.handle
);

export { carsRoutes };
