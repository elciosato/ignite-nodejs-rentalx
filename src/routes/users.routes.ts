import { Router } from "express";

import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListUsersController } from "../useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listUsersController.handle);
export { usersRoutes };
