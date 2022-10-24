import { InMemoryCategoriesRepository } from "../../repositories/inMemory/InMemoryCategoriesRepository";
import { ICreateCategoryDTO } from "../../repositories/interfaces/dtos/ICreateCategoryDTO";
import { AppError } from "../../utils/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("Should be able to create a new category", async () => {
    const data: ICreateCategoryDTO = {
      name: "Category Test",
      description: "Category Test Description",
    };
    await createCategoryUseCase.execute(data);

    const categoryCreated = await categoriesRepository.findByName(data.name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create more than one category with the same name", async () => {
    expect(async () => {
      const data: ICreateCategoryDTO = {
        name: "Category Test",
        description: "Category Test Description",
      };
      await createCategoryUseCase.execute(data);
      await createCategoryUseCase.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  });
});
