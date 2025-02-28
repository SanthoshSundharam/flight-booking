import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Header from "./Header";
import FlightSearch from "./FlightSearch";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // No token, redirect to login
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode token to get user info
      setUser(decoded);

      // Verify token with backend
      axios
        .get("http://localhost:8000/servers/protected.php", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (!response.data.success) {
            throw new Error("Invalid token");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Header/>
      <FlightSearch/>
    </>
  );
};

export default HomePage;
