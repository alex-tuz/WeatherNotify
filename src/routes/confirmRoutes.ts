import { Router } from 'express';
import { confirm } from '../controllers/confirmController';

const router = Router();

router.get('/:token', confirm);

export { router };
