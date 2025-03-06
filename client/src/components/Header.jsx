import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const Header = ({ user }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "";
  const avatarLetter = userEmail.charAt(0).toUpperCase();


  const handleLogout = () => {
    // ✅ SweetAlert confirmation before logging out
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        // ✅ SweetAlert success message after logout
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div style={{ margin: "0px"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 200,
          }}
          alt="Portal Logo"
          src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg"
        >

        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {
            localStorage.getItem("email") &&  <><Avatar>{avatarLetter}</Avatar>
            <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={handleLogout}>
              Logout
            </Button></>
          }
        </Box>
      </Box>
    </div>
  );
};

export default Header;
