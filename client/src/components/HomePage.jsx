import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import { Button, Box, Container } from "@mui/material";
import Image from "../assets/fly.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Ensures background always fills screen
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <Box>

          <FlightSearch />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center",mt:3}}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/users")}
          >
            Passengers List
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
