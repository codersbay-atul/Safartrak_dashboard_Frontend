import { useState } from "react";
import { Link } from "react-router-dom";
import { Cloud, Eye, EyeOff, Lock, ShieldCheck, X, ChevronDown } from "lucide-react";
import loginHero from "../../assets/images/Login.png";
import logo from "../../assets/images/Logo.svg";

const HERO_FEATURES = [
  { icon: Cloud, label: "99.9% Uptime" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: ShieldCheck, label: "Enterprise Grade Security" },
];

function SafarTrakWordmark({ className = "" }) {
  return <img src={logo} alt="SafarTrak" className={`h-5 w-auto ${className}`} />;
}

function AuthHero() {
  return (
    <div className="relative w-full h-[480px] lg:h-[510px] rounded-[24px] overflow-hidden border border-white/10">
      <img src={loginHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 lg:p-7">
        <div className="max-w-[500px]">
          <h2 className="text-[26px] lg:text-[28px] font-bold text-white leading-[1.1] tracking-tight">
            Smart Fleet
            <br />
            Better <span className="text-[#F5B700]">Operations</span>
          </h2>
          <p className="mt-2 text-[12px] lg:text-[13px] text-[#a1a1aa] leading-relaxed">
            SafarTrak helps you track, monitor and optimize your entire fleet in real time - all from one powerful platform.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md p-3">
          {HERO_FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-1 items-center gap-2 min-w-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Icon size={13} className="text-white" />
              </span>
              <span className="text-[11px] font-medium text-white leading-tight truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({ title, subtitle, children, footer, variant = "centered", sectionLabel, onClose }) {
  if (variant === "split") {
    return (
      <div className="min-h-screen w-full bg-[#08080A] text-white flex flex-col px-6 pt-3 pb-6 lg:px-12 lg:pt-4 lg:pb-8 select-none">
        <div className="w-full flex items-center justify-between mb-2 lg:mb-3">
          <SafarTrakWordmark className="h-5" />
          <div className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="hidden md:block md:col-span-8 lg:col-span-8">
              <AuthHero />
            </div>

            <div className="col-span-1 md:col-span-4 lg:col-span-4 flex justify-center md:justify-end">
              <div className="w-full max-w-[420px] bg-[#121218] rounded-[20px] p-6 lg:p-8 shadow-2xl border border-white/[0.06]">
                <div className="flex items-center justify-between mb-6">
                  <SafarTrakWordmark className="h-5" />
                  {onClose ? (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  ) : null}
                </div>

                <div className="mb-6">
                  <h1 className="text-[22px] font-bold text-white tracking-tight">{title}</h1>
                  {subtitle ? <p className="mt-1 text-[13px] text-[#8b8b93] leading-normal">{subtitle}</p> : null}
                </div>

                {sectionLabel ? <p className="mb-4 text-[14px] font-semibold text-white">{sectionLabel}</p> : null}

                {children}

                {footer ? <div className="mt-6 text-center text-[12px] text-[#71717a]">{footer}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#08080A] flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-[420px]">
        <div className="bg-[#121218] border border-white/[0.06] rounded-[20px] p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col items-start mb-6">
            <SafarTrakWordmark className="h-5 mb-6" />
            <h1 className="text-[22px] font-bold text-white tracking-tight">{title}</h1>
            {subtitle ? <p className="text-[13px] text-[#8b8b93] mt-1 leading-normal">{subtitle}</p> : null}
          </div>

          {children}
        </div>

        {footer ? <div className="mt-4 text-center text-[12px] text-[#71717a]">{footer}</div> : null}

        <p className="mt-6 text-center text-[10px] text-[#52525b]">© {new Date().getFullYear()} SafarTrak. All rights reserved.</p>
      </div>
    </div>
  );
}

export function AuthField({ id, label, type = "text", value, onChange, placeholder, autoComplete, disabled, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-[#a1a1aa]">{label}</label>
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
          className={`auth-field-input w-full h-11 rounded-[10px] bg-[#0A0A0F] border px-3.5 text-[13px] text-white placeholder:text-[#52525b] outline-none transition-colors disabled:opacity-50 focus:bg-[#0A0A0F] ${isPassword ? "pr-11" : ""} ${error ? "border-rose-500/50 focus:border-rose-400" : "border-[#2A2A32] focus:border-[#F5B700]"}`}
        />
        {isPassword ? (
          <button type="button" tabIndex={-1} aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer">
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
    <Link to={to} className="text-[#F5B700] hover:text-[#d9a200] font-medium transition-colors">
      {children}
    </Link>
  );
}