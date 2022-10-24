import { Repository } from "typeorm";

import AppDataSource from "../../database/DataSource";
import { Category } from "../../entities/category";
import { ICreateCategoryDTO } from "../interfaces/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../interfaces/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.categoryRepository.create({
      name,
      description,
    });
    await this.categoryRepository.save(category);
  }
  async list(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ name });
  }
}

export { CategoriesRepository };
