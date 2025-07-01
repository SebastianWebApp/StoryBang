import express from "express";
import { createJwt, verifyJwt } from "../controllers/jwtController.js";

const router = express.Router();

router.post("/Create_Jwt", createJwt);
router.post("/Verify_Jwt", verifyJwt);

export default router;