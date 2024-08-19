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