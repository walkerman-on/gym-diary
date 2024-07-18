const AddIcon = ({
  color = "var(--color-primary-600)",
  width = 40,
  height = 40,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
      fill={color}
    />
  </svg>
);

export default AddIcon;
