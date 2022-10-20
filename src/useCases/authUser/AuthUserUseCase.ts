import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { AppError } from "../../utils/AppError";

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
}
@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
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
    const token = sign({}, "83bc7edea3c975eecea3d59769d8a523", {
      subject: user.id,
      expiresIn: "1d",
    });
    const session: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
    return session;
  }
}
export { AuthUserUseCase };
