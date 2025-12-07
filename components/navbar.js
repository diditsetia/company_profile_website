import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const Navbar = () => {
  return (
    <div style={{ padding: "20px 0px" }}>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
