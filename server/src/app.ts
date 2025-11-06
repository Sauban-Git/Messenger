import express, { type Request, type Response } from "express";
import routes from "./routes/index.js";

export const app = express();

app.use(express.json());

app.use("/api", routes)
