export default function UserAvatar({ initials, name, role, onClick }) {
  const displayName = name ?? "";
  const displayInitials = initials ?? (displayName ? displayName.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2).toUpperCase() : "");
  return <button type="button" onClick={onClick} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none select-none shrink-0"><div className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">{displayInitials}</div>{displayName ? <div className="leading-none hidden md:block text-left"><p className="text-[15px] font-semibold text-white truncate">{displayName}</p><p className="text-[10px] text-[#a1a1aa] mt-0.5 truncate">{role ?? ""}</p></div> : null}</button>;
}
