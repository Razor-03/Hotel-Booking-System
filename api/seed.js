import mongoose from "mongoose";
import 'dotenv/config';
import Room from "./models/room.schema.js";

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

const newRoom = new Room({
    roomNo: '101',
    roomType: 'Single',
    floor: 1,
    pricePerNight: 64,
    roomImage: 'room101.jpg',
    description: 'This is a single room',
    availabilityStatus: true
});

newRoom.save()
.then((room) => {
    console.log('Room created:', room);
})
.catch((error) => {
    console.error('Error creating room:', error);
});