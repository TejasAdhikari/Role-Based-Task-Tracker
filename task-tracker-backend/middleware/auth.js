import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

// Secret key for JWT signing and verification
const SECRET_KEY = 'secret-key';

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('x-auth-token');
    
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token if provided
    // If the token is valid, it will decode the token and attach the user to the request object
    try {
        // Verify the token using the secret key
        const decoded = verify(token, SECRET_KEY);
        // Attach the user to the request object
        req.user = decoded;
        // Call the next middleware function in the stack
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

// Export the middleware function
export default authMiddleware;