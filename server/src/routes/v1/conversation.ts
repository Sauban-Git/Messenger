import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { userId }: { userId: string } = req.body

  try {
    const conversation = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId
          }
        }
      },
      select: {
        id: true,
        name: true,
        participants: {
          select: {
            id: true,
            name: true,
            phone: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            recievedAt: true,
            readAt: true,
            senderId: true
          }
        }
      }
    })

    if (conversation) {
      return res.status(200).json({
        conversation
      })
    }
  } catch (error) {
    console.log("Error while prisma creating conversation: ", error)
    return res.status(500).json({
      error: "Wrong input or data"
    })
  }
})

router.post("/", async (req: Request, res: Response) => {
  const { userId, participantId, isGroup }: { userId: string, participantId: string, isGroup: boolean } = req.body
  let name = null
  if (!isGroup) {
    const existingconv = await prisma.conversation.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: {
            OR: [
              { id: userId },
              { id: participantId }
            ]
          }
        }
      }
    })
    if (existingconv) {
      return res.status(404).json({
        existingconv
      })
    }
  }
  try {
    const conversation = await prisma.conversation.create({
      data: {
        isGroup,
        name,
        participants: {
          connect: [
            { id: userId },
            { id: participantId }
          ]
        }
      }
    })
    if (conversation) {
      return res.status(200).json({
        conversation
      })
    }
  } catch (error) {
    console.log("Error : ", error)
    return res.status(400).json({
      error: "Error while creating conversation.."
    })
  }
})

export { router as conversationRouter }
