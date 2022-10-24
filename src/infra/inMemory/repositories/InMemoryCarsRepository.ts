import { ICreateCarDTO } from "../../../interfaces/dtos/ICreateCarDTO";
import { ICarRepository } from "../../../interfaces/ICarRepository";
import { Car } from "../../typeORM/entities/Car";

class InMemoryCarsRepository implements ICarRepository {
  private carsRepository: Car[];
  constructor() {
    this.carsRepository = [];
  }
  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, {
      ...data,
      available: true,
    });
    this.carsRepository.push(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.carsRepository.find((c) => c.license_plate === licensePlate);
  }
}

export { InMemoryCarsRepository };
