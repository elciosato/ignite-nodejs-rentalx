import { In, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "../../../interfaces/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../../../interfaces/ISpecificationsRepository";
import AppDataSource from "../database/DataSource";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specificationRepository: Repository<Specification>;

  constructor() {
    this.specificationRepository = AppDataSource.getRepository(Specification);
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationRepository.create(data);

    return this.specificationRepository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.specificationRepository.findOneBy({ name });
  }

  async findByIds(specifications_id: string[]): Promise<Specification[]> {
    return this.specificationRepository.findBy({ id: In(specifications_id) });
  }

  async list(): Promise<Specification[]> {
    return this.specificationRepository.find();
  }
}

export { SpecificationsRepository };
