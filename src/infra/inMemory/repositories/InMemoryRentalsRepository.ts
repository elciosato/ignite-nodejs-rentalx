import { ICreateRentalDTO } from "../../../interfaces/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../interfaces/IRentalsRepository";
import { Rental } from "../../typeORM/entities/Rental";

class InMemoryRentalsRepository implements IRentalsRepository {
  private rentalsRepository: Rental[];

  constructor() {
    this.rentalsRepository = [];
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, { ...data, start_date: new Date() });
    this.rentalsRepository.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentalsRepository.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentalsRepository.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentalsRepository.find((rental) => rental.id === id);
  }
}
export { InMemoryRentalsRepository };
