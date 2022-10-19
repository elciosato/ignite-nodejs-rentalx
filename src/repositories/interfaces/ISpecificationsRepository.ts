import { Specification } from "../../entities/Specification";

interface ISpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ name, description }: ISpecificationsDTO): Promise<void>;
}

export { ISpecificationsRepository, ISpecificationsDTO };
