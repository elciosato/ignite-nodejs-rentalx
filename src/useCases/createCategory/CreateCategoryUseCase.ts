import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../repositories/interfaces/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";
import { AppError } from "../../utils/AppError";

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
