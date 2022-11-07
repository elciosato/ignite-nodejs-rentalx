import { InMemoryUsersRepository } from "../../infra/inMemory/repositories/InMemoryUsersReposiory";
import { InMemoryUserTokensRepository } from "../../infra/inMemory/repositories/InMemoryUserTokensRepository";
import { InMemoryMailProvider } from "../../shared/providers/MailProvider/InMemoryMailProvider";
import { AppError } from "../../shared/utils/AppError";
import { SendForgotPasswordMailUseCase } from "../../useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase";

let usersRepository: InMemoryUsersRepository;
let userTokensRepository: InMemoryUserTokensRepository;
let mailProvider: InMemoryMailProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send forgot password mail", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userTokensRepository = new InMemoryUserTokensRepository();
    mailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      userTokensRepository,
      mailProvider
    );
  });

  it("Should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    const user = {
      driver_license: "5568050254",
      email: "rekalun@cakowjab.rw",
      name: "Sylvia Poole",
      password: "uWjiWLcJgS",
    };
    await usersRepository.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send forgot password mail if the user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("vedot@vuh.au")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("Should be able to create an user token", async () => {
    const createUserTokens = jest.spyOn(userTokensRepository, "create");

    const user = {
      driver_license: "8844853789",
      email: "ibaawo@amne.fm",
      name: "Myrtle Saunders",
      password: "RTgMECevHn",
    };
    await usersRepository.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(createUserTokens).toHaveBeenCalled();
  });
});
