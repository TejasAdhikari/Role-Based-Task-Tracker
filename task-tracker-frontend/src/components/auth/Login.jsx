import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as authService from '../../services/authService';


// This component handles user login by allowing the selection of a user from a list.
export const Login = () => {
    // State variables to manage users and selected user.
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    // useAuth hook to access authentication context.
    const { login, user } = useAuth();
    // useNavigate hook to programmatically navigate.
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in.
        if (user) {
            navigate('/dashboard');
        }

        // Fetch users.
        const fetchUsers = async () => {
            try {
                // Fetch users from the authService.
                const data = await authService.getUsers();
                // Set the users state with the fetched data.
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [user, navigate]); // Dependency array includes user and navigate to re-run effect on changes.

    // Handle login when the form is submitted.
    const handleLogin = async (e) => {
        // Prevent default form submission behavior.
        e.preventDefault(); 
        // Check if a user is selected.
        if (!selectedUser) return;

        // Try to login with the selected user.
        try {
            // Attempt to login with the selected user.
            await login(selectedUser);
            // If successful, navigate to the dashboard.
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Task Tracker Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Select a user to login
            </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
                <label htmlFor="user-select" className="sr-only">
                Select User
                </label>
                <select
                id="user-select"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                >
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                    </option>
                ))}
                </select>
            </div>

            <div>
                <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!selectedUser}
                >
                Login
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};