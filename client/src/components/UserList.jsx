import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [passengers, setPassengers] = useState({});
  const [editPassenger, setEditPassenger] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      Swal.fire("Error", "User email is missing.", "error");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/servers/get_passengers.php?email=${email}`);
      if (response.data.success && response.data.passengers) {
        setPassengers(response.data.passengers);
      } else {
        setPassengers({});
        Swal.fire("No Data", "No passengers found.", "info");
      }
    } catch (error) {
      console.error("Error fetching passengers:", error);
      Swal.fire("Error", "Failed to fetch passengers", "error");
    }
  };

  const handleEdit = (passenger) => {
    setEditPassenger(passenger);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "http://localhost:8000/servers/update_passenger.php",
        editPassenger,
        { headers: { "Content-Type": "application/json" } }
      );
      setEditPassenger(null);
      fetchPassengers();
      Swal.fire("Success", "Passenger details updated successfully!", "success");
    } catch (error) {
      console.error("Error updating passenger:", error);
      Swal.fire("Error", "Failed to update passenger details.", "error");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the entire booking and all passengers under it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("http://localhost:8000/servers/delete_passenger.php", { booking_id: bookingId });
          fetchPassengers();
          Swal.fire("Deleted!", "Booking has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting booking:", error);
          Swal.fire("Error", "Failed to delete booking.", "error");
        }
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Passenger List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/home")}>
          Back
        </Button>
      </Box>

      <TableContainer  component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ maxWidth: 1700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2e2b2be1",  }}>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center",color:"white" }}>Passenger</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center",color:"white" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center",color:"white" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center",color:"white" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color:"white" }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color:"white" }}>Origin</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color:"white" }}>Destination</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color:"white" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color:"white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(passengers).length > 0 ? (
              Object.entries(passengers).map(([bookingId, passengerGroup]) => (
                <React.Fragment key={bookingId}>
                  <TableRow>
                    <TableCell colSpan={9} sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold", textAlign: "center" }}>
                      Booking ID: {bookingId.substring(0,5)+bookingId.substring(9,13)}
                    </TableCell>
                  </TableRow>
                  {passengerGroup.map((passenger, index) => (
                    <TableRow key={passenger.id}>
                      <TableCell sx={{ textAlign: "center" }}>Passenger {index + 1}</TableCell>
                      {editPassenger?.id === passenger.id ? (
                        <>
                          <TableCell><TextField size="small"  sx={{width:"120px"}} value={editPassenger.first_name} onChange={(e) => setEditPassenger({ ...editPassenger, first_name: e.target.value })} /></TableCell>
                          <TableCell><TextField size="small" sx={{width:"120px"}} value={editPassenger.last_name} onChange={(e) => setEditPassenger({ ...editPassenger, last_name: e.target.value })} /></TableCell>
                          <TableCell><TextField size="small" sx={{width:"80px"}} value={editPassenger.age} onChange={(e) => setEditPassenger({ ...editPassenger, age: e.target.value })} /></TableCell>
                          <TableCell>
                            <TextField
                              select
                              SelectProps={{ native: true }}
                              size="small"
                              value={editPassenger.gender}
                              onChange={(e) => setEditPassenger({ ...editPassenger, gender: e.target.value })}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </TextField>
                          </TableCell>
                          <TableCell><TextField size="small" sx={{width:"120px"}} value={editPassenger.origin} onChange={(e) => setEditPassenger({ ...editPassenger, origin: e.target.value })} /></TableCell>
                          <TableCell><TextField size="small" sx={{width:"120px"}} value={editPassenger.destination} onChange={(e) => setEditPassenger({ ...editPassenger, destination: e.target.value })} /></TableCell>
                          <TableCell><TextField size="small" type="date" sx={{width:"80px"}} value={editPassenger.travel_date} onChange={(e) => setEditPassenger({ ...editPassenger, travel_date: e.target.value })} /></TableCell>
                          {/* <TableCell>{passenger.origin}</TableCell>
                          <TableCell>{passenger.destination}</TableCell>
                          <TableCell>{passenger.travel_date}</TableCell> */}
                          <TableCell >
                            <Button style={{gap:"10px"}} onClick={handleUpdate} color="success" variant="contained" size="small">Save</Button>
                            <Button onClick={() => setEditPassenger(null)} color="secondary" size="small">Cancel</Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.first_name}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.last_name}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.age}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.gender}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.origin}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.destination}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{passenger.travel_date}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button onClick={() => handleEdit(passenger)} color="primary" variant="contained">Edit</Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                  {/* Delete Button for the entire Booking */}
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: "right", padding: "10px" }}>
                      <Button onClick={() => handleDeleteBooking(bookingId)} color="error" variant="contained">
                        Delete Booking
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">No passengers found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
