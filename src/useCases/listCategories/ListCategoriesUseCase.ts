import { inject, injectable } from "tsyringe";

import { Category } from "../../infra/typeORM/entities/Category";
import { ICategoriesRepository } from "../../interfaces/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
export { ListCategoriesUseCase };
