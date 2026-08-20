import NavTextSize from "./NavTextSize";


export default function NavMenuItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-[#18181b] rounded-lg transition-colors cursor-pointer ${
        danger ? "text-[#ef4444]" : "text-[#a1a1aa] hover:text-white"
      }`}
    >
      {Icon && <Icon size={16} className={danger ? "text-[#ef4444]" : "text-[#a1a1aa]"} />}
      <NavTextSize size="profileText" className={danger ? "text-[#ef4444]" : ""}>
        {label}
      </NavTextSize>
    </button>
  );
}