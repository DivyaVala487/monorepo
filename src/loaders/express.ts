import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
// import { routes } from "@routers/index";
// import { routes } from "@routers/index";

export default ({ app }: { app: express.Application }) => {
  app.get("/health", (req, res) => {
    res.status(200).send({ status: true, message: "Server is running" });
  });

  app.head("/health", (req, res) => {
    res.status(200).end();
  });

  app.use(helmet());
  app.use(compression());

  app.use(cors({ origin: "*" }));
  app.use(express.json());

  // routes(app);
  app.use((req, res, next) => {
    const err: any = new Error("THE METHOD OR END POINT NOT PRESENT RE-CHECK ONCE");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ status: false, message: err.message }).end();
    }
    return next(err);
  });
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
    res.json({
      status: false,
      message: err.message,
    });
  });
};
