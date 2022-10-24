import { Specification } from "../infra/typeORM/entities/Specification";
import { ICreateSpecificationDTO } from "./dtos/ICreateSpecificationDTO";

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create(data: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository };
