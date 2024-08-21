import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    bookingStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    bookingDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;