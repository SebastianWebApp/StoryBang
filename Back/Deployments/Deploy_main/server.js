import express from 'express';
import Config from './Config/index.js';
import Deployer from './Services/deployer.js';

const app = express();
const deployer = new Deployer();


app.listen(Config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${Config.port}`);
});

deployer.deployAll();