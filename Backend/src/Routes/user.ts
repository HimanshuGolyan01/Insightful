import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify, sign, decode } from 'hono/jwt';
import {signupInput , signinInput} from "@himanshugulia/insightful-common"; 
const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
}>();



userRouter.post("/signup", async (c) => {
    const body = await c.req.json(); 


    const {success} = signupInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ msg : "invalid user" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingUser = await prisma.user.findUnique({
        where: { email: body.email }
    });

    if (existingUser) {
        c.status(409);
        return c.json({ error: "User already exists" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        });

        const jwt = await sign({ UserID: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (e) {
        c.status(500);
        return c.json({ error: "Error while signing up" });
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();


    const success = signinInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ msg : "Invalid Inputs"});
    }

    
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "User not found" });
    }


    const jwt = await sign({ UserID: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
});

export default userRouter;
