import { Router } from 'express';
import { searchCities } from '../controllers/cityController';

const router = Router();

router.get('/', searchCities);

export { router };
