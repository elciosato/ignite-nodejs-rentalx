import { User } from "../../entities/User";
import { ICreateUsersDTO } from "./dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
