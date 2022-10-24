import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { Specification } from "../../infra/typeORM/entities/Specification";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
