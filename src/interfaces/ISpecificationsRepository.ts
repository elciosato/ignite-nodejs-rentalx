import { Specification } from "../models/Specification";

interface ISpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create({ name, description }: ISpecificationsDTO): void;
}

export { ISpecificationsRepository, ISpecificationsDTO };
