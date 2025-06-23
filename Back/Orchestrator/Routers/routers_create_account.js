import { Router } from 'express';
import { Recover_Password} from "../Controllers/login.js";
const router_create_account = Router();



router_create_account.post('/Recover_Password',Recover_Password);


export default router_create_account;
