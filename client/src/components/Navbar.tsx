import { ShieldCheck, Menu, X, LogOut, LayoutDashboard, Search } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, logout: authLogout } = useAuth();
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const isLoggedIn = !!token;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    authLogout();
    setOpen(false);
    navigate("/login");
  };

  // 1. Get user initials for the avatar
  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  };

  // 2. Beautiful Active Link Styling (Indigo-500)
  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-1 py-2 transition-all duration-200 font-semibold text-sm ${
      isActive 
        ? "text-indigo-600 border-b-2 border-indigo-500" 
        : "text-slate-500 hover:text-slate-900 border-b-2 border-transparent"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">
              VendorTrust
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLink to="/check" className={navLinkStyles}>
                <Search size={16} /> Check Vendor
              </NavLink>
              <NavLink to="/dashboard" className={navLinkStyles}>
                <LayoutDashboard size={16} /> Dashboard
              </NavLink>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 mx-2" />

            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                {/* Desktop User Badge */}
                <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {getInitials(user)}
                  </div>
                  <span className="text-sm font-bold text-indigo-700 truncate max-w-[120px]">
                    {user}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-md shadow-slate-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-6 space-y-6">
              
              {/* Mobile User Card */}
              {isLoggedIn && user && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-lg font-bold shadow-indigo-200 shadow-lg">
                    {getInitials(user)}
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">{user}</h4>
                    <p className="text-xs text-indigo-500 font-medium">{email}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <NavLink 
                  to="/check" 
                  onClick={() => setOpen(false)} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <Search size={20} className="text-indigo-500" /> Check Vendor
                </NavLink>
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setOpen(false)} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <LayoutDashboard size={20} className="text-indigo-500" /> Dashboard
                </NavLink>
              </div>

              <div className="pt-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-red-50 text-red-600 font-bold"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <Link
                    onClick={() => setOpen(false)}
                    to="/login"
                    className="block w-full px-4 py-4 rounded-2xl bg-indigo-500 text-white font-bold text-center shadow-lg shadow-indigo-100"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;