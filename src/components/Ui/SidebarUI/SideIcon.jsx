import SideColor from "./SideColor";

export default function SideIcon({ icon: Icon, className = "", ...props }) {
  if (!Icon) return null;

  return (
    <SideColor
      as={Icon}
      color="icon"
      size={17}
      className={`shrink-0 ${className}`.trim()}
      {...props}
    />
  );
}