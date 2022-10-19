import { container } from "tsyringe";

import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
