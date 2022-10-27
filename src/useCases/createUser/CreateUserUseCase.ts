import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../interfaces/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { AppError } from "../../shared/utils/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.findUserByEmail(data.email);
    if (userExists) {
      throw new AppError("User email already exists");
    }
    const passwordHash = await hash(data.password, 8);
    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}

export { CreateUserUseCase };
