import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2"; 
import {createGlobalStyle} from 'styled-components';
import '../index.css'

const Login = () => {

  const GlobalStyle = createGlobalStyle`
      body{
        font-family: "Poppins", sans-serif;
      }`

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/servers/login.php", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        // ✅ SweetAlert for successful login
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/home");
        });

      } else {
        // ❌ SweetAlert for invalid credentials
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Invalid email or password",
        });
      }

    } catch (error) {
      console.error("Login Error:", error);
      
      // ⚠️ SweetAlert for network errors
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <Box
      sx={{
        height:"70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://www.claritytts.com/assets/img/New-signup-images/signup-background.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <GlobalStyle/>
      <Paper elevation={10} sx={{ padding: 6, maxWidth: 350, textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.938)", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            fullWidth 
            label="Email" 
            variant="outlined" 
            margin="normal" 
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })} 
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: "#3d97d3" }}>
            Login
          </Button>
        </form>
        <Typography variant="body1" sx={{ mt: 3 }}>
          Don't have an account? <Link to="/register">  Register here</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
