import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const { register, handleSubmit, watch, reset, control } = useForm();
  const [passengers, setPassengers] = useState([]);

  // Watch number of passengers field
  const numPassengers = watch("numPassengers", 0);


  useEffect(() => {
    setPassengers(Array.from({ length: numPassengers }, (_, index) => index));
  }, [numPassengers]);


  const handleSearch = () => {
    if (numPassengers > 0) {
      setPassengers(Array.from({ length: numPassengers }, (_, index) => index));
    }
  };

  // Function to handle submission (stores data and resets form)
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/servers/passengers.php",
        data
      );
      alert(response.data.message);
      reset();
      setPassengers([]);
    } catch (error) {
      console.error("Error storing passengers:", error);
      alert("Failed to store passengers");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height:"50vh" }}>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2,}}>
        <Typography variant="h5" gutterBottom sx={{textAlign:"center", pb:2}}>
          Flight Search
        </Typography>

        <form onSubmit={handleSubmit(handleSearch)} style={{display:"flex", gap:12, alignItems:"center"}}>
          <TextField
            label="Origin"
            fullWidth
            margin="normal"
            {...register("origin", { required: true })}
          />
          <TextField
          // sx={{backgroundColor:"whitesmoke"}}
            label="Destination"
            fullWidth
            margin="normal"
            {...register("destination", { required: true })}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            {...register("date", { required: true })}
             InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Number of Passengers"
            type="number"
            fullWidth
            margin="normal"
            {...register("numPassengers", { required: true, min: 1 })}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ m: 1,borderRadius:"50px", fontWeight:"600", p:1, alignItems:"center" }}
          >
            Search
          </Button>
        </form>

        {passengers.length > 0 && (
          <form onSubmit={handleSubmit(onSubmit)} >
            <Typography variant="h6" sx={{ mt: 3 }}>
              Enter Passenger Details
            </Typography>

            {passengers.map((_, index) => (
              <Box
                key={index}
                sx={{ mt: 3, p: 2, border: "1px solid gray", borderRadius: 1, display:"flex", gap:3 }}
              >
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  {...register(`passengers[${index}].firstName`, {
                    required: true,
                  })}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  {...register(`passengers[${index}].lastName`, {
                    required: true,
                  })}
                />
                <TextField
                  label="Age"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...register(`passengers[${index}].age`, {
                    required: true,
                    min: 1,
                  })}
                />
                <Controller
                  name={`passengers[${index}].gender`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Gender"
                      fullWidth
                      margin="normal"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  )}
                />
              </Box>
            ))}

            <Button
              type="submit"
              variant="contained"
              color="secondary"
               sx={{ mt: 2, w:100, borderRadius:"50px" }}
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default FlightSearch;
