import { Router } from "express";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCarsController } from "../useCases/createCar/CreateCarsController";
import { ListAvailableCarsController } from "../useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
