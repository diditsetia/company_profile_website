import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faHeart,
  faComment,
  faClose,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTiktok,
  faInstagramSquare,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <div className="hidden  lg:block">
        <div
          style={{
            background: "#262626",
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            padding: "2% 2%",
          }}
        >
          <img
            src="/images/lumbungmuncul_logo.png"
            style={{ height: 70, marginTop: 5 }}
          />
          <div style={{ padding: "0px 8%" }}>
            <div className="">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faSquareInstagram}
                  className="w-6 h-6 cursor-pointer"
                  color="#FFF"
                />
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-6 h-6 cursor-pointer"
                  color="#FFF"
                />
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="w-6 h-6 cursor-pointer"
                  color="#FFF"
                />
              </div>
            </div>
          </div>
          <div>
            <span
              style={{ color: "#fff", fontSize: 18 }}
              className="HammersmithOne"
            >
              OUR COMPANY
            </span>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              About Us
            </p>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              Project
            </p>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              Article
            </p>
          </div>
          <div style={{ padding: "0px 8%" }}>
            <span
              style={{ color: "#fff", fontSize: 18 }}
              className="HammersmithOne"
            >
              INFORMATION
            </span>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              Faq
            </p>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              How To Order
            </p>
            <p style={{ color: "#ADADAD" }} className="HammersmithOne">
              Privacy & Return Policy
            </p>
          </div>
        </div>
      </div>
      <div className="block lg:hidden" style={{ background: "#262626" }}>
        <div
          style={{
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            padding: "1% 1%",
          }}
        >
          <img
            src="/images/lumbungmuncul_logo.png"
            style={{ height: 70, marginTop: 16 }}
          />
        </div>
        <div
          style={{
            // background: "#262626",
            width: "100%",
            minHeight: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <p
            style={{ color: "#fff", fontSize: 18, textAlign: "center" }}
            className="HammersmithOne"
          >
            DUCK DUMBER
          </p> */}
        </div>
        <div
          style={{
            // background: "#262626",
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            padding: "0% 0%",
          }}
        >
          <div className="" style={{ marginTop: "8px" }}>
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faSquareInstagram}
                className="w-6 h-6 cursor-pointer"
                color="#FFF"
              />
              <FontAwesomeIcon
                icon={faYoutube}
                className="w-6 h-6 cursor-pointer"
                color="#FFF"
              />
              <FontAwesomeIcon
                icon={faTiktok}
                className="w-6 h-6 cursor-pointer"
                color="#FFF"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            // background: "#262626",
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            padding: "0% 0%",
            marginTop: 8,
          }}
        >
          <div>
            <span
              style={{ color: "#fff", fontSize: 18 }}
              className="HammersmithOne"
            >
              OUR COMPANY
            </span>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              About Us
            </p>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              All Product
            </p>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              Journal
            </p>
          </div>
        </div>
        <div
          style={{
            // background: "#262626",
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
            paddingBlockEnd: 20,
          }}
        >
          <div>
            <p
              style={{ color: "#fff", fontSize: 18, textAlign: "center" }}
              className="HammersmithOne"
            >
              INFORMATION
            </p>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              Faq
            </p>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              How To Order
            </p>
            <p
              style={{ color: "#ADADAD", textAlign: "center" }}
              className="HammersmithOne"
            >
              Privacy & Return Policy
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          height: 50,
          backgroundColor: "#4A4A4A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="HammersmithOne"
          style={{ fontSize: 14, color: "#FFFFFF" }}
        >
          2025 Lumbung Muncul. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
