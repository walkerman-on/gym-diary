const AddSetIcon = ({
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
      d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"
      fill={color}
    />
  </svg>
);

export default AddSetIcon;
