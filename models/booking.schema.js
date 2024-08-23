import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    bookingStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    checkedOut: {type: Boolean, default: false},
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    numberOfChildren: { type: Number, default: 0 },
    numberOfAdults: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;