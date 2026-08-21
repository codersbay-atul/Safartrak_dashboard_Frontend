import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import NavText from './NavTextSize';
import NavTextColor from './NavTextColor';
import userAvatarImg from "../../../assets/images/user.png"

export function NavNotificationIcon({ count = 0, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Notifications"
      className="p-1.5  text-[#a1a1aa] hover:text-white transition-colors relative cursor-pointer shrink-0"
    >
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1.5 leading-4 text-[10px] font-semibold text-white bg-[#ef4444] rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

export default function NavUserAvatar({ 
  avatarUrl = userAvatarImg, 
  initials, 
  name, 
  role, 
  onClick 
}) {
  const [imageError, setImageError] = useState(false);
  const displayName = name ?? '';
  const displayInitials = initials ?? (displayName
    ? displayName
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '');

  const displayRole = role ?? '';

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none select-none shrink-0"
    >
      <div className="w-[30px] h-[30px] rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors flex items-center justify-center overflow-hidden shrink-0">
        {avatarUrl && !imageError ? (
          <img
            src={avatarUrl}
            alt={displayName || "User Avatar"}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full"
          />
        ) : displayInitials ? (
          <span className="w-4 h-4 text-[10px] font-semibold flex items-center justify-center text-white">
            {displayInitials}
          </span>
        ) : (
          <User size={16} />
        )}
      </div>
      {displayName ? (
        <div className="leading-none hidden md:block text-left">
          <NavText as="p" size="profileText" className="truncate">
            <NavTextColor color="navbarText">{displayName}</NavTextColor>
          </NavText>
          <NavText as="p" size="monthText" className="text-[10px] mt-0.5 truncate">
            <NavTextColor color="monthText">{displayRole}</NavTextColor>
          </NavText>
        </div>
      ) : null}
    </button>
  );
}