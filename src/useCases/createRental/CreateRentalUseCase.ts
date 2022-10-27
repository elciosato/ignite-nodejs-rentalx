import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/typeORM/entities/Rental";
import { ICreateRentalDTO } from "../../interfaces/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";
import { AppError } from "../../shared/utils/AppError";
import { dateDiffNowInHours } from "../../shared/utils/dateDiffNowInHours";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(data: ICreateRentalDTO): Promise<Rental> {
    const minHours = 24;

    const openRentalCar = await this.rentalsRepository.findOpenRentalByCar(
      data.car_id
    );
    if (openRentalCar) {
      throw new AppError(
        "New rental is not allowed when there is an open rental for the same car"
      );
    }

    const openRentalUser = await this.rentalsRepository.findOpenRentalByUser(
      data.user_id
    );
    if (openRentalUser) {
      throw new AppError(
        "New rental is not allowed when there is an open rental for the same user"
      );
    }

    const duration = dateDiffNowInHours(data.expected_return_date);
    console.log("Duration: ", duration);

    if (duration < minHours) {
      throw new AppError(
        `The expected rental duration must to be more than 24 hours`
      );
    }

    return this.rentalsRepository.create(data);
  }
}
export { CreateRentalUseCase };
