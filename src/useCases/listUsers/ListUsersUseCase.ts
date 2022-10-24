import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeORM/entities/User";
import { IUsersRepository } from "../../interfaces/IUsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.list();
  }
}

export { ListUsersUseCase };
