import express from "express";
import User from "../models/user.schema.js";
import { verifyToken } from "../middleware/verifyToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";
const router = express.Router();

router.get("/", verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;