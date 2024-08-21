import express from "express";
import Room from "../models/room.schema.js";
import User from "../models/user.schema.js";
import Booking from "../models/booking.schema.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const { roomType, floor, minPrice, maxPrice, availabilityStatus } = req.query;

    let query = {};

    if (minPrice) {
        query.pricePerNight = { ...query.price, $gte: parseInt(minPrice) };
    }

    if (maxPrice) {
        query.pricePerNight = { ...query.price, $lte: parseInt(maxPrice) };
    }

    if (roomType) {
        query.roomType = roomType;
    }

    if (floor) {
        query.floor = parseInt(floor);
    }

    if (availabilityStatus) {
        query.availabilityStatus = availabilityStatus === "true";
    }

    try {
        const rooms = await Room.find(query);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate("history.user");
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json({message: "Room created successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/book-room', async (req, res) => {
    try {
        const { name, email, contact, roomNo, arrivalDate, departureDate, numberOfAdults, numberOfChildren } = req.body;

        const room = await Room.findOne({ roomNo, availabilityStatus: true });
        if (!room) {
            return res.status(400).json({ error: 'Room not available or does not exist.' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                contact,
                arrivalDate,
                departureDate,
                numberOfAdults,
                numberOfChildren
            });
            await user.save();
        }

        room.history.push({
            user: user._id,
            arrivalDate,
            departureDate
        });
        room.availabilityStatus = false;

        await room.save();

        const booking = new Booking({
            user: user._id,
            room: room._id,
            arrivalDate,
            departureDate,
            numberOfAdults,
            numberOfChildren,
            status: 'Pending', // Assuming booking needs to be approved
            bookingDate: new Date() // Set the current date as the booking date
        });

        await booking.save();

        // Send a response back to the client
        res.status(201).json({
            message: 'Room booked successfully!',
            bookingId: booking._id,
            userId: user._id,
            roomId: room._id
        });

    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await Room.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({message: "Room updated successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Room deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;