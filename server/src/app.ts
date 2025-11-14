import express, { type Request, type Response } from "express";
import routes from "./routes/index.js";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

export const app = express();


app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use("/api", routes)
