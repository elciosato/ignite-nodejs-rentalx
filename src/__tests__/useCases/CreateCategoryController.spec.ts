import request from "supertest";

import { app } from "../../app";
import AppDataSource from "../../infra/typeORM/database/DataSource";
import { UsersRepository } from "../../infra/typeORM/repositories/UsersRepository";
import { ICreateUserDTO } from "../../interfaces/dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../../useCases/createUser/CreateUserUseCase";

// jest.useFakeTimers();

describe("Create Category Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    const userAdminData: ICreateUserDTO = {
      name: "Admin",
      email: "admin@example.com",
      password: "admin",
      driver_license: "007",
    };
    const usersRepository = new UsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const userAdmin = await usersRepository.findUserByEmail(
      userAdminData.email
    );
    if (!userAdmin) {
      await createUserUseCase.execute(userAdminData);
    }

    await AppDataSource.query(
      `update users set "isAdmin" = true where email = 'admin@example.com';`
    );
  });
  afterAll(async () => {
    await AppDataSource.query(`delete from categories;`);
    await AppDataSource.destroy();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@example.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(res.status).toBe(201);
  });

  it("Should not be able to create a new category with the same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@example.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(res.status).toBe(400);
  });

  it("Should be able to list categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@example.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const res = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
