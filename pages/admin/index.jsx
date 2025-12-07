"use client";

import { useState, useEffect } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaEye,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.valid) {
          console.log("✅ Sudah login:", data.user);
          window.location.href = "/admin/dashboard"; // langsung redirect
        }
      } catch (err) {
        console.error("Gagal cek auth:", err);
      }
    };

    checkAuth();
  }, []);

  // Fungsi validasi sederhana
  const validateForm = () => {
    const newErrors = {};

    // Validasi email wajib dan format
    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi password wajib
    if (!password) {
      newErrors.password = "Password wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fungsi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // tampilkan loading modal
      setErrorModal(false);

      try {
        // simulasi jeda loading 2 detik biar animasinya terlihat
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Email atau password salah");

        const data = await res.json();
        console.log("Login berhasil:", data);

        // Jika sukses, bisa redirect
        alert("✅ Login berhasil!");
        window.location.href = "/admin/dashboard";
      } catch (err) {
        console.error(err);
        // tampilkan modal gagal
        setErrorModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center relative">
      {/* Modal Loading */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fadeIn">
            <FaSpinner className="animate-spin text-[#0F3D3E]  text-4xl mb-4" />
            <p className="text-gray-700 font-medium text-lg">
              Logging in, please wait...
            </p>
          </div>
        </div>
      )}

      {/* Modal Gagal */}
      {errorModal && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fadeIn">
            <FaTimesCircle className="text-red-500 text-5xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Login Gagal
            </h2>
            <p className="text-gray-500 mb-6">
              Email atau password yang kamu masukkan salah.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="bg-[#0F3D3E] hover:bg-[#0F3D3E]/70 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <img src="/images/lumbungmuncul_logo.png" width="70px" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Log in to your Account
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Welcome back! Select method to log in:
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-8 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#0F3D3E]" />
              Remember me
            </label>
            <a href="#" className="text-[#0F3D3E] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#354d34] text-white py-3 rounded-lg font-semibold hover:bg-[#354d34]/70 transition ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <a href="" className="text-[#0F3D3E] font-medium hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
