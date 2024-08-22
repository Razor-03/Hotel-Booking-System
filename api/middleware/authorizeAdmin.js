import User from "../models/user.schema.js";

const authorizeAdmin = async (req, res, next) => {
    try {
        // Assuming you have the user ID stored in req.userId (e.g., from JWT)
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default authorizeAdmin;