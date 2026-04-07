import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { userDataContext } from "./context/UserContext";

const App = () => {
  const { userData } = useContext(userDataContext);

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Login />} />
      <Route path="/login" element={userData ? <Home /> : <Login />} />
      <Route path="/signup" element={userData ? <Home /> : <Signup />} />
    </Routes>
  );
};

export default App;
