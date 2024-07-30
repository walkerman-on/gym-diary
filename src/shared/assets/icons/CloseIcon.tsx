const CloseIcon = ({
  color = "var(--color-primary-600)",
  width = 40,
  height = 40,
  onClick,
}: {
  color?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "50%",
      borderRadius: "10px",
      height: "50px",
      width: "50px",
      background: "var(--color-primary-400)",
    }}
  >
    <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"
        fill={color}
      />
    </svg>
  </button>

);

export default CloseIcon;
