import { Router } from "express";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCarsController } from "../useCases/createCar/CreateCarsController";
import { CreateCarSpecificationController } from "../useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

export { carsRoutes };
