import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof AppError) {
        logger.warn({
            message: err.message,
            path: req.path,
            method: req.method,
        });

        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        return;
    }

    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};

export { AppError, errorHandler };
