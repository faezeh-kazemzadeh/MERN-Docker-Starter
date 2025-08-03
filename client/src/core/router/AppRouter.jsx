import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { About, Home, UnAuthorized, NotFound } from "../pages";
import MainLayout from "../components/layout/MainLayout";
import PublicRoutesLayout from "../components/layout/PublicRoutesLayout";
import PrivateRoutesLayout from "../components/layout/PrivateRoutesLayout";
import AllowedRolesWrapper from "../components/common/AllowedRolesWrapper";
import SignIn from "../../features/auth/pages/SignIn";
import SignUp from "../../features/auth/pages/SignUp";
import ForgotPassword from "../../features/auth/pages/ForgotPassword";
import ResetPassword from "../../features/auth/pages/ResetPassword";
function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route element={<PublicRoutesLayout />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </Route>
            <Route element={<PrivateRoutesLayout />}>
              {/* Add private routes here */}
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/profile" element={<div>Profile</div>} />
              <Route element={<AllowedRolesWrapper allowedRoles={["admin"]} />} >
                <Route path="/admin" element={<div>Admin Page</div>} />
                <Route path="/user" element={<div>User Page</div>} />
              </Route>
            </Route>
            {/* Add other routes here */}
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/redirect" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
