import { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { prisma } from "../db/prisma.js"

type Status = "start" | "stop"

const onlineUsersMap = new Map<string, string>
const onlineCount = new Map<string, number>


export const setupSocket = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // allow all origins (use specific origins in production)
    },
  })

  io.use((socket, next) => {

    console.log("reached io.use")

    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("No token found"))

      const itoken = token.split(" ")[1]
      if (!itoken) return next(new Error("token is invalid"))

      const decoded = jwt.verify(itoken, process.env.JWT_SECRET_KEY || "123456") as JwtPayload
      socket.data.userId = decoded.userId

      console.log("done iouse: ", socket.data.userId)
      next()
    } catch (error) {
      console.log("Authorization failed: ", error)
      next(new Error("Authorization failed"))
    }

  })

  io.engine.on("connect_error", (err) => {
    console.log("ENGINE.IO ERROR:");
    console.log("  code:", err.code);
    console.log("  message:", err.message);
    console.log("  context:", err.context);
  });

  io.on("connection", async (socket) => {
    const userId = socket.data.userId


    console.log("Socket Connected: ", socket.id)

    onlineUsersMap.set(socket.id, userId)

    const count = onlineCount.get(userId) || 0

    onlineCount.set(userId, count + 1)

    io.emit("online", { onlineUser: Array.from(onlineCount.keys()) })

    io.emit("NewUser", { id: socket.id })

    // For new conversation created for this participant ....
    socket.join(userId)

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: { some: { id: userId } }
      },
      select: {
        id: true
      }
    })

    conversations.forEach((c) => socket.join(c.id))

    socket.on("message:new", async ({ message, conversationId }: { message: string, conversationId: string }) => {
      console.log(message)
      const msg = await prisma.message.create({
        data: {
          content: message,
          conversationId: conversationId,
          createdAt: new Date(),
          senderId: userId
        }
      })
      io.to(conversationId).emit("message:new", { id: socket.id, message: msg })
    })

    socket.on("typing:status", ({ conversationId, typing }: { conversationId: string, typing: Status }) => {
      io.to(conversationId).emit("typing:status", { userId: userId, typing })
    })

    socket.on("disconnect", () => {
      console.log("User disconnected socketid: ", socket.id)
      io.emit("UserLeft", { id: socket.id })
      const userId = onlineUsersMap.get(socket.id);
      if (userId) {
        const count = onlineCount.get(userId)! - 1;
        if (count <= 0) {
          onlineCount.delete(userId); // user completely offline
        } else {
          onlineCount.set(userId, count); // still has other tabs open
        }
        onlineUsersMap.delete(socket.id);
      }

      io.emit("online", { onlineUser: Array.from(onlineCount.keys()) })
    })
  })

  return io
}
