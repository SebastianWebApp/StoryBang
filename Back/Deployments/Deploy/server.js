import express from 'express';
import Config from './Config/index.js';
import Deployer from './Services/deployer.js';
import logger from "./Services/logs.service.js";

const app = express();
const deployer = new Deployer();


app.listen(Config.port, () => {
  logger.info(`Server Active http://localhost:${Config.port}`);
  console.log(`Servidor escuchando en http://localhost:${Config.port}`);
});

deployer.deployAll();