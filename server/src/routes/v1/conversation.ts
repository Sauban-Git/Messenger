import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";
import { authmiddleware } from "../../middleware/user.js";

const router = Router();

router.use(authmiddleware)

router.get("/", async (req: Request, res: Response) => {
  const userId = (req as any).userId
  if (!userId) return res.status(500).json({
    error: "User not verified"
  })

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
        isGroup: true,
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
  const { participantId, isGroup }: { userId: string, participantId: string, isGroup: boolean } = req.body
  const userId = (req as any).userId
  if (!userId) return res.status(400).json({
    error: "User not verified"
  })

  let name = null
  try {
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
        },
        select: {
          id: true,
          name: true,
          isGroup: true,
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
      if (existingconv) {
        return res.status(404).json({
          existingconv
        })
      } else {
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
          },
          select: {
            id: true,
            name: true,
            isGroup: true,
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

      }
    }
  } catch (error) {
    console.log("error: ", error)
    return res.status(400).json({
      error: "Error servber"
    })
  }
})

export { router as conversationRouter }
