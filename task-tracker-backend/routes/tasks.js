import { Router } from 'express';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import auth from '../middleware/auth.js';


// Create a router instance
const router = Router();

// Path to the tasks JSON file (Replaced by DB functions in real implementation)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tasksPath = join(__dirname, '../data/tasks.json');

// Initialize tasks file if it doesn't exist
if (!existsSync(tasksPath)) {
    writeFileSync(tasksPath, JSON.stringify([], null, 2));
}

// Get all tasks (filtered by role)
router.get('/', auth, (req, res) => {
    // Get the tasks from the JSON file (DB in real implementation)
    const tasks = JSON.parse(readFileSync(tasksPath));

    // Filter tasks based on user role
    let filteredTasks;
    // For submitters, return only the tasks created by the submitter(user)
    if (req.user.role === 'submitter') {
        filteredTasks = tasks.filter(task => task.createdBy === req.user.id);
    }
    // For approvers, return all tasks 
    else {
        filteredTasks = tasks;
    }

    // Return the filtered tasks in the response
    res.json(filteredTasks);
});

// Create new task
router.post('/', auth, (req, res) => {
    // Check if the user is a submitter
    if (req.user.role !== 'submitter') {
        return res.status(403).json({ message: 'Only submitters can create tasks' });
    }

    // Get the task details from the request body
    const { title, description } = req.body;
    
    // Check if title is provided
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    // Get the tasks from the JSON file to add the new task to it (DB funtctions in actual implementation)
    const tasks = JSON.parse(readFileSync(tasksPath));
    
    // Create a new task object
    const newTask = {
        id: uuidv4(), // Unique ID for the task
        title,
        description: description || '',
        status: 'pending', // Default status
        createdAt: new Date().toISOString(), // Current date and time
        createdBy: req.user.id 
    };
    
    // Append the new task to the tasks array and write it to the file
    tasks.push(newTask);
    writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    
    // Return the new task in the response
    res.status(201).json(newTask);
});

// Update task
router.put('/:id', auth, (req, res) => {
    // Get the task ID from the request parameters.
    const { id } = req.params;
    // Get the updated task details from the request body.
    const { title, description, status } = req.body;
    
    // Get the tasks from the JSON file (DB functions in actual implementation)
    const tasks = JSON.parse(readFileSync(tasksPath));
    // Find the task with the provided Task ID in the tasks array.
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    // Check if the task exists.
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    // Get the task object from the tasks array.
    const task = tasks[taskIndex];
    
    // RBAC: Check permissions
    if (req.user.role === 'submitter') {
        // Submitters can only edit their own pending tasks
        if (task.createdBy !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own tasks' });
        }
        if (task.status !== 'pending') {
            return res.status(403).json({ message: 'You can only edit pending tasks' });
        }
        
        // Submitters cannot change status
        if (status && status !== 'pending') {
            return res.status(403).json({ message: 'Submitters cannot change task status' });
        }
    }
    // Approvers can only change status of tasks.
    else if (req.user.role === 'approver') {
        // Approvers can only change status
        if (title !== undefined || description !== undefined) {
            return res.status(403).json({ message: 'Approvers can only change task status' });
        }
        
        // Validate status transitions
        if (status) {
            if (task.status === 'pending' && !['approved', 'rejected'].includes(status)) {
                return res.status(400).json({ message: 'Pending tasks can only be approved or rejected' });
            }
            
            if (task.status === 'approved' && status !== 'done') {
                return res.status(400).json({ message: 'Approved tasks can only be marked as done' });
            }
        }
    }
    
    // Update task
    tasks[taskIndex] = {
        ...task,
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        status: status || task.status
    };
    
    // Write the updated tasks array to the JSON file (DB functions in actual implementation)
    writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    
    // Return the updated task in the response
    res.json(tasks[taskIndex]);
});

// Delete task
router.delete('/:id', auth, (req, res) => {
    // Get the task ID from the request parameters.
    const { id } = req.params;
    
    // Get the tasks from the JSON file (DB functions in actual implementation)
    const tasks = JSON.parse(readFileSync(tasksPath));
    // Find the task with the provided Task ID in the tasks array.
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    // Check if the task exists.
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    // Get the task object from the tasks array.
    const task = tasks[taskIndex];
    
    // RBAC: Check Permissions
    if (req.user.role === 'submitter') {
        // Submitters can only delete their own pending tasks
        if (task.createdBy !== req.user.id) {
        return res.status(403).json({ message: 'You can only delete your own tasks' });
        }
        if (task.status !== 'pending') {
        return res.status(403).json({ message: 'You can only delete pending tasks' });
        }
    } 
    // Approvers cannot delete tasks
    else if (req.user.role === 'approver') {
        return res.status(403).json({ message: 'Approvers cannot delete tasks' });
    }
    
    // Delete task
    tasks.splice(taskIndex, 1);
    // Write the updated tasks array to the JSON file (DB functions in actual implementation)
    writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    
    // Return success message in the response
    res.json({ message: 'Task deleted' });
});

// Export the router
export default router;