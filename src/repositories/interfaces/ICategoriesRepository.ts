import { Category } from "../../entities/category";
import { ICreateCategoryDTO } from "./dtos/ICreateCategoryDTO";

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
