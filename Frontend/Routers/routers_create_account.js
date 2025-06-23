import { Router } from 'express';
import {Verification, Create_User, Read_User, Update_User, Delete_User, Verify_User, Recover_Password, JWT} from "../Controllers/login.js";
const router_create_account = Router();


// Iniciar Sesion
router_create_account.post('/Verification',Verification);
router_create_account.post('/Create_User',Create_User);
router_create_account.post('/Read_User',Read_User);
router_create_account.post('/Update_User',Update_User);
router_create_account.post('/Delete_User',Delete_User);
router_create_account.post('/Verify_User',Verify_User);
router_create_account.post('/Recover_Password',Recover_Password);
router_create_account.post('/JWT',JWT);

export default router_create_account;
