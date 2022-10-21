import { inject, injectable } from "tsyringe";

import { IUpdateUserAvatarDTO } from "../../repositories/interfaces/dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { deleteUploadsFile } from "../../utils/file";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(data: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findUserById(data.id);
    if (user.avatar) {
      deleteUploadsFile(`avatar/${user.avatar}`);
    }
    await this.usersRepository.updateUserAvatar(data);
  }
}

export { UpdateUserAvatarUseCase };
