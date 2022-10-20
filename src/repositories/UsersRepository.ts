import { Repository } from "typeorm";

import AppDataSource from "../database/DataSource";
import { User } from "../entities/User";
import { ICreateUsersDTO } from "./interfaces/dtos/ICreateUserDTO";
import { IUsersRepository } from "./interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async create(data: ICreateUsersDTO): Promise<void> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
  }
}

export { UsersRepository };
