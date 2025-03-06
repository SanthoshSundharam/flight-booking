import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserList from "./components/UserList";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import RegistrationPage from "./components/RegistrationPage";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/users" element={<PrivateRoute />}>
          <Route index element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;























