import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#0B0F19] overflow-hidden">
        <Routes>
          {/* Dono alag-alag routes/pages hain */}
          <Route path="/" element={<Dashboard/>} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;