import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import AppDataSource from "../DataSource";

AppDataSource.initialize()
  .then(async () => {
    const password = await hash("admin123", 8);
    await AppDataSource.query(
      `
      insert into users(id, name, email, password, driver_license, "isAdmin") 
      values ($1, $2, $3, $4, $5, $6);
      `,
      [uuidV4(), "Admin", "admin@gmail.com", password, "007", true]
    ).then(() => {
      AppDataSource.destroy();
    });
  })
  .catch((error) => console.log(error));

//   `
// select * from users where email = $1;
// `,
//   ["elciosato@gmail.com"]
