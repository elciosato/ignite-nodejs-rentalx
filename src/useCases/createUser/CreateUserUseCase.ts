import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "../../repositories/interfaces/dtos/ICreateUserDTO";
import { UsersRepository } from "../../repositories/UsersRepository";

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(data: ICreateUsersDTO): Promise<void> {
    const passwordHash = await hash(data.password, 8);
    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}

export { CreateUsersUseCase };
