import { useState } from "react";
import { Link } from "react-router-dom";
import {
 Cloud,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import loginHero from "../../assets/images/Login.png";
import logo from "../../assets/images/Logo.svg";

const HERO_FEATURES = [
  { icon: Cloud, label: "99.9% Uptime" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: ShieldCheck, label: "Enterprise Grade Security" },
];

function SafarTrakWordmark({ className = "" }) {
  return (
   <img
   src={logo}
   alt="SafarTrak"
   className={`h-5 w-auto ${className}`}
 />
  );
}

function AuthHero() {
  return (
   <div className="relative hidden md:block md:w-[58%] h-[min(700px,calc(100vh-96px))] rounded-[24px] overflow-hidden shrink-0 border border-white/15">
      <img
        src={loginHero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-8 lg:p-10">
        <div className="max-w-[500px]">
          <h2 className="text-[30px] font-bold text-white leading-[1.05] tracking-tight">
            Smart Fleet
            <br />
            Better <span className="text-[#F5B700]">Operations</span>
          </h2>
          <p className="mt-4 text-[14px] lg:text-[15px] text-[#c4c4c8] leading-relaxed max-w-[500px]">
            SafarTrak helps you track, monitor and optimize your entire fleet in
            real time - all from one powerful platform.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md px-4 py-3 lg:px-5 lg:py-4">
          {HERO_FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-1 items-center gap-2 min-w-0"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Icon size={15} className="text-[#ffff]" />
              </span>
              <span className="text-[11px] lg:text-[12px] font-medium text-white leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  variant = "centered",
  sectionLabel,
  onClose,
}) {
  if (variant === "split") {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-6 lg:px-8 lg:py-6 select-none">
        <div className="w-full max-w-[1440px] flex items-center justify-center gap-8 lg:gap-14 xl:gap-20">
          <AuthHero />

          <div className="w-full md:w-[42%] flex justify-center md:justify-end lg:justify-center">
            <div className="w-full max-w-[460px] bg-[#111118] rounded-[20px] p-8 sm:p-10 shadow-2xl border border-white/[0.04]">
              <div className="flex items-center justify-between mb-8">
                <SafarTrakWordmark className="text-[20px]" />
                {onClose ? (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717a] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                ) : (
                  // <span
                  //   aria-hidden
                  //   className="flex h-8 w-8 items-center justify-center text-[#71717a]"
                  // >
                  //   <X size={18} />
                  // </span>
                  ""
                )}
              </div>

              <div className="mb-7">
                <h1 className="text-[34px] sm:text-[24px] font-bold text-white tracking-tight leading-tight">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-2 text-[13px] sm:text-[14px] text-[#8b8b93] leading-relaxed">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              {sectionLabel ? (
                <p className="mb-4 text-[15sectionLabelpx] font-semibold text-white">
                  {sectionLabel}
                </p>
              ) : null}

              {children}

              {footer ? (
                <div className="mt-6 text-center text-[12px] text-[#71717a]">
                  {footer}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-8 select-none">
      <div className="w-full max-w-[460px]">
        <div className="bg-[#111118] border border-white/[0.04] rounded-[20px] p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-start mb-7">
            <SafarTrakWordmark className="text-[20px] mb-6" />
            <h1 className="text-[30px] sm:text-[34px] font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-[13px] sm:text-[14px] text-[#8b8b93] mt-2 leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </div>

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-[#a1a1aa]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`auth-field-input w-full h-12 rounded-[10px] bg-[#0A0A0F] border px-3.5 text-[13px] text-white placeholder:text-[#52525b] outline-none transition-colors disabled:opacity-50 focus:bg-[#0A0A0F] ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-rose-500/50 focus:border-rose-400"
              : "border-[#2A2A32] focus:border-[#F5B700]"
          }`}
        />
        {isPassword ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-[10px] text-rose-400">{error}</p> : null}
    </div>
  );
}

export function AuthLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-[#F5B700] hover:text-[#d9a200] font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
