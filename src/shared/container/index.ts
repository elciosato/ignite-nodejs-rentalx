import { container } from "tsyringe";

import { CarsRepository } from "../../infra/typeORM/repositories/CarsRepository";
import { CategoriesRepository } from "../../infra/typeORM/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../infra/typeORM/repositories/SpecificationsRepository";
import { UsersRepository } from "../../infra/typeORM/repositories/UsersRepository";
import { ICarRepository } from "../../interfaces/ICarRepository";
import { ICategoriesRepository } from "../../interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { IUsersRepository } from "../../interfaces/IUsersRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarRepository>("CarsRepository", CarsRepository);
