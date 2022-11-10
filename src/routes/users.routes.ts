import { Router } from "express";
import multer from "multer";

import uploadConfig from "../shared/config/upload";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListUsersController } from "../useCases/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "../useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
export { usersRoutes };
