import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    numPassengers: "",
  });

  const [passengers, setPassengers] = useState([]);
  const [passengerData, setPassengerData] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Search Button Click
  const handleSearch = (e) => {
    e.preventDefault();
    if (formData.numPassengers > 0) {
      setPassengers(Array.from({ length: Number(formData.numPassengers) }, () => ({})));
      setPassengerData(
        Array.from({ length: Number(formData.numPassengers) }, () => ({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        }))
      );
    }
  };

  // Handle Passenger Input Change
  const handlePassengerChange = (index, e) => {
    const newPassengers = [...passengerData];
    newPassengers[index][e.target.name] = e.target.value;
    setPassengerData(newPassengers);
  };

  // Handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/servers/passengers.php",
        { passengers: passengerData }
      );
      alert(response.data.message);
      setPassengers([]);
      setFormData({
        origin: "",
        destination: "",
        date: "",
        numPassengers: "",
      });
    } catch (error) {
      console.error("Error storing passengers:", error);
      alert("Failed to store passengers");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "50vh" }}>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", pb: 2 }}
        >
          Flight Search
        </Typography>

        <form
          onSubmit={handleSearch}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <TextField
            name="origin"
            placeholder="Enter Origin"
            fullWidth
            margin="normal"
            value={formData.origin}
            onChange={handleChange}
          />
          <TextField
            name="destination"
            placeholder="Destination"
            fullWidth
            margin="normal"
            value={formData.destination}
            onChange={handleChange}
          />
          <TextField
            name="date"
            placeholder="Date"
            type="date"
            fullWidth
            margin="normal"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="numPassengers"
            placeholder="No of Passengers"
            type="number"
            fullWidth
            margin="normal"
            value={formData.numPassengers}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              m: 1,
              fontWeight: "600",
              px: 5,
              width: 100,
            }}
          >
            Search
          </Button>
        </form>
      </Box>

      {passengers.length > 0 && (
        <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Enter Passenger Details</Typography>

            {passengers.map((_, index) => (
              <Box
                key={index}
                sx={{
                  mt: 3,
                  p: 2,
                  border: "1px solid gray",
                  borderRadius: 1,
                  display: "flex",
                  gap: 3,
                }}
              >
                <TextField
                  name="firstName"
                  placeholder="Firstname"
                  fullWidth
                  margin="normal"
                  variant="filled"
                  value={passengerData[index]?.firstName || ""}
                  onChange={(e) => handlePassengerChange(index, e)}
                />
                <TextField
                  name="lastName"
                  placeholder="Lastname"
                  fullWidth
                  margin="normal"
                  variant="filled"
                  value={passengerData[index]?.lastName || ""}
                  onChange={(e) => handlePassengerChange(index, e)}
                />
                <TextField
                  name="age"
                  placeholder="Age"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="filled"
                  value={passengerData[index]?.age || ""}
                  onChange={(e) => handlePassengerChange(index, e)}
                />
                <TextField
                  name="gender"
                  select
                  label="Gender"
                  fullWidth
                  margin="normal"
                  variant="filled"
                  value={passengerData[index]?.gender || ""}
                  onChange={(e) => handlePassengerChange(index, e)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Box>
            ))}

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 2, w: 100, borderRadius: "50px" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default FlightSearch;
