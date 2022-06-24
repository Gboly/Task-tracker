import { Router } from "express";
import {signup, login, logout, check} from "../../Controllers/Auth/localAuthControllers.js"

const router = Router();

router.post("/signup", signup)

router.post("/login", login)

router.get("/logout", logout)

router.post("/check", check)


export default router;