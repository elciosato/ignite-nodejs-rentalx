import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}
  execute(): Specification[] {
    return this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
