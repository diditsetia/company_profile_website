// "use client";

// import AdminLayout from "../layout";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import { useEffect, useState } from "react";

// const ProjectAdmin = () => {
//   const [articles, setArticles] = useState([]);
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   // Fetch article dari API
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/articles");
//         const data = await res.json();

//         if (res.ok && data.success) {
//           // Sesuaikan: ambil data.data
//           setArticles(Array.isArray(data.data) ? data.data : []);
//         } else {
//           console.error("Gagal fetch articles:", data.message);
//         }
//       } catch (err) {
//         console.error("Error fetch articles:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const statusClass = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-100 text-green-600";
//       case "Draft":
//         return "bg-yellow-100 text-yellow-600";
//       case "Cancel":
//         return "bg-red-100 text-red-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:4000/articles/${deleteId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();

//       if (res.ok && data.success) {
//         alert(data.message);
//         // router.push("/admin/article");
//         window.location.reload();
//       } else {
//         alert(`Gagal menghapus artikel: ${data.message}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Terjadi kesalahan saat menghapus artikel.");
//     } finally {
//       setLoading(false);
//       setShowModal(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div>
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[100000]">
//             <div className="bg-white rounded-lg p-6 w-96 shadow-lg z-[100001]">
//               <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                 Konfirmasi Hapus
//               </h3>
//               <p className="mb-6 text-gray-600">
//                 Apakah kamu yakin ingin menghapus artikel ini? Tindakan ini
//                 tidak bisa dibatalkan.
//               </p>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={loading}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {loading ? "Menghapus..." : "Hapus"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         <span className="HammersmithOne text-2xl">Projects</span>

//         <div className="w-full mt-6">
//           {/* TOP BAR */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
//             <h2 className="text-xl font-semibold text-gray-800">
//               List Projects
//             </h2>

//             <Link href="/admin/project/add">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                 + Add Project
//               </button>
//             </Link>
//           </div>

//           {/* TABLE WRAPPER - RESPONSIVE */}
//           <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
//             <div className="min-w-[800px]">
//               {/* TABLE HEADER */}
//               <div className="grid grid-cols-6 px-6 py-4 text-sm font-semibold text-gray-500 border-b bg-gray-50">
//                 <div className="col-span-2">Project</div>
//                 <div>Team</div>
//                 <div>Status</div>
//                 <div>Client</div>
//                 <div className="text-right">Action</div>
//               </div>

//               {/* TABLE ROWS */}
//               {loading ? (
//                 <div className="px-6 py-5 text-gray-500">
//                   Loading articles...
//                 </div>
//               ) : articles.length === 0 ? (
//                 <div className="px-6 py-5 text-gray-500">
//                   No articles found.
//                 </div>
//               ) : (
//                 articles.map((a) => (
//                   <div
//                     key={a._id}
//                     className="grid grid-cols-6 items-center px-6 py-5 border-b last:border-none hover:bg-gray-50 transition"
//                   >
//                     {/* Article + Author */}
//                     <div className="col-span-2 flex items-center gap-4">
//                       <img
//                         src={
//                           a.contentImage
//                             ? `http://localhost:4000${a.contentImage}`
//                             : a.thumbnail
//                             ? `http://localhost:4000${a.thumbnail}`
//                             : "/avatar-placeholder.png"
//                         }
//                         alt=""
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-800">{a.title}</p>
//                         <p className="text-sm text-gray-500">{a.author}</p>
//                       </div>
//                     </div>

//                     <div className="text-gray-600">{a.category}</div>

//                     <div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(
//                           a.status
//                         )}`}
//                       >
//                         {a.status}
//                       </span>
//                     </div>

//                     <div className="text-gray-600">{a.views || "0"}</div>

//                     {/* Action */}
//                     <div className="flex justify-end gap-2">
//                       <Link href={`/admin/article/edit?id=${a._id}`}>
//                         <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
//                           Edit
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => {
//                           setDeleteId(a._id);
//                           setShowModal(true);
//                         }}
//                         className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ProjectAdmin;

"use client";

import AdminLayout from "../layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch projects dari API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/projects");
        const data = await res.json();

        if (res.ok && data.success) {
          setProjects(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error("Gagal fetch projects:", data.message);
        }
      } catch (err) {
        console.error("Error fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const statusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Draft":
        return "bg-yellow-100 text-yellow-600";
      case "Cancel":
        return "bg-red-100 text-red-600";
      case "Done":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // const handleDelete = async () => {
  //   if (!deleteId) return;
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://localhost:4000/projects/${deleteId}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       alert(data.message);
  //       window.location.reload(); // reload page agar data terupdate
  //     } else {
  //       alert(`Gagal menghapus project: ${data.message}`);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Terjadi kesalahan saat menghapus project.");
  //   } finally {
  //     setLoading(false);
  //     setShowModal(false);
  //   }
  // };

  const handleDelete = async () => {
    if (!deleteId) return; // pastikan ada ID project yang akan dihapus
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:4000/projects/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message);
        // reload page atau update state agar daftar project terupdate
        window.location.reload();
      } else {
        alert(`Gagal menghapus project: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus project.");
    } finally {
      setLoading(false);
      setShowModal(false); // tutup modal hapus
    }
  };

  return (
    <AdminLayout>
      <div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[100000]">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg z-[100001]">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Konfirmasi Hapus
              </h3>
              <p className="mb-6 text-gray-600">
                Apakah kamu yakin ingin menghapus project ini? Tindakan ini
                tidak bisa dibatalkan.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white ${
                    loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loading ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}

        <span className="HammersmithOne text-2xl">Projects</span>

        <div className="w-full mt-6">
          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              List Projects
            </h2>
            <Link href="/admin/project/add">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                + Add Project
              </button>
            </Link>
          </div>

          {/* TABLE WRAPPER */}
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <div className="min-w-[900px]">
              {/* TABLE HEADER */}
              <div className="grid grid-cols-6 px-6 py-4 text-sm font-semibold text-gray-500 border-b bg-gray-50">
                <div className="col-span-2">Project</div>
                <div>Team</div>
                <div>Status</div>
                <div>Client</div>
                <div className="text-right">Action</div>
              </div>

              {/* TABLE ROWS */}
              {loading ? (
                <div className="px-6 py-5 text-gray-500">
                  Loading projects...
                </div>
              ) : projects.length === 0 ? (
                <div className="px-6 py-5 text-gray-500">
                  No projects found.
                </div>
              ) : (
                projects.map((p) => (
                  <div
                    key={p._id}
                    className="grid grid-cols-6 items-center px-6 py-5 border-b last:border-none hover:bg-gray-50 transition"
                  >
                    {/* Project + Thumbnail */}
                    <div className="col-span-2 flex items-center gap-4">
                      <img
                        src={
                          p.contentImage
                            ? `http://localhost:4000${p.contentImage}`
                            : p.thumbnail
                            ? `http://localhost:4000${p.thumbnail}`
                            : "/avatar-placeholder.png"
                        }
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{p.title}</p>
                        <p className="text-sm text-gray-500">{p.category}</p>
                      </div>
                    </div>

                    <div className="text-gray-600">{p.team}</div>

                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <div className="text-gray-600">{p.client}</div>

                    {/* Action */}
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/project/edit?id=${p._id}`}>
                        <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(p._id);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectAdmin;
