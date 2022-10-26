import { ICreateCategoryDTO } from "../../../interfaces/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../interfaces/ICategoriesRepository";
import { Category } from "../../typeORM/entities/Category";
import categoriesFile from "./categoriesFile.json";

class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Category[];

  constructor() {
    this.categoriesRepository = categoriesFile;
  }
  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      ...data,
      create_at: Date.now(),
    });

    this.categoriesRepository.push(category);
    return category;
  }
  async findByName(name: string): Promise<Category> {
    return this.categoriesRepository.find((c) => c.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categoriesRepository;
  }
}

export { InMemoryCategoriesRepository };
