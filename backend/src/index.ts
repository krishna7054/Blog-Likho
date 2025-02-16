import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors';



const app = new Hono<{
  Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

app.use('/*',cors({
  origin: 'http://localhost:5173', // Allow only the frontend origin
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Allow credentials (cookies, authorization headers)
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600
}))

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog", blogRouter);





export default app
