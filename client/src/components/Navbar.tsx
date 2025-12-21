import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const isLoggedIn = !!token;
//   const { logout } = useAuth();
const logout = () => {
    localStorage.removeItem("token");
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <ShieldCheck className="text-accent" />
          VendorTrust
        </Link>

        <div className="space-x-4 text-sm">
          <Link to="/check">Check Vendor</Link>
          <Link to="/dashboard">Dashboard</Link>
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
