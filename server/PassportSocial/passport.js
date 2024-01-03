import google from "passport-google-oauth20";
const GoogleStrategy = google.Strategy;
import twitter from "passport-twitter";
const TwitterStrategy = twitter.Strategy;
import github from "passport-github2";
const GitHubStrategy = github.Strategy;
import User from "../Models/UserModel.js";
import passport from "passport";

/*PASSPORT STRATEGY*/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await newUser.save();
          //*all data (profile) will send to front
          // cb(null, profile);
          //* only data are created in db mongo will send to front
          return cb(null, newUser);
        }
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, cb) {
      try {
        const user = await User.findOne({ twitterId: profile.id });
        if (!user) {
          const newUser = new User({
            twitterId: profile.id,
            name: profile.displayName,
          });
          await newUser.save();
          return cb(null, newUser);
        }
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      try {
        const user = await User.findOne({ githubId: profile.id });
        if (!user) {
          const newUser = new User({
            githubId: profile.id,
            name: profile.displayName,
          });
          await newUser.save();
          return cb(null, newUser);
        }
        cb(null, user);
      } catch (err) {
        cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
