import { User } from "../infra/typeORM/entities/User";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "./dtos/IUpdateUserAvatarDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  list(): Promise<User[]>;
  updateUserAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
}

export { IUsersRepository };
