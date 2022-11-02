import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/typeORM/entities/Rental";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    return this.rentalsRepository.listRentalsByUser(user_id);
  }
}

export { ListRentalsByUserUseCase };
