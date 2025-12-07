// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
// import {
//   faClose,
//   faHeart,
//   faEye,
//   faShare,
//   faBookmark,
//   faComment,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const DetailProjectPage = () => {
//   const router = useRouter();
//   const { id } = router.query; // Ambil id dari query param

//   const [article, setArticle] = useState(null);
//   const [loadingArticle, setLoadingArticle] = useState(true);

//   // Fetch article by ID
//   useEffect(() => {
//     if (!id) return;

//     const fetchArticleById = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/project/${id}`);
//         const data = await res.json();
//         if (res.ok && data.success) {
//           setArticle(data.data);
//         } else {
//           console.error("Gagal mengambil artikel:", data.message);
//         }
//       } catch (err) {
//         console.error("Terjadi kesalahan saat fetch artikel:", err);
//       } finally {
//         setLoadingArticle(false);
//       }
//     };

//     fetchArticleById();
//   }, [id]);

//   if (loadingArticle) return <p>Loading article...</p>;
//   if (!article) return <p>Artikel tidak ditemukan.</p>;

//   return (
//     <div>
//       {/* Navbar */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           padding: "0px 70px",
//           backgroundColor: "white",
//           zIndex: 999,
//         }}
//       >
//         <Navbar />
//       </div>
//       <div
//         style={{
//           // backgroundColor: "#F9F9F9",
//           width: "100%",
//           minHeight: "100px",
//           padding: "0px 10%",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         ></div>
//         <div class="" style={{ marginTop: 125 }}>
//           <div class="">
//             {/* <span className="HammersmithOne" style={{ fontSize: 24 }}>
//                 Highlight
//               </span> */}
//             <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
//               <div
//                 style={{
//                   // backgroundColor: "grey",
//                   width: "100%",
//                   minHeight: 100,
//                 }}
//               >
//                 <span className="HammersmithOne" style={{ fontSize: 24 }}>
//                   {article.title}
//                 </span>
//               </div>
//               <div
//                 style={{
//                   // backgroundColor: "grey",
//                   width: "100%",
//                   minHeight: 100,
//                 }}
//               >
//                 <div style={{}}>
//                   <div
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       justifyContent: "flex-end",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "32px 32px",
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         color="#000000"
//                         size="lg"
//                         icon={faShare}
//                       />
//                       <FontAwesomeIcon
//                         color="#000000"
//                         size="lg"
//                         icon={faBookmark}
//                       />
//                     </div>
//                   </div>

