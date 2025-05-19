export interface CitySearchResult {
    name: string;
    country: string;
}

export interface ICityRepository {
    searchCities(query: string): Promise<CitySearchResult[]>;
} 