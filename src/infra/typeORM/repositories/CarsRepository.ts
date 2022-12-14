import { Repository } from "typeorm";

import { ICreateCarDTO } from "../../../interfaces/dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../interfaces/ICarsRepository";
import { IFindAvailableCars } from "../../../interfaces/request/IFindAvailableCars";
import { IUpdateAvailableCar } from "../../../interfaces/request/IUpdateAvailableCar";
import AppDataSource from "../database/DataSource";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private carsRepository: Repository<Car>;

  constructor() {
    this.carsRepository = AppDataSource.getRepository(Car);
  }
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.carsRepository.create(data);

    return this.carsRepository.save(car);
  }

  async findById(id: string): Promise<Car> {
    return this.carsRepository.findOneBy({ id });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.carsRepository.findOneBy({ license_plate: licensePlate });
  }

  async findAvailable(data: IFindAvailableCars): Promise<Car[]> {
    const carsQuery = this.carsRepository
      .createQueryBuilder()
      .where("available = :available", { available: true });

    if (data.name) {
      carsQuery.andWhere("name = :name", { name: data.name });
    }
    if (data.brand) {
      carsQuery.andWhere("brand = :brand", { brand: data.brand });
    }
    if (data.category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id: data.category_id,
      });
    }
    return carsQuery.getMany();
  }

  async updateAvailable(data: IUpdateAvailableCar): Promise<void> {
    await this.carsRepository
      .createQueryBuilder()
      .update()
      .set({ available: data.available })
      .where("id = :id")
      .setParameters({ id: data.id })
      .execute();
  }
}

export { CarsRepository };
