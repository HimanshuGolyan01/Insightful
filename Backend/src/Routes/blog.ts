import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify, sign, decode } from 'hono/jwt';
import {createPostInput,updatePostInput } from "@himanshugulia/insightful-common"

 const blogRouter = new  Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET : string
    },
    Variables: {
        userId : string,
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        c.status(403);
        return c.json({
            message: "Authorization token missing or invalid",
        });
    }

    const token = authHeader.split(" ")[1]; 
    try {
        const decode = await verify(token, c.env.JWT_SECRET);
        c.set("userId", decode.UserID); 
        await next(); 
    } catch (error) {
        c.status(403);
        return c.json({ error: "Token not matched" });
    }
});

blogRouter.post("/create", async (c) => {
console.log(c.get("userId"));

    const body = await c.req.json(); // Await the parsed JSON body
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const {success} = createPostInput.safeParse(body)
        if (!success) {
          return c.json({error: 'Invalid request body'})
        }
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        c.status(200)
        return c.json({post: post})
    } catch (error) {
        c.status(403)
        return c.json({error: "create blog failed"})
    }
})

blogRouter.put("/update", async (c) => {
    const userId = c.get("userId");
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const result = updatePostInput.safeParse(body);
        if (!result) {
            c.status(400);
            return c.json({ error: 'Invalid request body'});
        }

        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        c.status(200);
        return c.json({ message: "Post updated successfully" });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to update post" });
    }
});



blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany()

    return  c.json({
        posts
    })

})
blogRouter.get("/:id", async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const post = await prisma.post.findFirst({
            where: { id }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        return c.json({ post });
    } catch (e) {
        c.status(500);
        return c.json({ error: "Error while fetching the post" });
    }
});




export default blogRouter