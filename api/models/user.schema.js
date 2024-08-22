import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    numberOfChildren: { type: Number, default: 0 },
    numberOfAdults: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;