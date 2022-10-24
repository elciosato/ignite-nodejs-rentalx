import { inject, injectable } from "tsyringe";

import { IUpdateUserAvatarDTO } from "../../interfaces/dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { deleteUploadsFile } from "../../shared/utils/file";

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
