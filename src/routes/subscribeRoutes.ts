import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post('/', 
  (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, city, frequency } = req.body;
        res.send('post');
        console.log(email, city, frequency);
    } catch (err) {
    } finally {
      next();
    }
  }
);

export { router };