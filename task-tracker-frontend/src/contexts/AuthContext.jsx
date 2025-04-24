import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    // Create state variables for user and loading
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token on load
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        // If token is found, set user state
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        
        // Stop loading
        setLoading(false);
    }, []); // This effect runs once on component mount (when component is first rendered)

    // Function to login user
    const login = async (userId) => {
        try {
            // Call the login service to authenticate user
            const { token, user } = await authService.login(userId);
            
            // Save token and user to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Set user state
            setUser(user);
            return user;
        } catch (error) {
            console.error('Login error: ', error);
            throw error;
        }
    };

    // Function to logout user
    const logout = () => {
        // Remove token and user from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Set user state to null
        setUser(null);
    };

    // Create a value object to pass to the provider as context
    const value = {
        user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};