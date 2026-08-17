import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import CreateReport from "./pages/CreateReport";
import Mobilize from "./pages/Mobilize";
import Alerts from "./pages/Alerts";
import Aoi from "./pages/Aoi";
import Activity from "./pages/Activity";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import PasswordUpdated from "./pages/PasswordUpdated";
import ProtectedRoute from "./routes/ProtectedRoute";
import VehiclesDetails from "./pages/VehiclesDetails";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import CommandHistoryPage from "./features/mobilize/CommandHistory";
import { setAuthTokens } from "./store/slices/authSlice";
import ForgotPassword from "./pages/Forgotpassword";
import Dashboard from "./pages/dashboard";
import FullMap from "./pages/FullMap";
import ApiKeyCredentialsPage from "./pages/ApiKeyCredentials";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleTokensUpdated = (event) => {
      const { accessToken, refreshToken } = event.detail || {};
      if (accessToken) {
        dispatch(setAuthTokens({ accessToken, refreshToken }));
      }
    };

    window.addEventListener("auth:tokens-updated", handleTokensUpdated);
    return () => {
      window.removeEventListener("auth:tokens-updated", handleTokensUpdated);
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] overflow-x-hidden">
      <Routes>
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
          path="/full-map"
          element={
            <ProtectedRoute>
              <FullMap />
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
          path="/reports/create"
          element={
            <ProtectedRoute>
              <CreateReport />
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
          path="/saved-places"
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
        <Route
          path="/api-credentials"
          element={
            <ProtectedRoute>
              <ApiKeyCredentialsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}