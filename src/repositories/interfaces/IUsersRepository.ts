import { User } from "../../entities/User";
import { ICreateUsersDTO } from "./dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "./dtos/IUpdateUserAvatarDTO";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  list(): Promise<User[]>;
  updateUserAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
}

export { IUsersRepository };
