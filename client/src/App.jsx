import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserList from "./components/UserList";
import Login from "./components/Login";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import RegistrationPage from "./components/RegistrationPage";
import Header from "./components/Header";


const App = () => {
  return (

      
      <Router>

      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes (login & register should be restricted for logged-in users) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        {/* Private routes (show Header only after login) */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
    
  );
};

export default App;
