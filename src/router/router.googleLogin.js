import express from 'express'
const router = express.Router()
import passport from '../config/config.google.js'
import { ProviderUser } from '../controller/controller.provider.user.js'
import { ProviderUserValidation } from '../middleware/middleware.provider.user.js'


router.get(
    "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }))

  router.get(
  "/google/callback",
  passport.authenticate("google", {
    session : false,
    failureRedirect: "http://localhost:5173/login",
  }),
  ProviderUserValidation,
  ProviderUser
);

export default router