const ButtonPrimary = ({
  textColor = "#fff",
  textLabel = "Label",
  height = 40,
  width = 125,
  backgroundColor = "#000",
  size = 14,
  radius = 25,
  click = () => {},
}) => {
  return (
    <div
      style={{
        borderRadius: radius,
        background: backgroundColor,
        height: height,
        width: width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer", // optional: adds pointer cursor
      }}
      onClick={click}
    >
      <span
        style={{
          color: textColor,
          fontSize: size,
          lineHeight: 1, // ✅ ensures vertical alignment is centered
        }}
        className="HammersmithOne"
      >
        {textLabel}
      </span>
    </div>
  );
};

export default ButtonPrimary;
