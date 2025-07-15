import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { LoginProps } from "../types";

export default function Navbar({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update state to trigger re-render
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="bg-[#fff] w-full z-10 shadow-md">
      <div className="container mx-auto px-4 sm:px-0 lg:px-2 py-3 flex justify-between items-center">
        <h1 className="md:text-xl font-semibold text-black">
          Userlist Management
        </h1>
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </div>
    </div>
  );
}
