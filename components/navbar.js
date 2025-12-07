import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const Navbar = () => {
  return (
    // <div
    //   class="block sm:ml-6 sm:hidden"
    //   style={{
    //     width: "100%",
    //     height: "100vh",
    //     backgroundColor: "#262626",
    //     zIndex: 3,
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       padding: "34px 51px",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <div>
    //       <h1>Logo</h1>
    //       {/* <img src={logo} width="50px" height="50px" /> */}
    //     </div>
    //     <div style={{ marginTop: 100 }} onClick={() => setNavbarMobile(false)}>
    //       <FontAwesomeIcon color="white" size="2x" icon={faClose} />
    //     </div>
    //   </div>
    //   <div style={{ padding: "0px 51px" }}>
    //     <ul style={{}} class="">
    //       <li>
    //         <a
    //           href="#"
    //           //   onClick={(e) => {
    //           //     setNavbarMobile(false);
    //           //     e.preventDefault();
    //           //     handleScrollToHighlight();
    //           //   }}
    //         >
    //           <span
    //             className="HammersmithOne"
    //             style={{ color: "white", fontSize: 20 }}
    //           >
    //             HOME
    //           </span>
    //         </a>
    //       </li>
    //       <div style={{ marginTop: 16 }}></div>
    //       <li>
    //         <a
    //           href="#"
    //           //   onClick={(e) => {
    //           //     setNavbarMobile(false);
    //           //     e.preventDefault();
    //           //     handleScrollToProduct();
    //           //   }}
    //         >
    //           <span
    //             className="HammersmithOne"
    //             style={{ color: "white", fontSize: 20 }}
    //           >
    //             {" "}
    //             PRODUCT
    //           </span>
    //         </a>
    //       </li>
    //       <div style={{ marginTop: 16 }}></div>

    //       <li>
    //         <a
    //           href="#"
    //           //   onClick={(e) => {
    //           //     setNavbarMobile(false);
    //           //     e.preventDefault();
    //           //     handleScrollToJournal();
    //           //   }}
    //         >
    //           <span
    //             className="HammersmithOne"
    //             style={{ color: "white", fontSize: 20, marginTop: 16 }}
    //           >
    //             BLOG
    //           </span>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    // <div style={{ padding: "20px 0px" }}>
    //   <ul style={{ display: "flex", justifyContent: "space-between" }}>
    //     <div
    //       className="block sm:ml-6 sm:hidden"
    //       style={{ alignSelf: "center" }}
    //     >
    //       <div onClick={() => {}}>
    //         <FontAwesomeIcon color="#000" size="2x" icon={faBars} />
    //       </div>
    //     </div>
    //     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //       <div className="flex flex-shrink-0 items-center">
    //         <img
    //           className="block lg:hidden"
    //           src="/images/lumbungmuncul_logo.png"
    //           width="50px"
    //         />
    //         <img
    //           className="hidden lg:block"
    //           src="/images/lumbungmuncul_logo.png"
    //           width="50px"
    //         />
    //       </div>
    //     </div>

    //     <li></li>

    //     <div style={{ display: "flex", gap: 20 }}>
    //       <div className="hidden sm:ml-6 sm:block">
    //         <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
    //           <li>
    //             <a
    //               href="#"
    //               //   onClick={(e) => {
    //               //     e.preventDefault();
    //               //     onHomeClick();
    //               //   }}
    //             >
    //               <span className="HammersmithOne">HOME</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href=""
    //               //   onClick={(e) => {
    //               //     e.preventDefault();
    //               //     onProductClick();
    //               //   }}
    //             >
    //               <span className="HammersmithOne">ARTICLES</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               //   onClick={(e) => {
    //               //     e.preventDefault();
    //               //     onJournalClick();
    //               //   }}
    //             >
    //               <span className="HammersmithOne">PROJECT</span>
    //             </a>
    //           </li>
    //         </div>
    //       </div>
    //     </div>
    //   </ul>
    // </div>
    <div style={{ padding: "20px 0px" }}>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // ⭐ MENAMBAHKAN INI
        }}
      >
        <div
          className="block sm:ml-6 sm:hidden"
          style={{ alignSelf: "center" }}
        >
          <div onClick={() => {}}>
            <FontAwesomeIcon color="#000" size="2x" icon={faBars} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="block lg:hidden"
              src="/images/lumbungmuncul_logo.png"
              width="50px"
            />
            <img
              className="hidden lg:block"
              src="/images/lumbungmuncul_logo.png"
              width="50px"
            />
          </div>
        </div>

        <li></li>

        <div style={{ display: "flex", gap: 20 }}>
          <div className="hidden sm:ml-6 sm:block">
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <li>
                <a href="#">
                  <span className="HammersmithOne text-[#354d34]">HOME</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="HammersmithOne text-[#354d34]">
                    ARTICLES
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="HammersmithOne text-[#354d34]">PROJECT</span>
                </a>
              </li>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
