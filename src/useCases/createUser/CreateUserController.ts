import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUsersUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;
    const createUserUseCase = container.resolve(CreateUsersUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return res.status(201).send();
  }
}
export { CreateUserController };
