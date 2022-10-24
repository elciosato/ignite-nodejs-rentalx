import { Repository } from "typeorm";

import { ICreateSpecificationDTO } from "../../../interfaces/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../../../interfaces/ISpecificationsRepository";
import AppDataSource from "../database/DataSource";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specificationReposytory: Repository<Specification>;

  constructor() {
    this.specificationReposytory = AppDataSource.getRepository(Specification);
  }

  async create(data: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specificationReposytory.create(data);

    await this.specificationReposytory.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.specificationReposytory.find();
  }

  async findByName(name: string): Promise<Specification> {
    return this.specificationReposytory.findOneBy({ name });
  }
}

export { SpecificationsRepository };
