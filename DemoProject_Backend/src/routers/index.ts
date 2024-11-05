
import Country from "@modules/Country/index";

import State from "@modules/State/index";

import City from "@modules/City/index";

import Category from "@modules/Category/index";

import SubCategory from "@modules/SubCategory/index";



export const routes = (app: any) => {
    app.use(`/api/country`, Country);
    app.use(`/api/state`, State);
    app.use(`/api/city`, City);
    app.use(`/api/category`, Category);
    app.use(`/api/subcategory`, SubCategory);
};
