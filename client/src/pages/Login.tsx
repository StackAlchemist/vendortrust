import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { LoginPayload, AuthResponse } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginPayload>({
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
      const res = await api.post<AuthResponse>(
        "users/login",
        form
      );

      login(res.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="text-accent" />
          <h1 className="text-xl font-bold">VendorTrust</h1>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-center">
          Sign in to your account
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            className="input"
            placeholder="Email address"
            required
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            required
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-2 rounded-md font-medium"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-accent cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
