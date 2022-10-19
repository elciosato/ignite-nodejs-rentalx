import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/category";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

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
