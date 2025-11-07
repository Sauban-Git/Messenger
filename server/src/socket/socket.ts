import { Server as HttpServer } from "http"
import { Server as SocketIOServer } from "socket.io"

export const setupSocket = async (server: HttpServer) => {
  const io = new SocketIOServer(server)

  io.on("connection", (socket) => {
    console.log("Socket Connected: ", socket.id)

  })


  return io
}
