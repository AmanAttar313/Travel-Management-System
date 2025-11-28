import jwt from 'jsonwebtoken';

// 1. Base Middleware: Check if Token is Valid
export const authcheck = (req, res, next) => {
    
    // Check Cookies first, then Header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorized" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        // Attach user info to request and move to the next step
        req.user = user;
        next(); 
    });
};