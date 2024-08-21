import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNo: { type: String, required: true, unique: true },
    roomType: { type: String, enum: ['Single', 'Double'], required: true },
    servantName: { type: String, required: true },
    servantContact: { type: String, required: true },
    floor: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    roomImage: { type: String },
    description: { type: String },
    availabilityStatus: { type: Boolean, default: true },
    history: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        arrivalDate: { type: Date },
        departureDate: { type: Date }
    }]
});

const Room = mongoose.model('Room', roomSchema);

export default Room;