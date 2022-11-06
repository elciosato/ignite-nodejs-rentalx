import { verify } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { AppError } from "../../shared/utils/AppError";
import { CreateUserTokenUseCase } from "../createUserToken/CreateUserTokenUseCase";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}
  async execute(refresh_token: string): Promise<string> {
    const createUserTokenUseCase = container.resolve(CreateUserTokenUseCase);

    const secret_refresh_token = process.env.SECRET_REFRESH_TOKEN;

    const { sub, email } = verify(
      refresh_token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken({
        user_id: sub,
        refresh_token,
      });

    if (!userToken) {
      throw new AppError("Refresh Token does not exists");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const newUserToken = await createUserTokenUseCase.execute({
      user_id: sub,
      email,
    });

    return newUserToken.refresh_token;
  }
}
