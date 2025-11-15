import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.use(authMiddleware)

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
  console.log("New conversation being created..")
  const { participantId, isGroup }: { participantId: string, isGroup: boolean } = req.body
  const userId = (req as any).userId
  if (!userId) return res.status(400).json({
    error: "User not verified"
  })

  let name = null
  try {
    if (!isGroup) {
      console.log("Reached prisma query")
      const existingconv = await prisma.conversation.findFirst({
        where: {
          isGroup: false,
          AND: [
            { participants: { some: { id: userId } } },
            { participants: { some: { id: participantId } } }
          ]
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

      console.log("Reached prisma query")
      if (existingconv) {

        console.log("old conversation being sent..")
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

          console.log("New conversation being sent..")
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
