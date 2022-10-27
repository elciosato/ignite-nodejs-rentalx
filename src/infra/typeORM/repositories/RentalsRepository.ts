import { Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../interfaces/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../interfaces/IRentalsRepository";
import AppDataSource from "../database/DataSource";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private rentalsRepository: Repository<Rental>;

  constructor() {
    this.rentalsRepository = AppDataSource.getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create(data);

    return this.rentalsRepository.save(rental);
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentalsRepository
      .createQueryBuilder()
      .where("car_id = :car_id", { car_id })
      .andWhere("end_date is NULL")
      .getOne();
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentalsRepository
      .createQueryBuilder()
      .where("user_id = :user_id", { user_id })
      .andWhere("end_date is NULL")
      .getOne();
  }
}
export { RentalsRepository };
