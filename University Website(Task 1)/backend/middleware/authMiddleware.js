import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    const accessToken = req.cookies.token;
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized, Please login' });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        try {
            const user = await User.findById(decoded.id).select('-password');// Find the user by id and exclude the password
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user = user;// Add the user to the request object
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: 'Unauthorized - Access token expired' });
            }
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized, Please login' });
    }
};

export const adminOnly = async (req, res, next) => {
    if (req.user?.role === 'admin') {
        next();
    }else{
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
};