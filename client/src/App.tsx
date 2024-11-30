import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSuccess from "./pages/LoginSuccess";
import Dashboard from "./pages/Dashboard";
import RouteGuard from "./RouteGuard";

function App() {
  return (
    <BrowserRouter>
      <RouteGuard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<LoginSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </RouteGuard>
    </BrowserRouter>
  );
}

export default App;
