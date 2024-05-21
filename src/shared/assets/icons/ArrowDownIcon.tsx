const ArrowDownIcon = ({
  color = "var(--color-primary-800)",
  width = 32,
  height = 32,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
      fill={color}
    />
  </svg>
);

export default ArrowDownIcon;
