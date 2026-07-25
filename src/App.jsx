import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Mobilize from "./pages/Mobilize";
import Alerts from "./pages/Alerts";
import Aoi from "./pages/Aoi";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#0B0F19] overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/mobilize" element={<Mobilize />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/aoi" element={<Aoi />} />
           <Route path="/vehicles" element={<Vehicles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;