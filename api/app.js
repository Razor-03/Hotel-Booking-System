import express from "express";
import 'dotenv/config';
const app = express();

import cookieParser from "cookie-parser";
import methodOverride from 'method-override';
import cors from 'cors';
import mongoose from 'mongoose';

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

import roomRoutes from './routes/rooms.route.js';
import userRoutes from './routes/users.route.js';
import bookingRoutes from './routes/bookings.route.js';

app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).json({ err });
});

app.listen(3000, (req, res) => {
    console.log('Server running on port 3000');
});