import { InMemoryUsersRepository } from "../../infra/inMemory/repositories/InMemoryUsersReposiory";
import { ICreateUserDTO } from "../../interfaces/dtos/ICreateUserDTO";
import { AppError } from "../../shared/utils/AppError";
import { AuthUserUseCase } from "../../useCases/authUser/AuthUserUseCase";
import { CreateUserUseCase } from "../../useCases/createUser/CreateUserUseCase";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authUserUseCase: AuthUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authUserUseCase = new AuthUserUseCase(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Harry Potter",
      email: "harrypotter@gmail.com",
      password: "test123123",
      driver_license: "23749823797",
    };

    await createUserUseCase.execute(user);

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an email that it does not exists", async () => {
    await expect(
      authUserUseCase.execute({
        email: "test@test.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("Should not be able to authenticate an email with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "Harry Potter",
      email: "harrypotter@gmail.com",
      password: "test123123",
      driver_license: "23749823797",
    };

    await createUserUseCase.execute(user);
    await expect(
      authUserUseCase.execute({
        email: user.email,
        password: "incorrectpassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
