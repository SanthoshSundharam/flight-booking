import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import { Button, Box, Container } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();


  return (
    <Container>
      <Box>
        <Header />
        <FlightSearch />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/users")}
        >
          Passengers List
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
