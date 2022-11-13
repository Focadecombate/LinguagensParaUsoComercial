import { NextFunction, Response, Request } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    return next();
  }

  console.error(error);
  res.status(500).send("Internal Server Error");
};
