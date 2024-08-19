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
        const rooms = await Room.find().populate("history.user");
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

export default router;