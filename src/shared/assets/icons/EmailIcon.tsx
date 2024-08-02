const EmailIcon = ({
  color = "var(--color-accent)",
  width = 30,
  height = 30,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" >
    <path fill={color} d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z" />
  </svg>
);

export default EmailIcon;
