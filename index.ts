import cors from 'cors'
import "dotenv";
import "express-async-errors";
import express, {
  json,
  NextFunction,
  Request,
  Router,
  Response,
} from "express";

import { addRoutes } from "./api/router/router";

const createApp = () => {
  const app = express();

  app.use(cors())

  app.use(json());

  const router = Router();

  app.use("/v1", router);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });

  addRoutes(router);

  const port = !Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT)
    : 3000;

  app.listen(port, () => {
    console.log(`API Started at port ${port}`);
  });
};

createApp();
