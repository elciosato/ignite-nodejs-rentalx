import { ICreateCarDTO } from "../../../interfaces/dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../interfaces/ICarsRepository";
import { IFindAvailableCars } from "../../../interfaces/request/IFindAvailableCars";
import { IUpdateAvailableCar } from "../../../interfaces/request/IUpdateAvailableCar";
import { Car } from "../../typeORM/entities/Car";
import carsFile from "./carsFile.json";

class InMemoryCarsRepository implements ICarsRepository {
  private carsRepository: Car[];
  constructor() {
    this.carsRepository = carsFile;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      ...data,
      available: true,
    });
    this.carsRepository.push(car);
    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.carsRepository.find((c) => c.id === id);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.carsRepository.find((c) => c.license_plate === licensePlate);
  }

  async findAvailable(data: IFindAvailableCars): Promise<Car[]> {
    return this.carsRepository.filter((c) => {
      return (
        c.available === true &&
        (!data.name || data.name === c.name) &&
        (!data.brand || data.brand === c.brand) &&
        (!data.category_id || data.category_id === c.category_id)
      );
    });
  }

  async updateAvailable(data: IUpdateAvailableCar): Promise<void> {
    const findIndex = this.carsRepository.findIndex((c) => c.id === data.id);
    this.carsRepository[findIndex].available = data.available;
  }
}

export { InMemoryCarsRepository };
