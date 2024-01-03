import express from "express";
const router = express.Router();
import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["user:email"] })
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get("/logout", (req, res) => {
  try {
    req.logout(() => {
      req.session.destroy();
      res.clearCookie("connect.sid");
      console.log("Logout successful");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.status(200).json({
      state: "success",
      user,
    });
  }
});

export default router;
