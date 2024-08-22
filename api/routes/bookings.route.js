import express from "express";
import Room from "../models/room.schema.js";
import User from "../models/user.schema.js";
import Booking from "../models/booking.schema.js";
import Review from "../models/review.schema.js";
const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/revenue", async (req, res) => {
    try {
        const bookings = await Booking.find({ bookingStatus: "Approved" });
        const revenue = bookings.reduce((total, booking) => total + booking.totalAmount, 0);
        res.status(200).json({ revenue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found.' });
        }

        if (booking.status === 'Approved') {
            return res.status(400).json({ error: 'Booking is already approved.' });
        }

        booking.bookingStatus = 'Approved';

        await booking.save();

        res.status(200).json({
            message: 'Booking approved successfully!',
            id: booking._id
        });

    } catch (error) {
        console.error('Error approving booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found.' });
        }

        if (booking.status === 'Rejected') {
            return res.status(400).json({ error: 'Booking is already rejected.' });
        }

        booking.status = 'Rejected';

        await booking.save();

        res.status(200).json({
            message: 'Booking rejected successfully!',
            id: booking._id
        });

    } catch (error) {
        console.error('Error rejecting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;