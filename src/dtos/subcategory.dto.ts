export interface ISubcategory {
    subcategory_id: number;
    category_id: number;
    sub_category_name: string;
    icon?: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ISubcategoryCreation {
    category_id: number;
    sub_category_name: string;
    icon?: string | null;
}