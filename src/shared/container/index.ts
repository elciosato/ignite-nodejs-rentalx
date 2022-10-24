import { container } from "tsyringe";

import { CategoriesRepository } from "../../repositories/typeORM/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { SpecificationsRepository } from "../../repositories/typeORM/SpecificationsRepository";
import { UsersRepository } from "../../repositories/typeORM/UsersRepository";

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
