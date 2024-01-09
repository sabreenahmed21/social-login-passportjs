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
    const redirectURL =
      process.env.NODE_ENV === "production"
        ? "https://client-social-login.onrender.com"
        : "http://localhost:3000";
    res.redirect(redirectURL);
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
    const redirectURL =
      process.env.NODE_ENV === "production"
        ? "https://client-social-login.onrender.com"
        : "http://localhost:3000";
    res.redirect(redirectURL);
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

// router.get("/user", (req, res) => {
//   if (req.isAuthenticated()) {
//     const user = req.user;
//     res.status(200).json({
//       state: "success",
//       user,
//     });
//   }
// });

router.get("/user", async (req, res) => {
  try {
      const user = req.user;
      console.log(user);
      res.status(200).json({
        state: "success",
        user,
        user: user,
      });
  } catch (error) {
    console.error("Error in /user route:", error);
    res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
});


export default router;
