import { Router } from 'express';
import {Create_Character, Delete_Character, Update_Character, Read_Character} from "../Controllers/character.js";
const router_character = Router();


router_character.post('/Create_Character',Create_Character);
router_character.post('/Delete_Character',Delete_Character);
router_character.post('/Update_Character',Update_Character);
router_character.post('/Read_Character',Read_Character);


export default router_character;
