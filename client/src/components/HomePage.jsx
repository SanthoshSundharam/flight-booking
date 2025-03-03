import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import { Button, Box } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // No token, redirect to login
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);

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
          navigate("/");
        });

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  const handleNavigateToUserList = () => {
    navigate("/users");
  };

  return (
    <>
      <Header />
      <FlightSearch />
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleNavigateToUserList}>
          Passengers List
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
