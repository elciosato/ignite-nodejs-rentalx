import { Category } from "../../entities/category";
import { ICreateCategoryDTO } from "../interfaces/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../interfaces/ICategoriesRepository";

class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Category[];

  constructor() {
    this.categoriesRepository = [];
  }
  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      ...data,
      create_at: Date.now(),
    });

    this.categoriesRepository.push(category);
  }
  async findByName(name: string): Promise<Category> {
    return this.categoriesRepository.find((c) => c.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categoriesRepository;
  }
}

export { InMemoryCategoriesRepository };
