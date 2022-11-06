import { UserToken } from "../infra/typeORM/entities/UserToken";
import { ICreateUserTokenDTO } from "./dtos/ICreateUserTokenDTO";
import { IFindByUserIdAndRefreshToken } from "./request/IFindByUserIdAndRefreshToken";

export interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindByUserIdAndRefreshToken): Promise<UserToken>;
}
