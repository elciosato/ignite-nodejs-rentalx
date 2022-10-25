import { ICreateSpecificationDTO } from "../../../interfaces/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../../../interfaces/ISpecificationsRepository";
import { Specification } from "../../typeORM/entities/Specification";
import specificationsFile from "./specificationsFile.json";

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private specificationRepository: Specification[];

  constructor() {
    this.specificationRepository = specificationsFile;
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, data);
    this.specificationRepository.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specificationRepository.find((spec) => spec.name === name);
  }

  async findByIds(specifications_id: string[]): Promise<Specification[]> {
    return this.specificationRepository.filter((spec) =>
      specifications_id.includes(spec.id)
    );
  }

  async list(): Promise<Specification[]> {
    return this.specificationRepository;
  }
}
export { InMemorySpecificationsRepository };
