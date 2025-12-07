"use client";

import { useState, useEffect } from "react";

import { FaEnvelope, FaLock, FaEyeSlash, FaEye, FaUser } from "react-icons/fa";

const ChangePassword = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          {/* <div className="bg-[#FF0000] w-8 h-8 rounded-md"></div>
                  <h1 className="text-2xl font-bold text-gray-800">Javis</h1> */}
          <img src="/images/lumbungmuncul_logo.png" width="70px" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Register Account
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Please register your account:
        </p>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="name"
                placeholder="Enter your Full Name"
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>
            {/* {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )} */}
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              {/* <input
                        placeholder="Enter your password"
                        className="w-full outline-none text-sm bg-transparent"
                      /> */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full outline-none text-sm bg-transparent"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              {/* <input
                        placeholder="Enter your password"
                        className="w-full outline-none text-sm bg-transparent"
                      /> */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full outline-none text-sm bg-transparent"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          {/* <div className="flex items-center justify-between mb-8 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#0F3D3E]" />
              Remember me
            </label>
            <a href="#" className="text-[#0F3D3E] hover:underline">
              Forgot Password?
            </a>
          </div> */}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#354d34] text-white py-3 rounded-lg font-semibold hover:bg-[#354d34]/70 transition ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <a
            href="/admin"
            className="text-[#0F3D3E] font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
