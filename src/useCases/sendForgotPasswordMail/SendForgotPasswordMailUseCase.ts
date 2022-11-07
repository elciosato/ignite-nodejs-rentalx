import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "../../infra/typeORM/repositories/UsersRepository";
import { UserTokensRepository } from "../../infra/typeORM/repositories/UserTokensRepository";
import { EtherealMailProvider } from "../../shared/providers/MailProvider/EtherealMailProvider";
import { AppError } from "../../shared/utils/AppError";
import { addHours } from "../../shared/utils/dateProvider";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: UserTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: EtherealMailProvider
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
