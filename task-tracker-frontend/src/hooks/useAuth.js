import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


// It allows components to access the user state and authentication functions
export const useAuth = () => {
    // Use the AuthContext to get the current context value
     // This will give us access to the user, loading, login, and logout functions
     // The useContext hook allows us to subscribe to React context without introducing nesting
    const context = useContext(AuthContext);
    
    // If context is null, it means that the component is not wrapped in an AuthProvider
    // This is a safeguard to ensure that the useAuth hook is used within the AuthProvider
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    // Return the context value, which includes user, loading, login, and logout
    return context;
};