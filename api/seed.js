import mongoose from 'mongoose';
import Review from './models/review.schema.js';
import User from './models/user.schema.js';
import Room from './models/room.schema.js';
import "dotenv/config";

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

async function seedUser() {
    try {
        const user = new User({
            username: "Razor",
            email: "razor@gmail.com",
            password: "razor",
            contact: "1234567890",
            arrivalDate: new Date(),
            departureDate: new Date() + 1,
            numberOfAdults: 2,
            numberOfChildren: 0,
        });

        const savedUser = await user.save();
        console.log('Review saved:', savedUser);
    } catch (error) {
        console.error('Error saving review:', error);
    }
}

async function seedReview() {
    try {
        // Assuming you have a user and a room already in your database
        const user = await User.findOne({
            username: 'Razor'
        }); // Find an existing user
        const room = await Room.findOne({
            roomNo: '101'
        });

        if (!user || !room) {
            console.log('Please ensure there is at least one user and one room in the database.');
            return;
        }

        const review = new Review({
            user: user._id, // Reference to the user
            room: room._id, // Reference to the room
            rating: 5, // Rating out of 5
            comment: 'The room was amazing, very clean and the service was top-notch. Highly recommended!',
        });

        const savedReview = await review.save();
        console.log('Review saved:', savedReview);
    } catch (error) {
        console.error('Error saving review:', error);
    }
}

seedReview();
