export interface IState {
    state_id: number;
    country_id: number;
    short_name: string;
    state_name: string;
    gst: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IStateCreation {
    country_id: number;
    short_name: string;
    state_name: string;
    gst: boolean;
}
