import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import Image from '../assets/map2.jpg';

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/servers/register.php", data);
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", data.email); // ✅ Store the email correctly

        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered. Redirecting to home...",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          navigate("/home");
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.data.message || "Something went wrong. Please try again.",
        });
      }
      
    } catch (error) {
      console.error("Registration Error:", error);
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Registration failed. Please try again later.",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: { xs: 3, sm: 6 },
          maxWidth: { xs: 320, sm: 400 },
          width: "100%",
          height:"100%",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem" } }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Name" variant="outlined" margin="normal" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField fullWidth label="Email" variant="outlined" margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField fullWidth type="password" label="Password" variant="outlined" margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <TextField fullWidth type="password" label="Confirm Password" variant="outlined" margin="normal" {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: "#3d97d3" }}>
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account? <Link to="/">Login here</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegistrationPage;
