import {
  ISpecificationsRepository,
  ISpecificationsDTO,
} from "../interfaces/ISpecificationsRepository";
import { Specification } from "../models/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationsDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    return this.specifications.find((spec) => spec.name === name);
  }
}

export { SpecificationsRepository };
