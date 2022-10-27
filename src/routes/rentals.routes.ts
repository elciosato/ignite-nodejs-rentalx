import { Router } from "express";

import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateRentalController } from "../useCases/createRental/CreateRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalsRoutes };
