import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "krishna007-common";


export const blogRouter= new Hono<{
    Bindings: {
          DATABASE_URL: string,
      JWT_SECRET:string
      },
      Variables : {
		userId: string
	}
  }>();


  blogRouter.use("/*", async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	// const token = jwt.split(' ')[1];
	const user = await verify(jwt, c.env.JWT_SECRET);
	if (user) {
        c.set('userId', String(user.id));
        await next()
		
	}else{
        c.status(401);
		return c.json({ error: "unauthorized" });
    }
	
})

blogRouter.post('/',async (c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
	datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body = await c.req.json();
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	const post = await prisma.post.create({
		data: {
			content: body.content,
			authorId: userId,
			publishedDate:new Date()
		}
	});
	return c.json({
		id: post.id
	});
})



	blogRouter.put('/:id',async (c)=>{
		const userId = c.get('userId');
		const id = c.req.param('id');
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL	,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		const { success } = updatePostInput.safeParse(body);
		if (!success) {
			c.status(400);
			return c.json({ error: "invalid input" });
		}
		console.log("Usr",userId);
		console.log("bl",id);
		await prisma.post.update({
			where: {
				id: id,
				authorId: userId
			},
			data: {
				
				content: body.content
				
			}
		});

		return c.text('updated post');
	})

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
		select:{
			content:true,
			publishedDate:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json({posts});
})

blogRouter.get('/:id',async (c)=>{
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findFirst({
		where: {
			id: id
		},
		select:{
			id:true,
			content:true,
			publishedDate:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json(post);
})
  
blogRouter.delete('/:id', async (c) => {
    const userId = c.get('userId');
    const id = c.req.param('id');
    console.log("User ID:", userId);
    console.log("Blog ID:", id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.deleteMany({
            where: {
                id: id,
                authorId: userId
            }
        });

        if (post.count === 0) {
            c.status(404);
            return c.json({ error: "Post not found or unauthorized" });
        }

        return c.json({ message: "Post deleted successfully" });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Internal server error" });
    }
});
