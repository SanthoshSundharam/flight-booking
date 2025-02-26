import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

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
        .get("http://localhost:5000/servers/protected.php", {
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4">Welcome {user?.email}</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
