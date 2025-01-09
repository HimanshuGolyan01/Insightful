import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@harshgolyan/my-blog-app-common";

export const blogRouter = new  Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET : string
    },
    Variables: {
        userId : string,
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization')
    if(!jwt) {
      return c.json({error: "unauthorized"})
    }
    const token = jwt.split(' ')[1]
    const decode = await verify(token, c.env.JWT_SECRET)
    if(!decode) {
      return c.json({error:"token not matched"})
    }
    c.set("userId", decode.id)
    c.json({message:"authorized"})
    await next()
  })

blogRouter.post('/create-blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const authorId = c.get("userId")
    
    try {
        const {success} = createPostInput.safeParse(body)
        if (!success) {
          return c.json({error: 'Invalid request body'})
        }
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        c.status(200)
        return c.json({post: post})
    } catch (error) {
        c.status(403)
        return c.json({error: "create blog failed"})
    }
})

blogRouter.put('/update-blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const authorId = c.get("userId")
    
    try {
        const {success} = updatePostInput.safeParse(body)
        if (!success) {
          return c.json({error: 'Invalid request body'})
        }
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: authorId
            },
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        c.status(200)
        return c.json({message : "post updated"})
    } catch (error) {
        c.status(403)
        return c.json({error: "create blog failed"})
    }
})

blogRouter.get('/get-blog/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId : true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json(post);
    } catch (error) {
        return c.json({error: "can not get blog "})
    }
})

blogRouter.get('/my-blogs', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const authorId = c.get("userId")
	
    try {
        const myPosts = await prisma.post.findMany({
            where: {
                authorId : authorId
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId : true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json(myPosts);
    } catch (error) {
        return c.json({error: "can not get blog "})
    }
})

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                authorId : true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
	    return c.json(posts);
    } catch (error) {
        return c.json({error: "can not get all posts"})
    }
})

blogRouter.delete('/delete-blog', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body = await c.req.json()
    const authorId = c.get("userId")

    try {
        const post = await prisma.post.delete({
            where: {
                id: body.id,
                authorId: authorId
            }
        });
        return c.json({message : "post deleted"});
    } catch (error) {
        return c.json({error : "can not delete post"})
    }
})

