export interface ICountry {
    country_id: number;
    name: string;
    flag: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICountryCreation {
    country_id?: number;
    name?: string;
    flag?: string;
    created_at?: Date;
    updated_at?: Date;
}


