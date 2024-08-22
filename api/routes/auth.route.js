import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, contact, password, role = "user" } = req.body;
    const hashed = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashed,
      role,
      email,
      contact,
    });

    await newUser.save();

    if (newUser) {
      res.cookie("token", jwt.sign({ id: newUser.id }, process.env.JWT_SECRET), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const { password: pwd, ...userInfo } = user;

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        res.cookie("token", jwt.sign({ id: user.id }, process.env.JWT_SECRET), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expiresIn: 1000 * 60 * 60 * 24 * 7,
        });
        return res.status(200).json(userInfo);
      }
    }
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logged out successfully"});
}