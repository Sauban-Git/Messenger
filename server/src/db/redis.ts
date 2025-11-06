import { createClient, type RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6739",
})

redisClient.on("error", (error) => {
  console.error("Redis Error: ", error)
})

await redisClient.connect()
