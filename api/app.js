import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import methodOverride from 'method-override';
import cors from 'cors';

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());

import roomRoutes from './routes/rooms.route.js';

app.use("/api/rooms", roomRoutes);


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