import { app } from "./app.js";
import { createServer } from "http";
import { setupSocket } from "./socket/socket.js";
const httpServer = createServer(app);

export const io = setupSocket(httpServer)

httpServer.listen(3000, "0.0.0.0", () => {
  console.log("Server started at 3000");
});
