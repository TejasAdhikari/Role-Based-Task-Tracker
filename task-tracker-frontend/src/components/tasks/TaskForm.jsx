import React, { useState } from 'react';


// This component is used to create or edit a task.
export const TaskForm = ({ task, onSubmit, onCancel }) => {
    // State variables to manage the form inputs
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    // Function to handle form submission
    // It prevents the default form submission behavior and calls the onSubmit prop with the task data
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
    };

    // Render the form with input fields for title and description
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Title
                </label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                />
            </div>
            <div className="mb-6">
                <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Description (optional)
                </label>
                <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                {task ? 'Update' : 'Create'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};