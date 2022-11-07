import { container } from "tsyringe";

import { CarsImagesRepository } from "../../infra/typeORM/repositories/CarsImagesRepository";
import { CarsRepository } from "../../infra/typeORM/repositories/CarsRepository";
import { CategoriesRepository } from "../../infra/typeORM/repositories/CategoriesRepository";
import { RentalsRepository } from "../../infra/typeORM/repositories/RentalsRepository";
import { SpecificationsRepository } from "../../infra/typeORM/repositories/SpecificationsRepository";
import { UsersRepository } from "../../infra/typeORM/repositories/UsersRepository";
import { UserTokensRepository } from "../../infra/typeORM/repositories/UserTokensRepository";
import { ICarsImagesRepository } from "../../interfaces/ICarsImagesRepository";
import { ICarsRepository } from "../../interfaces/ICarsRepository";
import { ICategoriesRepository } from "../../interfaces/ICategoriesRepository";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";
import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { IUserTokensRepository } from "../../interfaces/IUserTokensRepository";
import { EtherealMailProvider } from "../providers/MailProvider/EtherealMailProvider";
import { IMailProvider } from "../providers/MailProvider/IMailProvider";

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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

// container.registerSingleton<IMailProvider>(
//   "EtherealMailProvider",
//   EtherealMailProvider
// );
