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
      category_id: "1437775d-9af7-48e0-a447-d5ee5ac8d77e",
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
      category_id: "2f68c011-27bd-452a-914e-421467c6d1c9",
    });

    expect(cars.length).toEqual(1);
  });

  it("Should be able list all available cars by brand and category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      brand: "VW",
      category_id: "c1d1d5e2-ecbe-43ef-80b6-b5d90a6c83b9",
    });

    expect(cars.length).toEqual(1);
  });

  it("Should be able list all available cars by name, brand, and category_id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      name: "Corolla",
      brand: "Toyota",
      category_id: "2f68c011-27bd-452a-914e-421467c6d1c9",
    });

    expect(cars.length).toEqual(1);
  });
});
