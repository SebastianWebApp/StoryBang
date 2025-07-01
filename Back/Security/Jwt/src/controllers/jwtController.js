import { createToken, verifyToken } from "../services/jwtService.js";
import logger from "../services/logs.service.js";

export function createJwt(req, res) {
  const { Id } = req.body;
  if (!Id) {
    logger.warn(`ID es requerido: false`);
    return res.status(400).json({
      Status: false,
      Response: "ID es requerido"
    });
  }
  try {
    const token = createToken(Id);
    logger.info(`Security created successfully`);
    res.json({
      Status: true,
      Response: "Security created successfully",
      Content: token
    });
  } catch (error) {
    logger.warn(`Error al crear token ${error}`);
    res.status(500).json({
      Status: false,
      Response: "Error al crear token"
    });
  }
}

export function verifyJwt(req, res) {
  const { Token } = req.body;
  if (!Token) {
    logger.warn(`Session expired. Please log in again.`);
    return res.status(401).json({
      Status: false,
      Response: "Session expired. Please log in again."
    });
  }
  try {
    const decoded = verifyToken(Token);
    logger.info(decoded);
    res.json({
      Status: true,
      Response: "Valid token",
      Id: decoded
    });
  } catch (error) {
    logger.warn(`Error al crear token ${error}`);
    res.status(401).json({
      Status: false,
      Response: "Invalid token or session expired. Please log in again."
    });
  }
}