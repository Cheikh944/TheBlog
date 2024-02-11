const usersRoutes = require("./routes/UsersRoutes");
const ProfilRoutes = require("./routes/ProfilRoutes");
const BlogRoutes = require("./routes/BlogRoutes");
const verify = require("./middleware/verifyJWT");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
var cors = require("cors");
var app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "https://cheikh-portfolio94.netlify.app",
  "https://theblogc.netlify.app",
];

app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(express.json());
app.use(cookieParser());

app.use("/Image", express.static(__dirname + "/Image"));
app.use("/auth", usersRoutes);
app.use("/profil", ProfilRoutes);
app.use("/blogs", BlogRoutes);

const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connecté à MongoDB avec Mongoose");
});

app.get("/secret", verify, (req, res) => {
  res.send("Protected route");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
