import dayjs from "dayjs";

import { InMemoryCarsRepository } from "../../infra/inMemory/repositories/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "../../infra/inMemory/repositories/InMemoryRentalsRepository";
import { AppError } from "../../shared/utils/AppError";
import { CreateRentalUseCase } from "../../useCases/createRental/CreateRentalUseCase";

let rentalsRepository: InMemoryRentalsRepository;
let carsRepository: InMemoryCarsRepository;
let createRentalUseCase: CreateRentalUseCase;
const expectedDate = dayjs(new Date()).add(2, "days").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository();
    carsRepository = new InMemoryCarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository
    );
  });

  it("Should be able to create a new rental", async () => {
    const data1 = {
      car_id: "bdec1547-5d91-45f0-854b-ceef00776ff4",
      user_id: "08f763ee-a588-4432-81da-ea70a8c1ecbc",
      expected_return_date: expectedDate,
    };
    const data2 = {
      car_id: "bf1c9412-f94b-4083-905c-81408ea55761",
      user_id: "492d8943-78b7-4bea-a8d8-727c2a395d8b",
      expected_return_date: expectedDate,
    };
    const rental1 = await createRentalUseCase.execute(data1);
    const rental2 = await createRentalUseCase.execute(data2);

    expect(rental1).toHaveProperty("id");
    expect(rental2).toHaveProperty("id");
  });

  it("Should not be able to open a new rental when there is an open rental for the same car", async () => {
    const data1 = {
      car_id: "bdec1547-5d91-45f0-854b-ceef00776ff4",
      user_id: "08f763ee-a588-4432-81da-ea70a8c1ecbc",
      expected_return_date: expectedDate,
    };

    const data2 = {
      car_id: "bdec1547-5d91-45f0-854b-ceef00776ff4",
      user_id: "492d8943-78b7-4bea-a8d8-727c2a395d8b",
      expected_return_date: expectedDate,
    };
    await createRentalUseCase.execute(data1);
    await expect(createRentalUseCase.execute(data2)).rejects.toEqual(
      new AppError(
        "New rental is not allowed when there is an open rental for the same car"
      )
    );
  });

  it("Should not be able to open a new rental when there is an open rental for the same user", async () => {
    const data1 = {
      car_id: "bdec1547-5d91-45f0-854b-ceef00776ff4",
      user_id: "08f763ee-a588-4432-81da-ea70a8c1ecbc",
      expected_return_date: expectedDate,
    };

    const data2 = {
      car_id: "bf1c9412-f94b-4083-905c-81408ea55761",
      user_id: "08f763ee-a588-4432-81da-ea70a8c1ecbc",
      expected_return_date: expectedDate,
    };

    await createRentalUseCase.execute(data1);
    await expect(createRentalUseCase.execute(data2)).rejects.toEqual(
      new AppError(
        "New rental is not allowed when there is an open rental for the same user"
      )
    );
  });

  it("Should not be able to open a new rental when expected rental duration is less than 24 hours", async () => {
    const data1 = {
      car_id: "296a23e7-1d16-4e2b-a28f-b7c2d3d184f7",
      user_id: "08f763ee-a588-4432-81da-ea70a8c1ecbc",
      expected_return_date: new Date(),
    };
    await expect(createRentalUseCase.execute(data1)).rejects.toEqual(
      new AppError("The expected rental duration must to be more than 24 hours")
    );
  });
});
