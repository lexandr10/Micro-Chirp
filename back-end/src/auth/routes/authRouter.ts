import express from "express";
import { register, login, getCurrentUser, logout, refresh } from "../controllers/auth.controller";
import emptyMiddleware from "../../middleware/emptyMiddleware";
import validateBody from "../decorators/validateBody";
import { registerSchema, loginSchema } from "../../schemas/joi.schemas";
import authenticate from "../../middleware/authenticate";


const authRouter = express.Router();

authRouter.post("/register", emptyMiddleware, validateBody(registerSchema), register)
authRouter.post("/login", emptyMiddleware, validateBody(loginSchema), login)
authRouter.get("/current", authenticate, getCurrentUser)
authRouter.post("/logout", authenticate, logout)
authRouter.post('/login/access-token', refresh);


export default authRouter;