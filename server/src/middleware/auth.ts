import { type NextFunction, type Response, type Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization
  if (!token) return res.status(400).json({
    error: "No token error"
  })

  const itoken = token.split(" ")[1]
  if (!itoken) return res.status(400).json({
    error: "No token provided!!!"

  })
  const key = process.env.JWT_SECRET_KEY || "1234546"
  try {

    const decoded = jwt.verify(itoken, key) as JwtPayload

    (req as any).userId = decoded.userId

  } catch (error) {
    console.log("User not verified: ", error)
    return res.status(400).json({
      error: "User not verified"
    })
  }
}
