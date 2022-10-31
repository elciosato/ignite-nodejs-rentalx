import { Rental } from "../infra/typeORM/entities/Rental";
import { ICreateRentalDTO } from "./dtos/ICreateRentalDTO";

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}
