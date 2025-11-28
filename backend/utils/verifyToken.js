import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next, successCallback) => {
    
    // 1. Get token from Cookies OR Headers
    let token = req.cookies.token;

    // If no cookie token, check headers
    if (!token && req.headers.authorization) {
        // Headers usually come as "Bearer <token>", so we split it
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    console.log("token : " , token)

    // 2. If still no token found
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized (No Token)"
        });
    }

    // 3. Verify Token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        req.user = user;

        // 4. Logic Flow Control
        // If a specific check (callback) is provided (like in verifyUser), run it.
        // Otherwise, just proceed to next()
        if (successCallback) {

            successCallback();
            
        } else {
            next();
        }
    });
};

export const verifyUser = (req, res, next) => {
    // We pass a callback function as the 4th argument
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {

            next();

        } else {
            return res.status(403).json({ // 403 is better for "Forbidden"
                success: false,
                message: "You are not authenticated"
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "You are not authorized"
            });
        }
    });
};