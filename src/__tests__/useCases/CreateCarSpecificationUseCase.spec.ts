import { InMemoryCarsRepository } from "../../infra/inMemory/repositories/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "../../infra/inMemory/repositories/InMemorySpecificationsRepository";
import { Car } from "../../infra/typeORM/entities/Car";
import { AppError } from "../../shared/utils/AppError";
import { CreateCarSpecificationUseCase } from "../../useCases/createCarSpecification/CreateCarSpecificationUseCase";

let carsRepository: InMemoryCarsRepository;
let specificationRepository: InMemorySpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    specificationRepository = new InMemorySpecificationsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationRepository
    );
  });

  it("Should be able to add a new car specification", async () => {
    const car_id = "bdec1547-5d91-45f0-854b-ceef00776ff4";
    const specifications_id: string[] = [
      "e70548f2-e423-4f9b-ae1f-26b5c2f0bb38",
      "5cf6578b-bbfa-4842-b729-82f376341871",
    ];

    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });
    expect(car).toBeInstanceOf(Car);
  });

  it("Should not be able to add a new car specification to an inexistent car id", async () => {
    expect(async () => {
      const car_id = "872348798";
      const specifications_id: string[] = ["38074892", "478932789"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
