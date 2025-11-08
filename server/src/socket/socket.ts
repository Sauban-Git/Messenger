import { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"

type Status = "start" | "stop"


let onlineUsers = new Set<string>
const onlineUsersMap = new Map<string, string>
const onlineCount = new Map<string, number>
const userId = "2344" // for now......


export const setupSocket = async (server: HttpServer) => {
  const io = new SocketIOServer(server)

  io.on("connection", (socket) => {
    console.log("Socket Connected: ", socket.id)

    onlineUsersMap.set(socket.id, userId)

    const count = onlineCount.get(userId) || 0

    onlineCount.set(userId, count + 1)

    io.emit("online", { onlineUser: Array.from(onlineCount.keys()) })

    io.emit("NewUser", { id: socket.id })

    socket.on("message:new", ({ message, conversationId }: { message: string, conversationId: string }) => {
      console.log(message)
      io.to(conversationId).emit("message:new", { id: socket.id, message })
    })

    socket.on("conversation:join", ({ conversationId }: { conversationId: string }) => {
      socket.join(conversationId)
      console.log("User: ", socket.id, " joined: ", conversationId)
    })

    socket.on("typing:status", ({ conversationId, typing }: { conversationId: string, typing: Status }) => {
      io.to(conversationId).emit("typing:status", { id: socket.id, typing })
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

      io.emit("online", Array.from(onlineCount.keys()));
    })
  })


  return io
}
