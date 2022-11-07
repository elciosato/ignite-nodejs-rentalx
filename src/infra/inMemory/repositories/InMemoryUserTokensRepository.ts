import { ICreateUserTokenDTO } from "../../../interfaces/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "../../../interfaces/IUserTokensRepository";
import { IFindByUserIdAndRefreshToken } from "../../../interfaces/request/IFindByUserIdAndRefreshToken";
import { UserToken } from "../../typeORM/entities/UserToken";

export class InMemoryUserTokensRepository implements IUserTokensRepository {
  userTokensRepository: UserToken[];

  constructor() {
    this.userTokensRepository = [];
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, data);
    this.userTokensRepository.push(userToken);
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    this.userTokensRepository = this.userTokensRepository.filter(
      (userToken) => userToken.id !== id
    );
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindByUserIdAndRefreshToken): Promise<UserToken> {
    return this.userTokensRepository.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    return this.userTokensRepository.find(
      (userToken) => userToken.refresh_token === token
    );
  }
}
