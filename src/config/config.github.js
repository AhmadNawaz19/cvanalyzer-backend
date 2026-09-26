import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/githubauth/callback/github`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          ...profile._json,
          'provider' : 'github'
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;