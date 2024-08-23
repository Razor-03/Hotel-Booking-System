import express from "express";
import Employee from "../models/employee.schema.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/', verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const { name, image, cnic, contact, email, salary } = req.body;

        const newEmployee = new Employee({
            name,
            image,
            cnic,
            contact,
            email,
            salary
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const { name, image, cnic, contact, email, salary } = req.body;

        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        employee.name = name || employee.name;
        employee.image = image || employee.image;
        employee.cnic = cnic || employee.cnic;
        employee.contact = contact || employee.contact;
        employee.email = email || employee.email;
        employee.salary = salary || employee.salary;

        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, authorizeAdmin, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await Employee.deleteOne(employee)
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;