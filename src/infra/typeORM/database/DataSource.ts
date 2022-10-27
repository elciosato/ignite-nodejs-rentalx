import { DataSource } from "typeorm";

import { Car } from "../entities/Car";
import { CarImage } from "../entities/CarImage";
import { Category } from "../entities/Category";
import { Rental } from "../entities/Rental";
import { Specification } from "../entities/Specification";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentalxUsr",
  password: "Ignite123",
  database: process.env.NODE_ENV === "test" ? "rentalxdb_test" : "rentalxDB",
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  migrations: ["src/infra/typeORM/database/migrations/*.ts"],
  subscribers: [],
});

export default AppDataSource;
