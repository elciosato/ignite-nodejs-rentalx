import { Router } from "express";

import { ensureAdmin } from "../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateCarsController } from "../useCases/createCar/CreateCarsController";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

export { carsRoutes };
