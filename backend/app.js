const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./src/utils/googleLoginAuth");

const indexingRoutes = require("./src/routes/indexing.routes");
const contentRoutes = require("./src/routes/content.routes");
const authRoutes = require("./src/routes/auth.routes");
const { errorHandler } = require("./src/middlewares/error.middleware");

const app = express();

const isProd = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://frontend-production-4e2f.up.railway.app",
    "https://lgts.socialstech.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(express.json());

app.use(
  session({
    name: "lgts.sid",
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    proxy: isProd,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/indexing", indexingRoutes);
app.use("/api/content", contentRoutes);

app.use(errorHandler);

module.exports = app;
