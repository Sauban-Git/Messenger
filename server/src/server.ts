import { app } from "./app.js";
import { createServer } from "http";
const httpServer = createServer(app);

httpServer.listen(3000, () => {
  console.log("Server started at 3000");
});
