import { Router } from "express";

import { CreateCarsController } from "../useCases/createCar/CreateCarsController";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();

carsRoutes.post("/", createCarsController.handle);

export { carsRoutes };
