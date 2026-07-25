import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.svg";

/**
 * Shared dark auth layout matching the SafarTrak dashboard design system.
 */
export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex items-center justify-center px-4 py-8 select-none">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-6">
          <img
            src={Logo}
            alt="SafarTrak"
            className="h-8 w-auto mb-4"
          />
          <h1 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight text-center">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-[12px] text-[#71717a] mt-1.5 text-center">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="bg-[#121214] border border-[#1d1d20] rounded-xl p-5 sm:p-6 shadow-xl">
          {children}
        </div>

        {footer ? (
          <div className="mt-4 text-center text-[12px] text-[#71717a]">
            {footer}
          </div>
        ) : null}

        <p className="mt-6 text-center text-[10px] text-[#52525b]">
          © {new Date().getFullYear()} SafarTrak. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-medium text-[#a1a1aa]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full h-10 rounded-lg bg-[#0B0F19] border px-3 text-[13px] text-white placeholder:text-[#52525b] outline-none transition-colors disabled:opacity-50 ${
          error
            ? "border-rose-500/50 focus:border-rose-400"
            : "border-[#27272a] focus:border-[#FDBB24]/50"
        }`}
      />
      {error ? (
        <p className="text-[10px] text-rose-400">{error}</p>
      ) : null}
    </div>
  );
}

export function AuthLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-[#FDBB24] hover:text-[#e0a31f] font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
