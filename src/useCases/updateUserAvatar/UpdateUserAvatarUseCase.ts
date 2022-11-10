import { inject, injectable } from "tsyringe";

import { IUpdateUserAvatarDTO } from "../../interfaces/dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IStorageProvider } from "../../shared/providers/StorageProvider/IStorageProvider";
import { deleteUploadsFile } from "../../shared/utils/file";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute(data: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.usersRepository.findUserById(data.id);

    if (user.avatar) {
      await this.storageProvider.delete({
        fileName: user.avatar,
        folderName: "avatar",
      });
    }

    await this.storageProvider.save({
      fileName: data.avatar,
      folderName: "avatar",
    });

    await this.usersRepository.updateUserAvatar(data);
  }
}

export { UpdateUserAvatarUseCase };
