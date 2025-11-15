import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.use(authMiddleware)

router.get("/:conversationId", async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  if (!conversationId) return res.status(400).json({
    error: "Not allowed"
  })

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId
      }
    })
    if (messages) {
      return res.status(200).json({
        messages
      })
    } else {
      console.log("Error while getting messages")
    }
  } catch (error) {
    console.log("Error while getting messages: ", error)
  }
})

router.post("/", async (req: Request, res: Response) => {
  const { conversationId, content }: { conversationId: string, content: string } = req.body
  const senderId = (req as any).userId
  console.log("Message: ", content)

  try {
    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId
      }
    })
    if (message) {
      return res.status(200).json({
        message
      })
    }
    else {
      console.log("Error sending message ..")
      return res.status(500).json({
        error: "Error sending message"
      })
    }
  } catch (error) {
    console.log("Error sending message", error)
    return res.status(500).json({
      error: "Error creating message!"
    })
  }
})

router.put("/deliver", async (req: Request, res: Response) => {
  const { conversationId }: { conversationId: string } = req.body

  try {
    const status = await prisma.message.updateMany({
      where: {
        conversationId,
        recievedAt: null
      },
      data: {
        recievedAt: new Date()
      }
    })
    if (status.count) {
      console.log(status.count)
      return res.status(200).json({
        count: status.count
      })
    }
  } catch (error) {
    console.log("Error while prismaaa: ", error)
  }
})

router.put("/read", async (req: Request, res: Response) => {
  const { conversationId }: { conversationId: string } = req.body

  try {
    const status = await prisma.message.updateMany({
      where: {
        conversationId,
        readAt: null
      },
      data: {
        readAt: new Date()
      }
    })
    if (status.count) {
      console.log(status.count)
      return res.status(200).json({
        count: status.count
      })
    }
  } catch (error) {
    console.log("Error while prismaaa: ", error)
  }
})

export { router as messageRouter }
