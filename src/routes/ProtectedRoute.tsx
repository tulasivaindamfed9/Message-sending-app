import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
  );

  const location = useLocation();

  /*
    If the user is not logged in, send them to Login.

    We also remember the page they originally tried to open.
    This will be useful later if we want to return them there
    after successful login.
  */
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;