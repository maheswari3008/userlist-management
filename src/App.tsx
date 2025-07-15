import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login.js";
import TaskDashboard from "./components/UserLandingPage.js";
import Navbar from "./components/navbar/Navbar.js";
import type { DashboardLayoutProps } from "./components/types.js";

// Layout for pages with Navbar
const DashboardLayout = ({
  children,
  setIsAuthenticated,
}: DashboardLayoutProps) => (
  <div className="overflow-hidden">
    <Navbar setIsAuthenticated={setIsAuthenticated} />
    <div className="flex-1 bg-gray-100 h-[94vh] overflow-y-scroll">
      <div className="container mx-auto">{children}</div>
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Sync auth state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Private Routes with Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
                <TaskDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}
