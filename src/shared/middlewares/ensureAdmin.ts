import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "../../infra/typeORM/repositories/UsersRepository";
import { AppError } from "../utils/AppError";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  if (id) {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findUserById(id);
    if (user.isAdmin) {
      return next();
    }
  }
  throw new AppError("User is not admin");
}
