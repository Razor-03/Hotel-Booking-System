import express from "express";
import Room from "../models/room.schema.js";
import User from "../models/user.schema.js";
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
    const { username, email, contact, arrivalDate, departureDate, roomNo, numberOfAdults, numberOfChildren } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username,
                email,
                contact,
                arrivalDate,
                departureDate,
                numberOfAdults,
                numberOfChildren
            });

            await user.save();
        }

        // 2. Find the room by room number
        let room = await Room.findOne({ roomNo });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (!room.availabilityStatus) {
            return res.status(400).json({ message: 'Room is already booked' });
        }

        // 3. Update the room's history and set availability to false
        room.history.push({
            user: user._id,
            arrivalDate: new Date(arrivalDate),
            departureDate: new Date(departureDate),
        });

        room.availabilityStatus = false;

        await room.save();

        res.status(200).json({ message: 'Room booked successfully', room });

    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).json({ message: 'Internal server error' });
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