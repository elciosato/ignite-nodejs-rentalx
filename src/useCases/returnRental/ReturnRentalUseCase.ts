import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../interfaces/ICarsRepository";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";
import { AppError } from "../../shared/utils/AppError";
import { dateDiffDays } from "../../shared/utils/dateProvider";

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute(id: string) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    rental.end_date = new Date();
    let rentalDays = dateDiffDays(rental.start_date, rental.end_date);
    console.log("rentalDays: ", rentalDays);
    if (rentalDays < 1) {
      rentalDays = 1;
    }

    rental.total = rentalDays * car.daily_rate;

    const rentalFine = dateDiffDays(
      rental.expected_return_date,
      rental.end_date
    );
    console.log("rentalFine: ", rentalFine);
    if (rentalFine > 0) {
      rental.total += rentalFine * car.fine_amount;
    }

    await this.carsRepository.updateAvailable({ id: car.id, available: true });
    return this.rentalsRepository.create(rental);
  }
}
export { ReturnRentalUseCase };
