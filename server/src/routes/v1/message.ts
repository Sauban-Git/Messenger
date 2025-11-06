import { Router, type Request, type Response } from "express";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  console.log("getting all users.....Blah Blah")
})

export { router as messageRouter }
