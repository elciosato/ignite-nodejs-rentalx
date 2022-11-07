import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { AppError } from "../../shared/utils/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    console.log("expires:", userToken.expires_date);
    console.log("now:", new Date());
    if (userToken.expires_date < new Date()) {
      throw new AppError("Expired token");
    }

    const user = await this.usersRepository.findUserById(userToken.user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({ ...user, password: passwordHash });
  }
}
