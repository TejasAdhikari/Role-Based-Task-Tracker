import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


// Header component for the application, displaying the title and user information.
export const Header = () => {
    // useAuth hook to access authentication context.
    const { user, logout } = useAuth();
    // useNavigate hook to programmatically navigate.
    const navigate = useNavigate();

    // Handle logout action.
    const handleLogout = () => {
        // Logout the user.
        logout();
        // Navigate to the home page after logout.
        navigate('/');
    };

    return (
        <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
            {user && (
            <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                {user.name} ({user.role})
                </span>
                <button
                onClick={handleLogout}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                Logout
                </button>
            </div>
            )}
        </div>
        </header>
    );
};