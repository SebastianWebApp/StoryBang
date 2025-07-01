import app from "./src/app.js";
import { PORT } from "./src/config/index.js";
import logger from "./src/services/logs.service.js";


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Server Active http://localhost:${PORT}`);
  });
}