import express from "express";
import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@config": `${__dirname}/config`,
  "@loaders": `${__dirname}/loaders`,
  "@middleware": `${__dirname}/middlewares`,
  "@modules": `${__dirname}/modules`,
  "@dtos": `${__dirname}/dtos`,
  "@utils": `${__dirname}/helperFunctions`,
  "@routers": `${__dirname}/routers`,
  "@services": `${__dirname}/services`,
});

const app = express();

const loaderModule = async () => {
  require("./loaders").default({ expressApp: app });
};
loaderModule();
export default app;