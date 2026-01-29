import React, { useState } from "react";
import { Eye, EyeOff, Edit } from "lucide-react";
import { useAuth } from "../hooks";
import { IMAGE_URLS } from "../constants";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone && password) {
      login({ phone, role: "admin" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-2/3 relative">
        <img
          src={IMAGE_URLS.CLEANING}
          alt="cleaning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40"></div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">
            <img src={IMAGE_URLS.LOGO} className="h-12 mb-2" alt="logo" />
            <p className="text-sm text-gray-500">Home service</p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Please enter registered phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            {/* REMEMBER */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 cursor-pointer">
                Forgot Password ?
              </a>
            </div>

            {/* JOIN */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account ?
              <span className="text-blue-600 font-medium cursor-pointer">
                {" "}
                Join us as provider
              </span>
            </p>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors"
            >
              Login
            </button>
          </form>

          {/* ADMIN + PROVIDER */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* ADMIN */}
            <div className="bg-blue-600 text-white rounded-lg p-4 relative">
              <h4 className="text-sm font-semibold">ADMIN LOGIN</h4>
              <p className="text-xs mt-1">Mobile : 9876543210</p>
              <p className="text-xs">Password : 12345678</p>

              <div className="absolute right-3 top-3 bg-white text-blue-600 p-2 rounded-md">
                <Edit size={14} />
              </div>
            </div>

            {/* PROVIDER */}
            <div className="bg-gray-800 text-white rounded-lg p-4 relative">
              <h4 className="text-sm font-semibold">PROVIDER LOGIN</h4>
              <p className="text-xs mt-1">Mobile : 1234567890</p>
              <p className="text-xs">Password : 12345678</p>

              <div className="absolute right-3 top-3 bg-white text-gray-800 p-2 rounded-md">
                <Edit size={14} />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Copyright © 2025 eDemand. All rights reserved.
          </p>

          {/* NOTE */}
          <div className="bg-orange-400 text-white text-xs p-3 rounded-md text-center">
            Note: If you cannot login here, please close the codecanyon frame by
            clicking on <b>x Remove Frame</b> button or{" "}
            <span className="underline cursor-pointer">Click here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
