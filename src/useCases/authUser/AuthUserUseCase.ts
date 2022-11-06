import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

import { UserToken } from "../../infra/typeORM/entities/UserToken";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { auth } from "../../shared/config/auth";
import { AppError } from "../../shared/utils/AppError";
import { addDays } from "../../shared/utils/dateProvider";
import { CreateUserTokenUseCase } from "../createUserToken/CreateUserTokenUseCase";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
  refresh_token: string;
}
@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const { expiresIn_token } = auth;

    const secret_token = process.env.SECRET_TOKEN;

    const createUserTokenUseCase = container.resolve(CreateUserTokenUseCase);

    // Find user by email
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }
    // Test if password Match
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }
    // Create token
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expiresIn_token,
    });

    const userToken: UserToken = await createUserTokenUseCase.execute({
      user_id: user.id,
      email,
    });

    const session: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
      refresh_token: userToken.refresh_token,
    };
    return session;
  }
}
export { AuthUserUseCase };
