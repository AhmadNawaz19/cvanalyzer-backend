import { checkUserExist } from "../services/user.service.js";
import { createToken } from "../services/jwt.service.js";

export const ProviderUserValidation = async (req, res, next) => {
  try {
    console.log("github..", req.user);
    console.log(req.user.email);
    if (req.user.email) {
      let response = await checkUserExist(req.user.email);
      console.log(response);
      if (!response) {
        next();
      } else {
        const token = await createToken(response.email, response.id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.FRONTEND_URL}/profile`);
      }
    } else {
      console.log("faile in provider user validation middleware..");
    }
  } catch {}
};
