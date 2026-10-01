import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import ThemeToggle from "../components/ThemeToggle";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../features/auth/authSlice";

type Theme = "light" | "dark";

function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /*
    Get the currently logged-in user from Redux.

    ProtectedRoute already makes sure a user is logged in,
    but we still read currentUser here to display their name/avatar.
  */
  const currentUser = useAppSelector(
    (state) => state.auth.currentUser,
  );

  /*
    Logout:
      1. Clear the current user from Redux.
      2. Navigate back to the Login page.
  */
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  /*
    Read the saved theme when the application starts.

    If there is no saved theme, use light mode.
  */
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  /*
    Save the selected theme so it remains after refreshing
    or reopening the application.
  */
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  /*
    Switch between light and dark themes.
  */
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  return (
    <div className="app" data-theme={theme}>
      <Sidebar />

      <div className="app-content">
        <header className="topbar">
          {/* Mobile brand */}
          <div className="mobile-brand">
            <div className="logo-mark">GM</div>

            <div>
              <strong>Good Morning</strong>
              <span>Scheduler</span>
            </div>
          </div>

          <div className="topbar-actions">
            {/* Theme toggle */}
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
            />

            {/* Logged-in user */}
            <div className="user-menu">
              <div
                className="profile-avatar"
                aria-label="User profile"
              >
                {currentUser
                  ? currentUser.name.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <span className="user-name">
                {currentUser?.name}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

export default AppLayout;