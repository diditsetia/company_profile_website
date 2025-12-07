"use client";

import { useState, useRef, useEffect } from "react";
import AdminLayout from "../../layout";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [status, setStatus] = useState("Active");
  const [contentImage, setContentImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // State dan ref untuk dropdown Status
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef(null);

  // State dan ref untuk dropdown Kategori
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Judul artikel wajib diisi";
    if (!category) newErrors.category = "Kategori wajib dipilih";
    if (!content.trim()) newErrors.content = "Konten artikel wajib diisi";
    if (!author.trim()) newErrors.author = "Nama penulis wajib diisi";
    if (!contentImage) newErrors.contentImage = "Foto artikel wajib diisi";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("status", status);
      formData.append("author", author);

      if (thumbnail) formData.append("thumbnail", thumbnail);
      if (contentImage) formData.append("contentImage", contentImage);

      const res = await fetch("http://localhost:4000/articles", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message);
        // langsung redirect ke halaman list artikel
        router.push("/admin/article");
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim artikel.");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    "Teknologi Pertanian",
    "Budidaya & Tanaman",
    "Hewan Ternak",
    "Lingkungan & Iklim",
    "Bisnis & Pemasaran",
    "Kesehatan & Gaya Hidup",
    "Teknologi & Gadget",
    "Pendidikan & Sains",
    "Blog / Opini",
    "Event & Berita",
  ];
  const statusOptions = ["Active", "Draft"];

  return (
    <AdminLayout>
      <div className="w-full p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Tambah Artikel
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Artikel
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Masukkan judul artikel"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* CATEGORY (CUSTOM DROPDOWN) */}
          <div className="relative w-full" ref={categoryRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <button
              type="button"
              onClick={() => setCategoryOpen(!categoryOpen)}
              className={`w-full bg-white border rounded-lg p-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              {category || "-- Pilih Kategori --"}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {categoryOpen && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {categoryOptions.map((opt) => (
                  <li
                    key={opt}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setCategory(opt);
                      setCategoryOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* THUMBNAIL (Opsional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail Artikel (Opsional)
            </label>
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview Thumbnail"
                className="w-40 h-40 object-cover rounded-lg mb-3 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full border p-3 rounded-lg border-gray-300"
            />
          </div>

          {/* CONTENT IMAGE (Wajib) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Artikel
            </label>
            {contentImage && (
              <img
                src={URL.createObjectURL(contentImage)}
                alt="Preview Content"
                className="w-40 h-40 object-cover rounded-lg mb-3 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setContentImage(e.target.files[0])}
              className={`w-full border p-3 rounded-lg ${
                errors.contentImage ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.contentImage && (
              <p className="text-red-500 text-sm mt-1">{errors.contentImage}</p>
            )}
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konten Artikel
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.content
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Tulis konten atau deskripsi artikel..."
            ></textarea>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Penulis
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.author
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Masukkan nama penulis"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          {/* STATUS (CUSTOM DROPDOWN) */}
          <div className="relative w-full" ref={statusRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <button
              type="button"
              onClick={() => setStatusOpen(!statusOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {status}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {statusOpen && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {statusOptions.map((opt) => (
                  <li
                    key={opt}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setStatus(opt);
                      setStatusOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {loading ? "Menyimpan..." : "Simpan Artikel"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
