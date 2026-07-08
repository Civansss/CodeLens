import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Code2, Bot, LogOut } from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
  onClick={() => navigate("/dashboard")}
  className="flex items-center gap-3 cursor-pointer"
>
  <img
    src="/logo.png"
    alt="CodeLens Logo"
    className="w-12 h-12 rounded-2xl shadow-lg object-cover"
  />

  <div>
    <h1 className="text-2xl font-bold text-gray-800">
      CodeLens
    </h1>

    <p className="text-xs text-gray-500">
      See Beyond the Code.
    </p>
  </div>
</div>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <NavLink to="/dashboard" className={navClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/explain" className={navClass}>
            <Code2 size={18} />
            Explain Code
          </NavLink>

          <NavLink to="/aichat" className={navClass}>
            <Bot size={18} />
            AI Mentor
          </NavLink>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition duration-300"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;