import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import HomePage from "./pages/Home/HomePage";
import HowToUsePage from "./pages/HowToUse/HowToUsePage";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import SchedulesPage from "./pages/Schedules/SchedulesPage";
import CreateSchedulePage from "./pages/Schedules/CreateSchedulePage";
import RecipientsPage from "./pages/Recipients/RecipientsPage";
import CreateRecipientPage from "./pages/Recipients/CreateRecipientPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import HistoryPage from "./pages/History/HistoryPage";
import SettingsPage from "./pages/Settings/SettingsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />

        {/* Authentication pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected application */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/schedules" element={<SchedulesPage />} />

            <Route
              path="/schedules/create"
              element={<CreateSchedulePage />}
            />

            <Route path="/recipients" element={<RecipientsPage />} />

            <Route
              path="/recipients/create"
              element={<CreateRecipientPage />}
            />

            <Route path="/calendar" element={<CalendarPage />} />

            <Route path="/history" element={<HistoryPage />} />

            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;