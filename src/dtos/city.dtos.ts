export interface ICity {
    city_id: number;
    country_id: number;
    state_id: number;
    city_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICityCreation {
    country_id: number;
    state_id: number;
    city_name?: string;
}
