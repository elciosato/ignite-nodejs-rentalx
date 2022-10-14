import { Category } from "../../models/category";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  execute(): Category[] {
    return this.categoryRepository.list();
  }
}
export { ListCategoriesUseCase };
