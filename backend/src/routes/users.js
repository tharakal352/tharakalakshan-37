import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
  
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();
    
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username or password is incorrect" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Username or password is incorrect" });
    }

    
    const token = jwt.sign({ id: user._id },  "secret");
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

export { router as userRouter };




