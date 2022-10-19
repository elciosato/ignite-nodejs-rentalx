import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest) {
    const categoryAlreadExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadExists) {
      throw new Error("Category already exists!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
