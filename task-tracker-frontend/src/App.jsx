import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/auth/Login';
import { Dashboard } from './components/layout/Dashboard';

// Create a client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  // Use the custom hook to get user authentication status and loading state from the AuthContext.
  const { user, loading } = useAuth();
  
  // If loading, show a spinner.
  if (loading) return <div>Loading...</div>;
  
  // If user is not authenticated, redirect to the login page.
  // The `replace` prop ensures that the login page is not added to the history stack.
  // This means that if the user clicks the back button, they won't go back to the children route.
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // If the user is authenticated, render the children components.
  return children;
};

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;