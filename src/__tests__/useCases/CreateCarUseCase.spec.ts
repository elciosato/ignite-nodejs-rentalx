import { InMemoryCarsRepository } from "../../infra/inMemory/repositories/InMemoryCarsRepository";
import { ICreateCarDTO } from "../../interfaces/dtos/ICreateCarDTO";
import { AppError } from "../../shared/utils/AppError";
import { CreateCarUseCase } from "../../useCases/createCar/CreateCarUseCase";

let carsRepository: InMemoryCarsRepository;
let createCarUseCase: CreateCarUseCase;

describe("Create a Car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const data: ICreateCarDTO = {
      name: "Car's name",
      description: "Car's description",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 100,
      brand: "BMW",
      category_id: "category",
    };
    await createCarUseCase.execute(data);

    const car = await carsRepository.findByLicensePlate(data.license_plate);

    expect(car).toHaveProperty("id");
  });

  it("Should be able to create a new car and the car must have be available by default", async () => {
    const data: ICreateCarDTO = {
      name: "Car's name",
      description: "Car's description",
      daily_rate: 100,
      license_plate: "ABC1235",
      fine_amount: 100,
      brand: "BMW",
      category_id: "category",
    };
    await createCarUseCase.execute(data);

    const car = await carsRepository.findByLicensePlate(data.license_plate);

    expect(car.available).toEqual(true);
  });

  it("Should not be able to have more than one car with same license plate", () => {
    expect(async () => {
      const data: ICreateCarDTO = {
        name: "Car's name",
        description: "Car's description",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 100,
        brand: "BMW",
        category_id: "category",
      };
      await createCarUseCase.execute(data);
      await createCarUseCase.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  });
});
