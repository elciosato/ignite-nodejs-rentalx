import { DataSource } from "typeorm";

import "dotenv/config";
import { Car } from "../entities/Car";
import { CarImage } from "../entities/CarImage";
import { Category } from "../entities/Category";
import { Rental } from "../entities/Rental";
import { Specification } from "../entities/Specification";
import { User } from "../entities/User";
import { UserToken } from "../entities/UserToken";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test" ? "rentalxdb_test" : process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, Car, CarImage, Rental, UserToken],
  migrations: [process.env.DB_MIGRATION],
  subscribers: [],
});

export default AppDataSource;
