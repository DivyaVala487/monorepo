import dotenv from "dotenv";

const envFound = dotenv.config({ path: `.env` });

const environment = {
  port: parseInt(process.env.PORT, 10),
  database: {
    mysql: {
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: (process.env.MYSQL_PORT as unknown as number) || 3306,
      dialect: "mysql",
    },
  },
};

export default environment;
