import { Repository } from "typeorm";

import { ICreateCarDTO } from "../../../interfaces/dtos/ICreateCarDTO";
import { ICarRepository } from "../../../interfaces/ICarRepository";
import AppDataSource from "../database/DataSource";
import { Car } from "../entities/Car";

class CarsRepository implements ICarRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = AppDataSource.getRepository(Car);
  }
  async create(data: ICreateCarDTO): Promise<void> {
    const car = this.carsRepository.create(data);

    await this.carsRepository.save(car);
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.carsRepository.findOneBy({ license_plate: licensePlate });
  }
}

export { CarsRepository };
