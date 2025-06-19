import { Router } from 'express';
import {Create_Story} from "../Controllers/story.js";
const router_story = Router();


router_story.post('/Create_Story',Create_Story);
// router_story.post('/Delete_Character',Delete_Character);
// router_story.post('/Update_Character',Update_Character);
// router_story.post('/Read_Character',Read_Character);


export default router_story;
