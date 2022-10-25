import { InMemoryCarsRepository } from "../../infra/inMemory/repositories/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "../../useCases/listAvailableCars/ListAvailableCarsUseCase";

let carsRepository: InMemoryCarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List all available cars", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("Should be able list all available cars", async () => {
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toEqual(9);
  });

  it("Should be able list all available cars by name", async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: "Corolla" });

    expect(cars.length).toEqual(3);
  });

  it("Should be able list all available cars by brand", async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: "VW" });

    expect(cars.length).toEqual(3);
  });

  it("Should be able list all available cars by category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category1",
    });

    expect(cars.length).toEqual(3);
  });

  it("Should be able list all available cars by name and brand", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      name: "Tucson",
      brand: "Hyundai",
    });

    expect(cars.length).toEqual(3);
  });

  it("Should be able list all available cars by name and category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      name: "Tucson",
      category_id: "category3",
    });

    expect(cars.length).toEqual(1);
  });

  it("Should be able list all available cars by brand and category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      brand: "VW",
      category_id: "category2",
    });

    expect(cars.length).toEqual(1);
  });

  it("Should be able list all available cars by name, brand, and category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      name: "Corolla",
      brand: "Toyota",
      category_id: "category1",
    });

    expect(cars.length).toEqual(1);
  });
});
