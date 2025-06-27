// Config.js
import dotenv from 'dotenv';
dotenv.config(); // se carga al momento de importar el archivo

class Config {
  static get port() {
    return process.env.PORT;
  }

  static get awsRegion() {
    return process.env.AWS_REGION;
  }
  static credentials(set = 1) {
    return {
      accessKeyId: process.env[`AWS_ACCESS_KEY_ID_${set}`],
      secretAccessKey: process.env[`AWS_SECRET_ACCESS_KEY_${set}`],
      sessionToken: process.env[`AWS_SESSION_TOKEN_${set}`]
    };
  }
}

export default Config;