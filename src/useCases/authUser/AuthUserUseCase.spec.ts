import { InMemoryUsersRepository } from "../../repositories/inMemory/InMemoryUsersReposiory";
import { ICreateUsersDTO } from "../../repositories/interfaces/dtos/ICreateUserDTO";
import { AppError } from "../../utils/AppError";
import { CreateUsersUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUsersUseCase;
let authUserUseCase: AuthUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUsersUseCase(usersRepository);
    authUserUseCase = new AuthUserUseCase(usersRepository);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
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
    expect(async () => {
      const result = await authUserUseCase.execute({
        email: "test@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an email with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        name: "Harry Potter",
        email: "harrypotter@gmail.com",
        password: "test123123",
        driver_license: "23749823797",
      };

      await createUserUseCase.execute(user);

      const result = await authUserUseCase.execute({
        email: user.email,
        password: "incorrectpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
