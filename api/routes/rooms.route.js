import express from "express";
import Room from "../models/room.schema.js";
import User from "../models/user.schema.js";
import Booking from "../models/booking.schema.js";
import Review from "../models/review.schema.js";
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

router.get("/info", async (req, res) => {
    try {
        const rooms = await Room.find();
        const totalRooms = rooms.length;
        const availableRooms = rooms.filter(room => room.availabilityStatus).length;
        const bookedRooms = totalRooms - availableRooms;
        res.status(200).json({ totalRooms, availableRooms, bookedRooms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name email')
            .populate('room', 'roomNo roomType');
        res.status(200).json(reviews);
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

router.post('/:id/book', async (req, res) => {
    const { id } = req.params;
    try {
        const { arrivalDate, departureDate, numberOfAdults, numberOfChildren } = req.body;

        const room = await Room.findById(id);
        if (!room) {
            return res.status(400).json({ error: 'Room not available or does not exist.' });
        } else if (!room.availabilityStatus) {
            return res.status(400).json({ error: 'Room is not available for booking.' });
        }

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
            bookingStatus: 'Pending',
            bookingDate: new Date(),
            totalAmount: room.pricePerNight * numberOfAdults + room.pricePerNight * 0.5 * numberOfChildren,
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
        const { id } = req.params;
        const {
            roomNo,
            roomType,
            floor,
            pricePerNight,
            roomImage,
            description,
            availabilityStatus,
            servantName,
            servantContact
        } = req.body;

        // Find the room by ID
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Update room details
        room.roomNo = roomNo || room.roomNo;
        room.roomType = roomType || room.roomType;
        room.floor = floor || room.floor;
        room.pricePerNight = pricePerNight || room.pricePerNight;
        room.roomImage = roomImage || room.roomImage;
        room.description = description || room.description;
        room.availabilityStatus = availabilityStatus !== undefined ? availabilityStatus : room.availabilityStatus;
        room.servantName = servantName || room.servantName;
        room.servantContact = servantContact || room.servantContact;

        await room.save();

        res.status(200).json({ message: 'Room updated successfully', room });
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

router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    try {
        const { username, rating, comment } = req.body;

        const user = await User.findOne({ username });
        console.log(id, user._id);

        const booking = await Booking.findOne({ user: user._id, room: id, bookingStatus: 'Approved' });
        
        if (!booking) {
            return res.status(400).json({ error: 'You can only review rooms that you have booked.' });
        }

        const existingReview = await Review.findOne({ user: user._id, room: id });
        if (existingReview) {
            return res.status(400).json({ error: 'You have already reviewed this room.' });
        }

        const review = new Review({
            user: user._id,
            room: id,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({
            message: 'Review submitted successfully!',
            reviewId: review._id
        });

    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;