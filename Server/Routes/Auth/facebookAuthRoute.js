import { Router } from "express";
import passport from "passport"
import callback from "../../Controllers/Auth/facebookAuthController.js";

const router = Router();

router.get("/", passport.authenticate("facebook",{ scope: ["displayName", "email"] }))

router.get("/task-tracker", passport.authenticate("facebook",{failureRedirect: "/login"}), callback)

export default router