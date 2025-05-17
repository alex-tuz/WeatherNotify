import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', 
  (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = req.query.city;
        res.send(`You param: ${city}`);
    } catch (err) {
    } finally {
      next();
    }
  }
);

export { router };