import { useAuth } from '../../hooks/useAuth';


// Checks if the user has the required role to access certain parts of the application.
export const RoleGate = ({ role, allowed, children }) => {
    // The role prop is a string that represents the required role for access.
    const { user } = useAuth();
  
    // Check if the user is logged in and has the required role.
    if (!user || !allowed.includes(user.role)) {
        return null;
    }
    
    // If the user has the required role, render the children components.
    return children;
};