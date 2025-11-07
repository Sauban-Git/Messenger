import * as z from "zod"

export const userapi = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
})
