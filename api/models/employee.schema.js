import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    cnic: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salary: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;