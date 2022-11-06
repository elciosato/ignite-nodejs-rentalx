import { Router } from "express";

import { AuthUserController } from "../useCases/authUser/AuthUserController";
import { RefreshTokenController } from "../useCases/refreshToken/RefreshTokenController";

const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
