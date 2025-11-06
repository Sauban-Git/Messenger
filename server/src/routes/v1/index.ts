import { Router } from "express";
import { userRouter } from "./user.js";
import { messageRouter } from "./message.js";
import { conversationRouter } from "./conversation.js";

const router = Router()

router.use("/user", userRouter)
router.use("/message", messageRouter)
router.use("/conversation", conversationRouter)

export { router as v1Routes }
