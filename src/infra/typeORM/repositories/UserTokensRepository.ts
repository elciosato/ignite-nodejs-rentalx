import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../interfaces/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "../../../interfaces/IUserTokensRepository";
import { IFindByUserIdAndRefreshToken } from "../../../interfaces/request/IFindByUserIdAndRefreshToken";
import AppDataSource from "../database/DataSource";
import { UserToken } from "../entities/UserToken";

export class UserTokensRepository implements IUserTokensRepository {
  private userTokensRepository: Repository<UserToken>;

  constructor() {
    this.userTokensRepository = AppDataSource.getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.userTokensRepository.create(data);
    await this.userTokensRepository.save(userToken);
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.userTokensRepository.delete({ id });
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindByUserIdAndRefreshToken): Promise<UserToken> {
    return this.userTokensRepository.findOneBy({ user_id, refresh_token });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.userTokensRepository.findOneBy({ refresh_token });
  }
}
