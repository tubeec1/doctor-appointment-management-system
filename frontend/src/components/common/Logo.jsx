import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
        <Stethoscope size={26} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 leading-none">
          Doctor Appointment
        </h2>

        <p className="text-sm text-slate-500">Management System</p>
      </div>
    </Link>
  );
};

export default Logo;
