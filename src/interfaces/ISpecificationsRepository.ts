import { Specification } from "../infra/typeORM/entities/Specification";
import { ICreateSpecificationDTO } from "./dtos/ICreateSpecificationDTO";

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(specifications_id: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
