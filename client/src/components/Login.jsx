import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/servers/login.php", {
        email: data.email, 
        password: data.password
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/home"); // Redirect to home
      } else {
        alert(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } 
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
