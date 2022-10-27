import { app } from "./app";
import AppDataSource from "./infra/typeORM/database/DataSource";

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => console.log(error));
