import { Car } from "../infra/typeORM/entities/Car";
import { ICreateCarDTO } from "./dtos/ICreateCarDTO";
import { IFindAvailableCars } from "./request/IFindAvailableCars";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(data: IFindAvailableCars): Promise<Car[]>;
}

export { ICarRepository };
