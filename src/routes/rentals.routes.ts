import { Router } from "express";

import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateRentalController } from "../useCases/createRental/CreateRentalController";
import { ReturnRentalController } from "../useCases/returnRental/ReturnRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  "/:id/return",
  ensureAuthenticated,
  returnRentalController.handle
);

export { rentalsRoutes };
