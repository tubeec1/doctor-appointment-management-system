import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

import Avatar from "../../ui/Avatar/Avatar";
import Dropdown from "../../ui/Dropdown/Dropdown";

import { logout } from "../../../features/auth/authSlice";
import { getDashboardPath } from "../../../utils/getDashboardPath";

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <div className="relative hidden lg:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-slate-100"
      >
        <Avatar src={user?.profile_image} size="md" />

        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">
            {user?.full_name}
          </p>

          <p className="text-xs text-slate-500">{user?.role}</p>
        </div>

        <ChevronDown size={18} />
      </button>

      <Dropdown open={open} onClose={() => setOpen(false)}>
        <button
          onClick={() => navigate(getDashboardPath(user.role))}
          className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
