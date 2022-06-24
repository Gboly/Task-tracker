import { Router } from "express";
import passport from "passport";
import callback from "../../Controllers/Auth/googleAuthControllers.js";

const router = Router();

router.get("/",passport.authenticate("google",{ scope: ["profile", "email"] }))

router.get("/todo", passport.authenticate("google",{failureRedirect: "/login"}), callback)

export default router;