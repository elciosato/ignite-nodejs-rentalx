import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "../../repositories/interfaces/dtos/ICreateUserDTO";
import { UsersRepository } from "../../repositories/typeORM/UsersRepository";
import { AppError } from "../../utils/AppError";

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(data: ICreateUsersDTO): Promise<void> {
    const userExists = await this.usersRepository.findUserByEmail(data.email);
    if (userExists) {
      throw new AppError("User email already exists");
    }
    const passwordHash = await hash(data.password, 8);
    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}

export { CreateUsersUseCase };
