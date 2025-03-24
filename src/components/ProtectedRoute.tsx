import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up back button listener for authenticated users
    const handleBackButton = (e: PopStateEvent) => {
      if (user && location.pathname === "/chat") {
        // Prevent default back behavior
        e.preventDefault();
        // Navigate to our custom back navigation page
        navigate("/back-navigation");
      }
    };

    // Listen for popstate (back button) events
    window.addEventListener("popstate", handleBackButton);

    // Clean up the event listener
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [user, location.pathname, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user && location.pathname !== "/back-navigation") {
    return <Navigate to="/login" replace />;
  }

  // If authenticated and trying to access login page, redirect to chat
  if (user && location.pathname === "/login") {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
};
