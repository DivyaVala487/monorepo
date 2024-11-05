import { Sequelize } from "sequelize";
import config from "../config/config";

const { database, username, password, port, host } = config.database.mysql;

export const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host,
  port,
  logging: false,
});


sequelize
  .authenticate()
  .then(() => {
    console.log("MYSQL Connection has been established successfully.");
  })
  .catch((error) => {
    console.log("Unable to connect to database: ", error);
  });
