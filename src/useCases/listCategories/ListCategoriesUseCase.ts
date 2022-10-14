import { ICategoriesRepository } from "../../interfaces/ICategoriesRepository";
import { Category } from "../../models/category";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  execute(): Category[] {
    return this.categoryRepository.list();
  }
}
export { ListCategoriesUseCase };
