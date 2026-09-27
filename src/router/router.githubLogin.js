import express from "express";
import passport from "../config/config.github.js";
import { ProviderUser } from "../controller/controller.provider.user.js";
import { ProviderUserValidation } from "../middleware/middleware.provider.user.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/callback/github",
  passport.authenticate("github", {
    session : false,
    failureRedirect:  `${process.env.FRONTEND_URL}/login`,
  }), ProviderUserValidation, ProviderUser
);

 
export default router;