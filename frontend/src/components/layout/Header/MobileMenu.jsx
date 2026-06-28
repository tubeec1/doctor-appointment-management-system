import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import { publicNavigation } from "../../../utils/navigation";

import PrimaryButton from "../../common/PrimaryButton";
import SecondaryButton from "../../common/SecondaryButton";

const MobileMenu = ({
  open,
  closeMenu,
  isAuthenticated,
  navigateDashboard,
  logout,
}) => {
  return (
    <div
      className={`
fixed
top-0
right-0
h-screen
w-80
bg-white
shadow-2xl
z-50
transform
transition-transform
duration-300
${open ? "translate-x-0" : "translate-x-full"}
`}
    >
      <div className="flex items-center justify-between border-b p-5">
        <h3 className="font-bold text-slate-900">Menu</h3>

        <button onClick={closeMenu}>
          <X />
        </button>
      </div>

      <div className="flex flex-col p-5 space-y-5">
        {publicNavigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "font-semibold text-blue-600" : "text-slate-700"
            }
          >
            {item.title}
          </NavLink>
        ))}

        <hr />

        {!isAuthenticated ? (
          <>
            <NavLink to="/login">
              <SecondaryButton className="w-full">Login</SecondaryButton>
            </NavLink>

            <NavLink to="/register">
              <PrimaryButton className="w-full">Register</PrimaryButton>
            </NavLink>
          </>
        ) : (
          <>
            <PrimaryButton className="w-full" onClick={navigateDashboard}>
              Dashboard
            </PrimaryButton>

            <button
              onClick={logout}
              className="rounded-lg bg-red-600 py-3 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
