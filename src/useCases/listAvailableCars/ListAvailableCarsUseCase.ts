import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeORM/entities/Car";
import { ICarsRepository } from "../../interfaces/ICarsRepository";
import { IFindAvailableCars } from "../../interfaces/request/IFindAvailableCars";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IFindAvailableCars): Promise<Car[]> {
    return this.carsRepository.findAvailable(data);
  }
}
export { ListAvailableCarsUseCase };
