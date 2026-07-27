import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Mobilize from "./pages/Mobilize";
import Alerts from "./pages/Alerts";
import Aoi from "./pages/Aoi";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import VehiclesDetails from "./pages/VehiclesDetails";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#0B0F19] overflow-x-hidden">
        <Routes>
          {/* Auth screens */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mobilize"
            element={
              <ProtectedRoute>
                <Mobilize />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aoi"
            element={
              <ProtectedRoute>
                <Aoi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle-overview"
            element={
              <ProtectedRoute>
                <VehiclesDetails />
              </ProtectedRoute>
            }
          />
           <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;