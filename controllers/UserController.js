const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
require("dotenv").config();

const RegisterUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (user) {
      return res
        .status(500)
        .json({ success: false, error: "User already exist" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hash });
    await newUser.save();
    res.status(200).json({ success: true, response: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const LoginUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        { id: user._id, name },
        process.env.ACCESS_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_KEY, {
        expiresIn: "5d",
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      res.json({ name, id: user._id, accessToken });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Erreur de connexion" });
    }
  } else {
    return res
      .status(500)
      .json({ success: false, error: "Erreur de connexion" });
  }
};

const ProviderAuth = async (req, res) => {
  const { content } = req.body;
  const name = content.user.displayName;
  const password = content.user.email + content.user.uid;
  const user = await User.findOne({ name });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        { id: user._id, name },
        process.env.ACCESS_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_KEY, {
        expiresIn: "5d",
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      res.json({ name, id: user._id, accessToken });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Erreur de connexion" });
    }
  } else {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hash });
    await newUser.save();
    const loginUser = await User.findOne({ name });
    const match = await bcrypt.compare(password, loginUser.password);
    if (match) {
      const accessToken = jwt.sign(
        { id: loginUser._id, name },
        process.env.ACCESS_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { id: loginUser._id },
        process.env.REFRESH_KEY,
        { expiresIn: "5d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      res.json({ name, id: loginUser._id, accessToken });
    }
  }
};

const RefreshUser = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(401).json({ error: "Unauthorized" });
  const refreshToken = cookie.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_KEY,
    async function (err, deccoded) {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await User.findOne({ _id: deccoded.id });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.ACCESS_KEY,
        { expiresIn: "1h" }
      );
      res.json({ name: foundUser.name, id: foundUser._id, accessToken });
    }
  );
};

const Logout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(204).end();
};

module.exports = {
  RegisterUser,
  LoginUser,
  RefreshUser,
  Logout,
  ProviderAuth,
};
