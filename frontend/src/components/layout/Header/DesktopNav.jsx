import { NavLink } from "react-router-dom";
import { publicNavigation } from "../../../utils/navigation";

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {publicNavigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `group relative text-sm font-medium transition-all duration-300
  ${isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}`
          }
        >
          {({ isActive }) => (
            <>
              {item.title}

              <span
                className={`
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  bg-blue-600
                  transition-all
                  duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default DesktopNav;
