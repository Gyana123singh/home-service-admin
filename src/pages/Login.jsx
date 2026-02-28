import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import logo1 from "../assets/home.jpg";
import logo from "../assets/hirehand-rmbg.png";
import { authApi } from "../api/auth/authApi";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);
      const res = await authApi.login({ email, password });
      const { token, admin } = res.data;

      localStorage.setItem("access_token", token);
      login(admin);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN HANDLER
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/googleAuth/google";
  };

  return (
    <div className="min-h-screen flex sticky">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-2/3 relative">
        <img src={logo1} alt="cleaning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/40"></div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} className="h-22 mb-2 scale-150" alt="logo" />
            <p className="text-sm text-gray-800 font-semibold capitalize">
              Admin Panel of Home service
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-md font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* ✅ GOOGLE LOGIN BUTTON */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-700 my-5">
            Copyright © {new Date().getFullYear()} Hirehand. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
