import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../interfaces/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../interfaces/ICategoriesRepository";
import { AppError } from "../../shared/utils/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: ICreateCategoryDTO) {
    const categoryAlreadExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadExists) {
      throw new AppError("Category already exists!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
