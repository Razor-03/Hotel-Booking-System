import express from "express";
import Room from "../models/room.schema.js";
import User from "../models/user.schema.js";
import Booking from "../models/booking.schema.js";
import Review from "../models/review.schema.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";
import 'dotenv/config';
import { verifyToken } from "../middleware/verifyToken.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.get("/", verifyToken, authorizeAdmin, async (req, res) => {
  const { bookingStatus } = req.query;

  try {
    let bookings = null;
    if (bookingStatus) {
      bookings = await Booking.find({ bookingStatus });
    } else {
      bookings = await Booking.find();
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id/booking-status", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({ bookingStatus: booking.bookingStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/checkout", verifyToken, async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");
  if (booking.bookingStatus !== "Approved") {
    return res.status(400).json({ error: "Booking is not approved." });
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: booking.room.roomNo,
            description: booking.room.description,
          },
          unit_amount: Math.round(booking.totalAmount) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  res.status(200).json({ id: session.id });
});

router.get("/info", verifyToken, authorizeAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(
      (booking) => booking.bookingStatus === "Pending"
    ).length;
    const approvedBookings = bookings.filter(
      (booking) => booking.bookingStatus === "Approved"
    ).length;
    const rejectedBookings = bookings.filter(
      (booking) => booking.bookingStatus === "Rejected"
    ).length;
    res.status(200).json({
      totalBookings,
      pendingBookings,
      approvedBookings,
      rejectedBookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/revenue", verifyToken, authorizeAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find({ bookingStatus: "Approved" });
    const revenue = bookings.reduce(
      (total, booking) => total + booking.totalAmount,
      0
    );
    res.status(200).json({ revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/approve", verifyToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    const room = await Room.findById(booking.room);
    room.availabilityStatus = false;

    if (booking.status === "Approved") {
      return res.status(400).json({ error: "Booking is already approved." });
    }

    booking.bookingStatus = "Approved";

    await booking.save();

    res.status(200).json({
      message: "Booking approved successfully!",
      id: booking._id,
    });
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id/reject", verifyToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    if (booking.status === "Rejected") {
      return res.status(400).json({ error: "Booking is already rejected." });
    }

    booking.status = "Rejected";

    await booking.save();

    res.status(200).json({
      message: "Booking rejected successfully!",
      id: booking._id,
    });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
