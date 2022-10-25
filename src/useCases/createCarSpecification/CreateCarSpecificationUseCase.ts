import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeORM/entities/Car";
import { ICreateCarSpecificationDTO } from "../../interfaces/dtos/ICreateCarSpecificationDTO";
import { ICarRepository } from "../../interfaces/ICarRepository";
import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { AppError } from "../../shared/utils/AppError";

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute(data: ICreateCarSpecificationDTO): Promise<Car> {
    const car = await this.carsRepository.findById(data.car_id);
    if (!car) {
      throw new AppError("Car does not exists");
    }
    const specifications = await this.specificationsRepository.findByIds(
      data.specifications_id
    );
    car.specifications = specifications;
    return this.carsRepository.create(car);
  }
}
export { CreateCarSpecificationUseCase };
