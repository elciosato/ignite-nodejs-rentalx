import { DataSource } from "typeorm";

import { Car } from "../entities/Car";
import { CarImage } from "../entities/CarImage";
import { Category } from "../entities/category";
import { Specification } from "../entities/Specification";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentalxUsr",
  password: "Ignite123",
  database: "rentalxDB",
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, Car, CarImage],
  migrations: ["src/infra/typeORM/database/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource;
