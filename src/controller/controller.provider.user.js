import { CreateProviderUser } from "../services/user.service.js";
import { createToken } from "../services/jwt.service.js";

export const ProviderUser = async (req, res) => {
  try {
    let response = await CreateProviderUser(req.user);
    if (!response.email) {
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    } else {
      const token = await createToken(response.email, response.id);
      if (token) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.FRONTEND_URL}/profile`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
