import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";
import { AppError } from "../../utils/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadExists) {
      throw new AppError("Specification already exists!");
    }
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
