import { Router } from 'express';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;


// Create a router instance
const router = Router();

const SECRET_KEY = 'secret-key';
// Path to the users JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersPath = join(__dirname, '../data/users.json');

// Initialize users and the file if the file doesn't exist
if (!existsSync(usersPath)) {
  const initialUsers = [
    { id: '1', name: 'Tejas', role: 'submitter' },
    { id: '2', name: 'Chenwei', role: 'approver' }
  ];
  // Create the users file with initial data
  writeFileSync(usersPath, JSON.stringify(initialUsers, null, 2));
}

// Login route to authenticate users and generate a JWT
router.post('/login', (req, res) => {
    // Extract userId from the request body
    const { userId } = req.body;
    
    // Get the users from the JSON file (Not needed when using a DB)
    const users = JSON.parse(readFileSync(usersPath));
    // Find the user with the provided userId in the data from JSON File (DB in real implementation)
    const user = users.find(u => u.id === userId);
    
    // Check if the user exists
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate a JWT token for the user
    const token = sign(
        { id: user.id, name: user.name, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
    
    // Return the token and user information in the response
    res.json({ token, user });
});

// Route to get all users
router.get('/', (req, res) => {
    // Get the users from the JSON file (DB in real implementation)
    const users = JSON.parse(readFileSync(usersPath));
    // Return the users in the response
    res.json(users);
});

// Export the router
export default router;