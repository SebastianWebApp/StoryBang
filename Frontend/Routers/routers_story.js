import { Router } from 'express';
import {Create_Story, Read_Id_Story, Update_Story} from "../Controllers/story.js";
const router_story = Router();


router_story.post('/Create_Story',Create_Story);
router_story.post('/Read_Id_Story',Read_Id_Story);
router_story.post('/Update_Story',Update_Story);
// router_story.post('/Read_Character',Read_Character);


export default router_story;
