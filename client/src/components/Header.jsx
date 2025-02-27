import React from "react";
import {
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Successfully Logged Out");
    navigate("/login");
  };

  return (
    <div style={{margin:"0px", height:"35vh"}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin:"10px"
          }}
        >
          <Box
            component="img"
            sx={{
              height: 100,
              width: 200,
            }}
            alt="The house from the offer."
            src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg"
          ></Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="error" onClick={handleLogout} style={{borderRadius:"50px", textAlign:"center", fontSize:"10px", lineHeight:"20px",fontWeight:"bold"}}>
              Logout
            </Button>
          </Box>
        </Box>
    </div>
  );
};

export default Header;
