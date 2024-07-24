const AddIcon = ({
  color = "var(--color-primary-600)",
  width = 30,
  height = 30,
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
        d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
        fill={color}
      />
    </svg>
  </button>

);

export default AddIcon;
