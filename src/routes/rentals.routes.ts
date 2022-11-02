import { Router } from "express";

import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateRentalController } from "../useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "../useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "../useCases/returnRental/ReturnRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  "/:id/return",
  ensureAuthenticated,
  returnRentalController.handle
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
