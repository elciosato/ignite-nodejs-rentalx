import { User } from "../../entities/User";
import { ICreateUsersDTO } from "../interfaces/dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../interfaces/dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../interfaces/IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  private usersRepository: User[];

  constructor() {
    this.usersRepository = [];
  }
  async create(data: ICreateUsersDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);
    this.usersRepository.push(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.find((u) => u.email === email);
  }
  async findUserById(id: string): Promise<User> {
    return this.usersRepository.find((u) => u.id === id);
  }
  async list(): Promise<User[]> {
    return this.usersRepository;
  }
  async updateUserAvatar(data: IUpdateUserAvatarDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
export { InMemoryUsersRepository };
