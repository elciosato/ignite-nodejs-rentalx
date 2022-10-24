import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../repositories/typeORM/UsersRepository";
import { AppError } from "../utils/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    throw new AppError("Token not found", 401);
  }
  const [, token] = authHeaders.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "83bc7edea3c975eecea3d59769d8a523"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    req.user = {
      id: userId,
    };

    return next();
  } catch (e) {
    throw new AppError("Invalid token", 401);
  }
}
