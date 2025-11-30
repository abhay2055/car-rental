import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Token delete
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  }, []);

  return null; // No UI needed
}
