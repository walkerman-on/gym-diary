const ArrowLeftIcon = ({
  color = "var(--color-primary-200)",
  width = 32,
  height = 32,
  onClick,
}: {
  color?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      height: "50px",
      width: "50px",
      background: "var(--color-primary-800)",
    }}
  >
    <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
        fill={color}
      />
    </svg>
  </div>
);

export default ArrowLeftIcon;
