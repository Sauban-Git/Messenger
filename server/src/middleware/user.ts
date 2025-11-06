import { type NextFunction, type Request, type Response } from "express";

export const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("HEllo")
}
