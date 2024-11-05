/* eslint-disable @typescript-eslint/no-explicit-any */
import { sequelize } from "./database";
import expressLoader from "./express";

export default async ({ expressApp }: { expressApp: any }) => {
  await sequelize;
  await expressLoader({ app: expressApp });
};
