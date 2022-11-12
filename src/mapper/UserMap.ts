import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeORM/entities/User";
import { IUserResponseDTO } from "../interfaces/dtos/IUserResponseDTO";

export class UserMap {
  static toDTO(data: User): IUserResponseDTO {
    const user = instanceToInstance({
      id: data.id,
      email: data.email,
      name: data.name,
      driver_license: data.driver_license,
      avatar: data.avatar,
      avatar_url: data.avatar_url,
    });

    return user;
  }
}
