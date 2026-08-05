import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Mobilize from "./pages/Mobilize";
import Alerts from "./pages/Alerts";
import Aoi from "./pages/Aoi";
import Activity from "./pages/Activity";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgotpassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import PasswordUpdated from "./pages/PasswordUpdated";
import ProtectedRoute from "./routes/ProtectedRoute";
import VehiclesDetails from "./pages/VehiclesDetails";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import SecuritySettingUpdate from "./features/profile/SecuritySettingUpdate";
import CommandHistoryPage from "./features/mobilize/CommandHistory";
import { toast } from "./components/Ui/toast";

function SecuritySettingUpdateRoute() {
  const navigate = useNavigate();

  return (
    <>
      <Profile />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1f1f23] bg-[#121214] shadow-2xl">
          <SecuritySettingUpdate
            onSave={() => {
              toast.success("Settings updated successfully");
              navigate("/profile");
            }}
            onDiscard={() => navigate("/profile")}
          />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-[#0B0F19] overflow-x-hidden">
        <Routes>
          {/* Auth screens */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-updated" element={<PasswordUpdated />} />

          
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
            path="/activity"
            element={
              <ProtectedRoute>
                <Activity />
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/securitysettingupdate"
            element={
              <ProtectedRoute>
                <SecuritySettingUpdateRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/command-history"
            element={
              <ProtectedRoute>
                <CommandHistoryPage />
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