//                   <div style={{ marginTop: 16 }}>
//                     <span className="HammersmithOne" style={{ fontSize: 18 }}>
//                       Author
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <div style={{ display: "flex" }}>
//                       <div
//                         style={{
//                           width: 50,
//                           height: 50,
//                           background: "#D9D9D9",
//                           borderRadius: 25,
//                         }}
//                       ></div>
//                       <div style={{ marginLeft: 16, alignSelf: "center" }}>
//                         <div style={{}}>
//                           <p class="font-semibold text-gray-900">
//                             <a href="#">
//                               <span class="absolute"></span>
//                               by {article.author}
//                             </a>
//                           </p>
//                         </div>
//                         <time datetime="2020-03-16" class="text-gray-500">
//                           {new Date(article.createdAt).toLocaleDateString()}
//                         </time>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: 93,
//                         height: 30,
//                         backgroundColor: "#ffffff",
//                         borderRadius: 25,
//                         marginTop: 6,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignSelf: "center",
//                         boxShadow: "0px 0px 6px rgb(0 0 0 / 0.2)",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 93,
//                           justifyContent: "center",
//                           display: "flex",
//                         }}
//                       >
//                         <span
//                           className="HammersmithOne"
//                           style={{
//                             fontSize: 16,
//                             color: "#000000",
//                           }}
//                         >
//                           Follow
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* </div> */}
//           </div>
//         </div>
//         <div style={{ marginTop: 30 }}>
//           <div style={{ background: "#bfbfbf", width: "100%", minHeight: 400 }}>
//             <div style={{ marginTop: 16, width: "100%", overflow: "hidden" }}>
//               <img
//                 src={`http://localhost:4000${
//                   article.thumbnail ||
//                   article.contentImage ||
//                   "/images/default.png"
//                 }`}
//                 alt={article.title}
//                 style={{ width: "100%", height: "auto", objectFit: "cover" }}
//               />
//             </div>
//           </div>
//           <div style={{ marginTop: 32 }} />
//           <div style={{ marginTop: 32 }}>
//             <p
//               style={{
//                 fontSize: 16,
//                 lineHeight: 1.8,
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {article.content}
//             </p>
//           </div>
//         </div>
//         <div class="" style={{ marginTop: 32 }}>
//           <div class="">
//             {/* <span className="HammersmithOne" style={{ fontSize: 24 }}>
//                 Highlight
//               </span> */}
//             <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
//               <div
//                 style={{
//                   // backgroundColor: "grey",
//                   width: "100%",
//                   minHeight: 100,
//                 }}
//               >
//                 <div style={{ display: "flex" }}>
//                   <div>
//                     <FontAwesomeIcon
//                       color="#000000"
//                       size="lg"
//                       icon={faComment}
//                     />
//                     <span
//                       className="HammersmithOne"
//                       style={{ fontSize: 16, marginLeft: 8 }}
//                     >
//                       10 Comment
//                     </span>
//                   </div>
//                   <div style={{ marginLeft: 16 }}>
//                     <FontAwesomeIcon color="#000000" size="lg" icon={faHeart} />
//                     <span
//                       className="HammersmithOne"
//                       style={{ fontSize: 16, marginLeft: 8 }}
//                     >
//                       20 Like
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 16,
//                   }}
//                 >
//                   <div style={{ display: "flex" }}>
//                     <div
//                       style={{
//                         width: 50,
//                         height: 50,
//                         background: "#D9D9D9",
//                         borderRadius: 25,
//                       }}
//                     ></div>
//                     <div
//                       style={{
//                         marginLeft: 16,
//                         alignSelf: "center",
//                         width: "70%",
//                       }}
//                     >
//                       <div style={{}}>
//                         <p class="font-semibold text-gray-900">
//                           <a href="#">
//                             <span style={{ color: "#ADADAD" }}>by setia</span>
//                           </a>
//                         </p>
//                       </div>
//                       <span className="HammersmithOne" style={{ fontSize: 14 }}>
//                         So Awesome Dude!!!
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 16,
//                   }}
//                 >
//                   <div style={{ display: "flex" }}>
//                     <div
//                       style={{
//                         width: 50,
//                         height: 50,
//                         background: "#D9D9D9",
//                         borderRadius: 25,
//                       }}
//                     ></div>
//                     <div
//                       style={{
//                         marginLeft: 16,
//                         alignSelf: "center",
//                         width: "70%",
//                       }}
//                     >
//                       <div style={{}}>
//                         <p class="font-semibold text-gray-900">
//                           <a href="#">
//                             <span style={{ color: "#ADADAD" }}>by admin</span>
//                           </a>
//                         </p>
//                       </div>
//                       <div style={{}}>
//                         <span
//                           className="HammersmithOne"
//                           style={{ fontSize: 14 }}
//                         >
//                           Lorem Ipsum is simply dummy text of the printing and
//                           typesetting industry. Lorem Ipsum has been the
//                           industry's standard dummy text ever since the 1500s!
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   // backgroundColor: "grey",
//                   width: "100%",
//                   minHeight: 100,
//                 }}
//               >
//                 <div style={{}}>
//                   <div style={{}}>
//                     <span
//                       className="HammersmithOne"
//                       style={{ fontSize: 18, color: "#000000" }}
//                     >
//                       Typing something...
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       marginTop: 16,
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <div style={{ display: "flex" }}>
//                       <div
//                         style={{
//                           width: 50,
//                           height: 50,
//                           background: "#D9D9D9",
//                           borderRadius: 25,
//                         }}
//                       ></div>
//                       <div
//                         style={{ marginLeft: 16, alignSelf: "center" }}
//                       ></div>
//                     </div>
//                     <div
//                       style={{
//                         width: 93,
//                         height: 30,
//                         backgroundColor: "#ffffff",
//                         borderRadius: 25,
//                         marginTop: 6,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignSelf: "center",
//                         boxShadow: "0px 0px 6px rgb(0 0 0 / 0.2)",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 93,
//                           justifyContent: "center",
//                           display: "flex",
//                         }}
//                       >
//                         <span
//                           className="HammersmithOne"
//                           style={{
//                             fontSize: 16,
//                             color: "#000000",
//                           }}
//                         >
//                           Send
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* </div> */}
//           </div>
//         </div>
//         <div style={{ marginTop: 99 }}></div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DetailProjectPage;

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
