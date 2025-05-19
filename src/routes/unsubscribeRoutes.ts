import { Router } from 'express';
import { unsubscribe } from '../controllers/unsubscribeController';

const router = Router();

router.get('/:token', unsubscribe);

export { router };
