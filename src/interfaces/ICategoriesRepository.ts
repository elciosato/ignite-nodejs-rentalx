import { Category } from "../infra/typeORM/entities/Category";
import { ICreateCategoryDTO } from "./dtos/ICreateCategoryDTO";

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository };
