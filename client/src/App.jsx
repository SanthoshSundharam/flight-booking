import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import UserList from "./components/UserList";

function App() {
  return (
    <div style={{ backgroundRepeat: 'no-repeat', backgroundSize:"cover", height:"100%"}}>
      <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;






















