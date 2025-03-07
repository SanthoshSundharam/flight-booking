import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import { Button, Box, Container } from "@mui/material";
import Image from "../assets/fly.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <Box sx={{mt:30}}>
          <FlightSearch />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center",my:3}}>
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
