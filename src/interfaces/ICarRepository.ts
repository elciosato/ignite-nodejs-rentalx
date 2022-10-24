import { Car } from "../infra/typeORM/entities/Car";
import { ICreateCarDTO } from "./dtos/ICreateCarDTO";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}

export { ICarRepository };
