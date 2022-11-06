import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { UserToken } from "../../infra/typeORM/entities/UserToken";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { auth } from "../../shared/config/auth";
import { addDays } from "../../shared/utils/dateProvider";

interface IRequest {
  user_id: string;
  email: string;
}

@injectable()
export class CreateUserTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}
  async execute({ user_id, email }: IRequest): Promise<UserToken> {
    const secret_refresh_token = process.env.SECRET_REFRESH_TOKEN;
    const { expiresIn_refresh_token, expiresDays_refresh_token } = auth;

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expiresIn_refresh_token,
    });

    const expires_date = addDays(expiresDays_refresh_token);

    return this.userTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });
  }
}
