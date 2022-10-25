import { v4 as uuidV4 } from "uuid";

import carsFile from "../../../inMemory/repositories/carsFile.json";
import AppDataSource from "../DataSource";

AppDataSource.initialize()
  .then(async () => {
    carsFile.forEach(async (car) => {
      try {
        await AppDataSource.query(
          `
          insert into cars(id, name, description, available, daily_rate, license_plate, fine_amount, brand, category_id )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9);
          `,
          [
            uuidV4(),
            car.name,
            car.description,
            car.available,
            car.daily_rate,
            car.license_plate,
            car.fine_amount,
            car.brand,
            car.category_id,
          ]
        );
      } catch (e) {
        console.log(e);
      }
    });
  })
  .catch((error) => console.log(error));
// .finally(() => {
//   console.log("Destroy");
//   AppDataSource.destroy();
// });
