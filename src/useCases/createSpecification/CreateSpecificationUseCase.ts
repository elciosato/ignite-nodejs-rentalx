import { inject, injectable } from "tsyringe";

import { ICreateSpecificationDTO } from "../../interfaces/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { AppError } from "../../shared/utils/AppError";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute(data: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadExists =
      await this.specificationsRepository.findByName(data.name);

    if (specificationAlreadExists) {
      throw new AppError("Specification already exists!");
    }
    await this.specificationsRepository.create(data);
  }
}

export { CreateSpecificationUseCase };
