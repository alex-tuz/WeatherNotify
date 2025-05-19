import { Router } from 'express';
import { subscribe } from '../controllers/subscriptionController';

const router = Router();

router.post('/', subscribe);

export { router };
