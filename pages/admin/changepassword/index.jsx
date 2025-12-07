"use client";

import { useState } from "react";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [oldshowPassword, setOldShowPassword] = useState(false);
  const [confirmNewshowPassword, setConfirmNewShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==== VALIDASI PASSWORD ====
  const validatePassword = (password) => {
    const regex = {
      lower: /[a-z]/,
      upper: /[A-Z]/,
      number: /[0-9]/,
      symbol: /[!@#$%^&*(),.?":{}|<>]/,
    };

    const errorList = {};

    if (!regex.lower.test(password)) errorList.lower = "Minimal 1 huruf kecil";
    if (!regex.upper.test(password)) errorList.upper = "Minimal 1 huruf besar";
    if (!regex.number.test(password)) errorList.number = "Minimal 1 angka";
    if (!regex.symbol.test(password))
      errorList.symbol = "Minimal 1 simbol / karakter spesial";
    if (password.length < 12) errorList.length = "Minimal panjang 12 karakter";

    return errorList;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!oldpassword) newErrors.oldpassword = "Old password wajib diisi";

    const passErrors = validatePassword(newpassword);
    if (Object.keys(passErrors).length > 0) {
      newErrors.newpassword = Object.values(passErrors).join(", ");
    }

    if (newpassword !== confirmPassword) {
      newErrors.confirmPassword = "Confirm password tidak sama";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:4000/reset-password", {
        method: "PUT",
        credentials: "include", // 🔥 PENTING! Mengirim cookie JWT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldpassword,
          newPassword: newpassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal mengganti password");
        return;
      }

      alert("Password berhasil diubah. Anda akan logout...");
      await handleLogout(); // logout otomatis
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan");
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });

    // Hapus data user (kalau ada)
    localStorage.removeItem("user");

    router.push("/admin");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-10 justify-center">
          <img src="/images/lumbungmuncul_logo.png" width="70px" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Change Password
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Change your account password:
        </p>

        <form onSubmit={handleSubmit}>
          {/* OLD PASSWORD */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Old Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={oldshowPassword ? "text" : "password"}
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="w-full outline-none text-sm bg-transparent"
              />
              <button
                type="button"
                onClick={() => setOldShowPassword(!oldshowPassword)}
              >
                {oldshowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.oldpassword && (
              <p className="text-red-500 text-xs mt-1">{errors.oldpassword}</p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={newshowPassword ? "text" : "password"}
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full outline-none text-sm bg-transparent"
              />
              <button
                type="button"
                onClick={() => setNewShowPassword(!newshowPassword)}
              >
                {newshowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.newpassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newpassword}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={confirmNewshowPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full outline-none text-sm bg-transparent"
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmNewShowPassword(!confirmNewshowPassword)
                }
              >
                {confirmNewshowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#354d34] text-white py-3 rounded-lg font-semibold hover:bg-[#354d34]/70 transition"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
