import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    numPassengers: "",
  });

  const [passengerData, setPassengerData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const numPassengers = parseInt(formData.numPassengers, 10);
    if (numPassengers > 0) {
      setPassengerData(
        Array.from({ length: numPassengers }, (_, index) => ({
          passengerNumber: index + 1,
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        }))
      );
    }
  };

 
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setPassengerData((prev) => {
      const updatedPassengers = [...prev];
      updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
      return updatedPassengers;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/servers/passengers.php", {
        email: userEmail, // Send email instead of user_id
        origin: formData.origin,
        destination: formData.destination,
        date: formData.date,
        passengers: passengerData,
      });

      // SweetAlert for success
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        confirmButtonColor: "#3085d6",
      });

      setFormData({ origin: "", destination: "", date: "", numPassengers: "" });
      setPassengerData([]);
    } catch (error) {
      console.error("Error storing passengers:", error);

      // SweetAlert for error
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while storing passenger details.",
        confirmButtonColor: "#d33",
      });
    }
  };


  const handleCancel=()=>{
    setPassengerData([]);
   }

  return (
    <Container maxWidth>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "whitesmoke" }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center", pb: 2 }}>
          Search Flight
        </Typography>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <TextField name="origin" placeholder="Enter Origin" fullWidth margin="normal" required value={formData.origin} onChange={handleChange} />
          <TextField name="destination" placeholder="Destination" fullWidth margin="normal" required value={formData.destination} onChange={handleChange} />
          <TextField name="date" placeholder="Date" type="date" fullWidth margin="normal" required value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField name="numPassengers" placeholder="No of Passengers" type="number" required fullWidth margin="normal" value={formData.numPassengers} onChange={handleChange} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ m: 1, fontWeight: "600", px: 5, width: 100 }}>
            Search
          </Button>
        </form>
      </Box>

      {passengerData.length > 0 && (
        <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Enter Passenger Details</Typography>

            <TableContainer maxWidth component={Paper} sx={{ mt: 3,width: "100%", maxWidth: "1400" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Passenger No.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                    <TableCell sx={{ fontWeight: "bold", width: 160 }}>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {passengerData.map((passenger, index) => (
                    <TableRow key={index+1}>
                      <TableCell sx={{ fontWeight: "bold" }}>Passenger {passenger.passengerNumber}</TableCell>
                      <TableCell>
                        <TextField
                          name="firstName"
                          placeholder="Firstname"
                          fullWidth
                          variant="filled"
                          required
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="lastName"
                          placeholder="Lastname"
                          fullWidth
                          variant="filled"
                          required
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="age"
                          placeholder="Age"
                          type="number"
                          fullWidth
                          variant="filled"
                          required
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="gender"
                          select
                          label="Gender"
                          fullWidth
                          variant="filled"
                          required
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, e)}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: 150, borderRadius: "5px" }}>
              Submit
            </Button>
            <Button type="cancel" variant="contained" color="error" sx={{ mt: 2, width: 150, borderRadius: "5px" }} onClick={handleCancel}>
              Cancel
            </Button>
            </Box>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default FlightSearch;
