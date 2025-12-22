import { ShieldCheck, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const isLoggedIn = !!token;
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-lg tracking-tight"
        >
          <span className="p-2 rounded-lg bg-indigo-500 text-white">
            <ShieldCheck size={18} />
          </span>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            VendorTrust
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/check" className="hover:text-slate-900 transition">
            Check Vendor
          </Link>
          <Link to="/dashboard" className="hover:text-slate-900 transition">
            Dashboard
          </Link>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 text-white shadow hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-6 flex flex-col gap-5 text-sm font-medium text-slate-700">
              <Link onClick={() => setOpen(false)} to="/check">
                Check Vendor
              </Link>
              <Link onClick={() => setOpen(false)} to="/dashboard">
                Dashboard
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="mt-2 px-4 py-2 rounded-lg border border-slate-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="mt-2 px-4 py-2 rounded-lg text-center bg-gradient-to-r from-emerald-500 to-indigo-500 text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
