import express from "express";
import User from "../models/user.schema.js";
import Booking from "../models/booking.schema.js";
import Contact from "../models/contact.schema.js";
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

router.get("/bookings", verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate("room", "roomNo availabilityStatus");
        res.status(200).json(bookings);
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

router.post("/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
  
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
  
      res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error while submitting contact form:", error.message);
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  });

export default router;