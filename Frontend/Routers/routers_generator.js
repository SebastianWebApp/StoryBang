import { Router } from 'express';
import {Grok_Description_Image, Grok_Image_Generator, Grok_Text_Generator, Gpt2_Text_Generator, Translate, Gpt2Medium_Text_Generator} from "../Controllers/generator.js";
const router_generator  = Router();


function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

router_generator.post('/Grok_Text_Generator',Grok_Text_Generator);
router_generator.post('/Grok_Description_Image', Grok_Description_Image);
router_generator.post('/Grok_Image_Generator', Grok_Image_Generator);
router_generator.post('/Gpt2_Text_Generator', haltOnTimedout, Gpt2_Text_Generator);
router_generator.post('/Gpt2Medium_Text_Generator',haltOnTimedout , Gpt2Medium_Text_Generator);
router_generator.post('/Translate',haltOnTimedout , Translate);


export default router_generator;
