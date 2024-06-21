const CheckIcon = ({
  color = "var(--color-primary-800)",
  width = 32,
  height = 32,
}: {
  color?: string;
  width?: number;
  height?: number;
  className?: string
}) => (
  <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
      fill={color}
    />
  </svg>
);

export default CheckIcon;
