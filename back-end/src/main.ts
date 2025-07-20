import express, { Request, Response, NextFunction } from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./auth/routes/authRouter"

dotenv.config();


const app = express()
const PORT = process.env.PORT || 3001;


app.use(morgan("tiny"))
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie'],
    exposedHeaders: 'set-cookie',
  }),
);
app.use(express.json());

app.use("/api/auth", authRouter)

app.use((err: any, req: Request, resp: Response, next: NextFunction) => {
  const { status = 500, message = "Problem with server" } = err;
  resp.status(status).json({message})
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})


