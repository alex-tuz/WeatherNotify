import { Request, Response, NextFunction } from 'express';
import { CityService } from '../services/cityService';
import { cityRepository } from '../repositories/cityRepository';

const cityService = new CityService(cityRepository);

export const searchCities = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const query = req.query.q as string;
        const cities = await cityService.searchCities(query);
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error searching cities:', error);
        if (error instanceof Error && error.message === 'Search query is required') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } finally {
        next();
    }
};
