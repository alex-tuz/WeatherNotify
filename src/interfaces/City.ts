export interface City {
    id: number;
    name: string;
    country_id?: number;
}

export interface CityDTO {
    name: string;
    country_id: number;
}
