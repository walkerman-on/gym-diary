const AddIosIcon = ({
  color = "var(--color-accent)",
  width = 30,
  height = 30,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" >
    <g fill={color} >
      <path d="m16 12.75h-8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8c.41 0 .75.34.75.75s-.34.75-.75.75z" />
      <path d="m12 16.75c-.41 0-.75-.34-.75-.75v-8c0-.41.34-.75.75-.75s.75.34.75.75v8c0 .41-.34.75-.75.75z" /><path d="m15 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-6c0-4.61-1.64-6.25-6.25-6.25z" />
    </g>
  </svg>
);

export default AddIosIcon;
