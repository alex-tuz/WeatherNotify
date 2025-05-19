import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/:token', (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;
        res.send(`You confirm token is: ${token}`);
    } catch (err) {
    } finally {
        next();
    }
});

export { router };
