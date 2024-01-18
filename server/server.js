import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import globalError from "./Controllers/ErrorController.js";
import session from "express-session";
import passport from "passport";
import userRouter from "./Routes/UserRouter.js";
import authRouter from "./Routes/AuthRouter.js";

/*MIDDLEWARE*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://client-social-login.onrender.com",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: true, // Set to true if using HTTPS
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    },
    // cookie: {
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*PASSPORT STRATEGY*/
import("./PassportSocial/passport.js");

/*ROUTES*/
app.use("/api", userRouter);
app.use("/auth", authRouter);

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://client-social-login.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/*ERROR */
app.all("*", (req, res, next) => {
  const err = new Error(`Not Found ${req.originalUrl} on this server`);
  err.statusCode = 404;
  next(err);
});
app.use(globalError);

/*CONNECTING DB MONGOO */
const db = process.env.BASE_URL.replace("<password>", process.env.PASSWORD_URL);
try {
  await mongoose.connect(db);
  console.log("Connected to Mongoose database");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("listening on port " + port);
});
