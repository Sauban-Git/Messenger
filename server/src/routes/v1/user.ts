import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.body.id
})

export { router as userRouter }
