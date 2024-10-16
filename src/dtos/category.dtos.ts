export interface ICategory {
    category_id: number;
    name: string;
    icon?: string | null;
    slug?: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ICategoryCreation {
    name: string;
    icon?: string | null;
    slug?: string | null;
}
