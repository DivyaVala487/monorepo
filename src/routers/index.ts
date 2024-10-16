import { authentication } from "@middleware/middleware";
import User from "@modules/User/index";


export const routes = (app: any) => {
    app.use(`/api/user`, User);
};
