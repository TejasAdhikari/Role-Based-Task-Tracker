import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';


// Create Express application object.
const app = express();
// Set the port for the server.
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cross origin resource sharing
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/tasks', taskRoutes); // Task management routes

// Start the server only if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app
export default app;