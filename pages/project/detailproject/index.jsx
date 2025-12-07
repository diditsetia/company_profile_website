import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  faClose,
  faHeart,
  faEye,
  faShare,
  faBookmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const DetailProjectPage = () => {
  const router = useRouter();
  const { id } = router.query; // Ambil ID dari URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH PROJECT BY ID
  // =====================================================
  useEffect(() => {
    if (!id) return;

    const fetchProjectById = async () => {
      try {
        const res = await fetch(`http://localhost:4000/projects/${id}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setProject(data.data);
        } else {
          console.error("Gagal mengambil project:", data.message);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectById();
  }, [id]);

  // =====================================================
  // LOADING & NOT FOUND
  // =====================================================
  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project tidak ditemukan.</p>;

  // =====================================================
  // RENDER PAGE
  // =====================================================
  return (
    <div>
      {/* NAVBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "0px 70px",
          backgroundColor: "white",
          zIndex: 999,
        }}
      >
        <Navbar />
      </div>

      <div
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "0px 10%",
        }}
      >
        {/* TITLE + AUTHOR SECTION */}
        <div style={{ marginTop: 125 }}>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* TITLE */}
            <div>
              <span className="HammersmithOne" style={{ fontSize: 30 }}>
                {project.title}
              </span>
            </div>

            {/* SHARE + AUTHOR */}
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 32px",
                    gap: 10,
                  }}
                >
                  <FontAwesomeIcon color="#000" size="lg" icon={faShare} />
                  <FontAwesomeIcon color="#000" size="lg" icon={faBookmark} />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <span style={{ fontSize: 18 }} className="HammersmithOne">
                  Team
                </span>
              </div>

              <div style={{ display: "flex", marginTop: 10 }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    background: "#D9D9D9",
                    borderRadius: 25,
                  }}
                ></div>

                <div style={{ marginLeft: 16 }}>
                  <p className="font-semibold text-gray-900">{project.team}</p>
                  <time className="text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div style={{ marginTop: 30 }}>
          <img
            src={`http://localhost:4000${
              project.thumbnail || project.contentImage || "/images/default.png"
            }`}
            alt={project.title}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ marginTop: 40 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {project.content}
          </p>
        </div>

        {project.videoProject && (
          <>
            {(() => {
              const url = project.videoProject;

              const youtubeId =
                url.split("v=")[1]?.split("&")[0] ||
                url.replace("https://youtu.be/", "");

              const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

              return (
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    marginTop: 30,
                  }}
                >
                  <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                    }}
                  ></iframe>
                </div>
              );
            })()}
          </>
        )}

        <div style={{ marginTop: 99 }}></div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailProjectPage;
