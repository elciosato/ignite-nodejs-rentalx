import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { IMailProvider } from "../../shared/providers/MailProvider/IMailProvider";
import { AppError } from "../../shared/utils/AppError";
import { addHours } from "../../shared/utils/dateProvider";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuidV4();
    const expires_date = addHours(3);
    this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const templatePath = resolve(
      __dirname,
      "../../views/emails/forgotPassword.hbs"
    );

    const customVariables = {
      name: user.name,
      link: `${process.env.BACKEND_SERVER}/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: "Recuperacao de Senha",
      customVariables,
      templatePath,
    });
  }
}
