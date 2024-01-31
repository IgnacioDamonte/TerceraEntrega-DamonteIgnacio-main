import passport from "passport"
import { authorization } from "../middlewares/auth.middlewares.js"
import { Router } from "express"
import { githubCallback, sessionCurrent, sessionLogin, sessionLogout, sessionRegister } from "../controllers/session.controller.js"

const router = Router()

router.post("/login", passport.authenticate("login", { session: false, failureRedirect: "/" }), sessionLogin)

router.post("/register", passport.authenticate("register", { failureRedirect: "/", session: false }), sessionRegister)

router.get("/github", passport.authenticate("github", { scope: ['user:email'], session: false }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/", session: false }), githubCallback)

router.get("/current", passport.authenticate("jwt", { session: false }), authorization("user"), sessionCurrent)

router.get("/logout", sessionLogout)

export default router