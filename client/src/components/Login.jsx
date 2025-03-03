import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/servers/login.php",
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("Server Response:", response.data); // Debugging

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token Stored:", localStorage.getItem("token")); // Debugging
        navigate("/home"); // Redirect to Home Page
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        gap: 2,
        p: 0,
        backgroundColor: "#FAFAFA",
        borderRadius: 6,
        height: "98vh",
      }}
      style={{ padding: "0px" }}
    >
      <Box
        component="img"
        sx={{
          width: 1 / 2,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
        }}
        alt="The house from the offer."
        src="https://cdn.create.vista.com/downloads/b4ee97fc-2f83-4239-980d-0a6134c46c53_1024.jpeg"
      ></Box>
      <Box
        sx={{
          mt: 5,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
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
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#555F6E" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
