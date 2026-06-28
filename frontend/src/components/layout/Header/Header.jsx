import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import Container from "../../common/Container";
import Logo from "../../common/Logo";
import PrimaryButton from "../../common/PrimaryButton";
import SecondaryButton from "../../common/SecondaryButton";

import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

import { logout } from "../../../features/auth/authSlice";
import { getDashboardPath } from "../../../utils/getDashboardPath";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    setMobileOpen(false);

    navigate("/");
  };

  const handleDashboard = () => {
    navigate(getDashboardPath(user?.role));

    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur-md
          shadow-sm
        "
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Left */}
            <Logo />

            {/* Center */}
            <DesktopNav />

            {/* Right Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <SecondaryButton>Login</SecondaryButton>
                  </Link>

                  <Link to="/register">
                    <PrimaryButton>Register</PrimaryButton>
                  </Link>
                </>
              ) : (
                <UserMenu user={user} />
              )}
            </div>

            {/* Mobile Hamburger */}

            <button
              onClick={() => setMobileOpen(true)}
              className="
                rounded-lg
                p-2
                text-slate-700
                transition
                hover:bg-slate-100
                lg:hidden
              "
            >
              <Menu size={28} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={mobileOpen}
        closeMenu={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        navigateDashboard={handleDashboard}
        logout={handleLogout}
      />
    </>
  );
};

export default Header;
