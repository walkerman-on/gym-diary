const ArrowLeftIcon = ({
  color = "var(--color-primary-800)",
  width = 36,
  height = 36,
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
      borderRadius: "15px",
      height: "60px",
      width: "60px",
      background: "var(--color-primary-400)",
    }}
  >
    <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
        fill={color}
      />
    </svg>
  </button>
);

export default ArrowLeftIcon;
