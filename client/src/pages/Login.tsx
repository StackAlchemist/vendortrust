import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { AuthResponse } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

type Mode = "login" | "signup";

const Login: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        mode === "login" ? "users/login" : "users/signup";

      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : form;

      const res = await api.post<AuthResponse>(endpoint, payload);

      login(res.data.token);
      localStorage.setItem("user", res.data.name);
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch (err: unknown) {
      setError(
        mode === "login"
          ? "Invalid email or password"
          : "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        {/* LOGO */}
        <div className="flex items-center justify-center gap-2 mb-6 tracking-tight">
          <span className="p-2 rounded-lg bg-indigo-500 text-white">
            <ShieldCheck size={18} />
          </span>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent font-bold">
            VendorTrust
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4 text-center">
          {mode === "login"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              className="input"
              placeholder="Full name"
              required
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            className="input"
            placeholder="Email address"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-sm text-center text-slate-500 mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-indigo-600 cursor-pointer font-medium"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-indigo-600 cursor-pointer font-medium"
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
