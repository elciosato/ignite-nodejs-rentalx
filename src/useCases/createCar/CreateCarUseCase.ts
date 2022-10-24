import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "../../interfaces/dtos/ICreateCarDTO";
import { ICarRepository } from "../../interfaces/ICarRepository";
import { AppError } from "../../shared/utils/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute(data: ICreateCarDTO): Promise<void> {
    const car = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );
    if (car) {
      throw new AppError("Car already exists");
    }
    this.carsRepository.create(data);
  }
}
export { CreateCarUseCase };
