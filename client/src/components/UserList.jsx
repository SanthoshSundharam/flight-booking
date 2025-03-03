import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import axios from "axios";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserList = ({ refreshTrigger }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  const [passengers, setPassengers] = useState([]);
  const [editPassenger, setEditPassenger] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPassengers();
  }, [refreshTrigger]);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/servers/get_passengers.php"
      );
      console.log("API Response:", response.data);

      if (response.data.success && response.data.data) {
        setPassengers(response.data.data);
      } else {
        setPassengers([]);
      }
    } catch (error) {
      console.error("Error fetching passengers:", error);
      setError("Failed to fetch passengers");
      setPassengers([]);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (passenger) => {
    setEditPassenger(passenger);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "http://localhost:8000/servers/update_passenger.php",
        editPassenger,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setEditPassenger(null);
      fetchPassengers();
    } catch (error) {
      console.error("Error updating passenger:", error);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this passenger?")) {
      try {
        const response = await axios.post(
          "http://localhost:8000/servers/delete_passenger.php",
          {
            action: "delete",
            id: id,
          }
        );

        if (response.data.success) {
          alert("Passenger deleted successfully");
          fetchPassengers();
        } else {
          alert("Failed to delete passenger");
        }
      } catch (error) {
        console.error("Error deleting passenger:", error);
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Passenger List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchPassengers}
        sx={{ mb: 2 }}
      >
        Refresh List
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate("/home")}
      >
        Back
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Age</strong>
              </TableCell>
              <TableCell>
                <strong>Gender</strong>
              </TableCell>
              <TableCell>
                <strong>Origin</strong>
              </TableCell>
              <TableCell>
                <strong>Destination</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow key={passenger.id}>
                {editPassenger?.id === passenger.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editPassenger.first_name}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.last_name}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.age}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            age: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.gender}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            gender: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.origin}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            origin: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.destination}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            destination: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editPassenger.travel_date}
                        onChange={(e) =>
                          setEditPassenger({
                            ...editPassenger,
                            travel_date: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ gap: "10px", display: "flex" }}>
                      <Button
                        onClick={handleUpdate}
                        color="success"
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditPassenger(null)}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{passenger.first_name}</TableCell>
                    <TableCell>{passenger.last_name}</TableCell>
                    <TableCell>{passenger.age}</TableCell>
                    <TableCell>{passenger.gender}</TableCell>
                    <TableCell>{passenger.origin}</TableCell>
                    <TableCell>{passenger.destination}</TableCell>
                    <TableCell>{passenger.travel_date}</TableCell>
                    <TableCell style={{ gap: "10px", display: "flex" }}>
                      <ColorButton
                        onClick={() => handleEdit(passenger)}
                        color="primary"
                        variant="contained"
                      >
                        Edit
                      </ColorButton>
                      <Button
                        onClick={() => handleDelete(passenger.id)}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
