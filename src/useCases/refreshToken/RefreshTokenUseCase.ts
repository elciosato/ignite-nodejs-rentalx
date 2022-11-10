import { sign, verify } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { auth } from "../../shared/config/auth";
import { AppError } from "../../shared/utils/AppError";
import { CreateUserTokenUseCase } from "../createUserToken/CreateUserTokenUseCase";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}
  async execute(refresh_token: string): Promise<IResponse> {
    const createUserTokenUseCase = container.resolve(CreateUserTokenUseCase);
    const { expiresIn_token } = auth;

    const secret_token = process.env.SECRET_TOKEN;
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

    // Create token
    const token = sign({}, secret_token, {
      subject: sub,
      expiresIn: expiresIn_token,
    });

    return { token, refresh_token: newUserToken.refresh_token };
  }
}
