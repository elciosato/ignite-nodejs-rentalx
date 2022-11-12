import { inject, injectable } from "tsyringe";

import { User } from "../../infra/typeORM/entities/User";
import { IUserResponseDTO } from "../../interfaces/dtos/IUserResponseDTO";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { UserMap } from "../../mapper/UserMap";

@injectable()
export class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findUserById(id);
    return UserMap.toDTO(user);
  }
}
