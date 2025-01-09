import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@harshgolyan/my-blog-app-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
}>()

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
    const {success} = signupInput.safeParse(body)
    if (!success) {
      return c.json({error: 'Invalid request body'})
    }
		const user = await prisma.user.create({
			data: {
        name : body.name,
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id },c.env?.JWT_SECRET);
		return c.json({message:"sign up successful",jwt:jwt,user:user});
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl  : c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const {success} = signinInput.safeParse(body)
    if (!success) {
      return c.json({error: 'Invalid request body'})
    }
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user) {
      return c.json({error:"user not registered"})
    }
    const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
    return c.json({message: "sign in success", jwt: jwt,user:user})
  } catch (error) {
    c.status(422)
    return c.json({error : "sign in error"})
  }
})