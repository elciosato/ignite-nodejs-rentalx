import { Repository } from "typeorm";

import AppDataSource from "../../database/DataSource";
import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ISpecificationsDTO,
} from "../interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specificationReposytory: Repository<Specification>;

  constructor() {
    this.specificationReposytory = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ISpecificationsDTO): Promise<void> {
    const specification = this.specificationReposytory.create({
      name,
      description,
    });

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
