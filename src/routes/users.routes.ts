import { Router } from "express";
import multer from "multer";

import uploadConfig from "../shared/config/upload";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListUsersController } from "../useCases/listUsers/ListUsersController";
import { ShowUserProfileController } from "../useCases/showUserProfile/ShowUserProfileController";
import { UpdateUserAvatarController } from "../useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRoutes.get(
  "/profile",
  ensureAuthenticated,
  showUserProfileController.handle
);

export { usersRoutes };
