import { faClose, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "../components/navbar";
import ButtonPrimary from "../components/buttonPrimary";
import Footer from "../components/footer";
import CardProduct from "../components/cardProduct";

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const router = useRouter();

  // Fetch articles aktif
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:4000/articles?status=Active");
        const data = await res.json();
        if (res.ok && data.success) {
          setArticles(data.data);
        } else {
          console.error("Gagal mengambil artikel:", data.message);
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat fetch artikel:", err);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  // Fetch project selesai
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/projects?status=Done");
        const data = await res.json();
        if (res.ok && data.success) {
          setProjects(data.data);
        } else {
          console.error("Gagal mengambil project:", data.message);
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat fetch project:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {/* Navbar */}
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

      {/* Hero Banner */}
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          minHeight: "100px",
          padding: "10px 0px",
          scrollMarginTop: "100px",
        }}
      >
        <div style={{ paddingTop: "90px" }}></div>

        <div style={{ marginBottom: 34 }}>
          <section className="relative w-full">
            <img
              src="/images/bannerweb.png"
              alt="Banner"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-70 bg-gradient-to-r from-black/30 to-transparent">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                FEEDING <br /> THE FUTURE
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-white font-medium">
                Stronger Farmer, <br /> Healthy Food for Better Life
              </p>
              <button className="mt-6 w-fit bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition">
                Read More
              </button>
            </div>
          </section>
        </div>

        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
          className="PTSans font-[700] italic"
        >
          "Petani hebat tidak hanya menanam tetapi juga memahami tanah yang
          mereka pijak"
        </span>
      </div>

      {/* Artikel Section */}
      <div style={{ width: "100%", minHeight: "100px", padding: "46px 10%" }}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <span className="HammersmithOne" style={{ fontSize: 24 }}>
            ARTICLE
          </span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <span style={{ width: "70%" }}>
            Explore the latest developments in the world of agricultural
            technology. This article discusses innovations, trends, and modern
            solutions that support efficiency, productivity, and sustainability
            in the agricultural sector.
          </span>
        </div>

        <div style={{ marginTop: 50 }}>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {loadingArticles ? (
              <p>Loading articles...</p>
            ) : articles.length === 0 ? (
              <p>Tidak ada artikel aktif.</p>
            ) : (
              articles.map((article) => (
                <div
                  key={article._id}
                  style={{ cursor: "pointer", width: "100%", minHeight: 100 }}
                  onClick={() =>
                    router.push({
                      pathname: "/article/detailarticle",
                      query: { id: article._id }, // <-- kirim id artikel ke halaman detail
                    })
                  }
                >
                  {/* Gambar */}
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <img
                      src={`http://localhost:4000${
                        article.thumbnail ||
                        article.contentImage ||
                        "/images/default.png"
                      }`}
                      alt={article.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Konten */}
                  <div style={{ width: "100%", marginTop: 30 }}>
                    {/* <div>
                      <span className="HammersmithOne" style={{ fontSize: 24 }}>
                        {article.title}
                      </span>
                    </div> */}
                    <div>
                      <span
                        className="HammersmithOne"
                        style={{
                          fontSize: 24,
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {article.title}
                      </span>
                    </div>
                    <span
                      style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.content.slice(0, 150) + "..."}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        marginTop: 16,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          by {article.author}
                        </p>
                        <time className="text-gray-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                      <div
                        style={{
                          width: 125,
                          height: 30,
                          backgroundColor: "#C4C4C4",
                          borderRadius: 25,
                          marginTop: 6,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} color="black" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 42,
          }}
        >
          <ButtonPrimary width={150} textLabel="READ MORE" />
        </div>
      </div>

      {/* Project Section */}
      <div
        style={{
          backgroundColor: "#F9F9F9",
          width: "100%",
          minHeight: "100px",
          padding: "46px 8%",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <span className="HammersmithOne" style={{ fontSize: 24 }}>
            PROJECT
          </span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <span style={{ width: "80%" }}>
            This project showcases our commitment to integrating advanced
            technology into modern agriculture. By leveraging innovative tools
            and solutions, we aim to improve efficiency, productivity, and
            sustainability on farms. The project highlights practical
            applications of technology, from precision farming and crop
            monitoring to data-driven decision-making, demonstrating how
            innovation can transform agriculture for the better.
          </span>
        </div>

        <div style={{ marginTop: 50 }}>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {loadingProjects ? (
              <p>Loading projects...</p>
            ) : projects.length === 0 ? (
              <p>Tidak ada project selesai.</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  style={{ cursor: "pointer", width: "100%", minHeight: 100 }}
                >
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <img
                      src={`http://localhost:4000${
                        project.thumbnail ||
                        project.contentImage ||
                        "/images/default.png"
                      }`}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ width: "100%", marginTop: 30 }}>
                    <div>
                      <span className="HammersmithOne" style={{ fontSize: 24 }}>
                        {project.title}
                      </span>
                    </div>
                    <span
                      style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {project.content.slice(0, 150) + "..."}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        marginTop: 16,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          Team: {project.team}
                        </p>
                        <p className="text-gray-500">
                          Client: {project.client}
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          <ButtonPrimary width={150} textLabel="MORE PROJECT" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
