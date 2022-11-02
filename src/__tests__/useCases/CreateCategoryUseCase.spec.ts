import { InMemoryCategoriesRepository } from "../../infra/inMemory/repositories/InMemoryCategoriesRepository";
import { ICreateCategoryDTO } from "../../interfaces/dtos/ICreateCategoryDTO";
import { AppError } from "../../shared/utils/AppError";
import { CreateCategoryUseCase } from "../../useCases/createCategory/CreateCategoryUseCase";

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
    const data: ICreateCategoryDTO = {
      name: "Duplicate Category Test",
      description: "Category Test Description",
    };
    await createCategoryUseCase.execute(data);
    await expect(createCategoryUseCase.execute(data)).rejects.toEqual(
      new AppError("Category already exists!")
    );
  });
});
