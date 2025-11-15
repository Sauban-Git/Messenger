import { Router, type Request, type Response } from "express";
import { prisma } from "../../db/prisma.js";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { authmiddleware } from "../../middleware/user.js";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.params.query as string || ""
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { phone: { contains: query } }
        ]
      },
      select: {
        name: true,
        phone: true,
        id: true,
      }
    })

    if (users) {
      return res.status(200).json({
        users
      })
    } else {
      console.log("Something went wrong after getting users")
      return res.status(400).json({
        error: "Wrong query!"
      })
    }
  } catch (error) {
    console.log("Error while prisma query: ", error)
    return res.status(500).json({
      error: "Something went wrong!"
    })
  }
})

router.post("/signup", async (req: Request, res: Response) => {
  console.log("hit signup")
  const { name, phone, password }: { name: string, phone: string, password: string } = req.body
  const hashPassword = await argon2.hash(password)

  try {

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ error: "Phone already registered" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        hashPassword
      },
      select: {
        name: true,
        phone: true,
        id: true,
      }
    })

    if (user) {
      const secretKey = process.env.JWT_SECRET_KEY || "123456";
      const token = jwt.sign(
        { userId: user.id, phone: user.phone },
        secretKey,
        { expiresIn: "7d" }
      );

      const bearerToken = `Bearer ${token}`

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone
        },
        token: bearerToken
      })
    } else {
      console.log("Error after getting user data")
    }
  } catch (error) {
    console.log("Error while creating user: ", error)
    return res.status(500).json({
      error: "Error creating user.. try after sometimes"
    })
  }
})

router.post("/signin", async (req: Request, res: Response) => {

  console.log("hit signin")
  const { phone, password }: { phone: string, password: string } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      }
    })

    if (user) {
      const isPasswordValid = await argon2.verify(user.hashPassword, password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Phone or password is wrong!" });
      }

      const secretKey = process.env.JWT_SECRET_KEY || "123456";
      const token = jwt.sign(
        { userId: user.id, phone: user.phone },
        secretKey,
        { expiresIn: "7d" }
      );

      const bearerToken = `Bearer ${token}`

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone
        },
        token: bearerToken
      })

    } else {
      console.log("Error after getting user data")
      return res.status(400).json({
        error: "Phone or password is wrong!"
      })
    }
  } catch (error) {
    console.log("Error while creating user: ", error)
    return res.status(500).json({
      error: "Error creating user.. try after sometimes"
    })
  }
})

router.put("/", authmiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId
  if (!userId) return res.status(400).json({
    error: "Not authorized"
  })
  const { name }: { name: string } = req.body

  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name
      },
      select: {
        name: true,
        phone: true,
        id: true,
      }
    })
    if (user) {
      return res.status(200).json({
        user
      })
    } else {
      console.log(("Error while updating name"))
      return res.status(500).json({
        error: "Error while updating name...something went wrong at server side"
      })
    }
  } catch (error) {
    console.log("Error while updating name: ", error)
    return res.status(400).json({
      error: "Wrong credentials"
    })
  }
})

export { router as userRouter }
