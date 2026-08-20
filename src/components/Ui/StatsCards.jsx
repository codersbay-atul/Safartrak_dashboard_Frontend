import { ArrowRight } from "lucide-react";
import MainLayoutColor from "./MainLayoutUI/MainLayoutColor";

export const StatCard = ({ value, subtitle, title, bottomLabel, bgIcon = "bg-[#ffd60a]/10 border border-[#ffd60a]/20", colorIcon = "text-[#ffd60a]", icon: Icon, isDot = false, dotColor = "", showArrow = false, sideMetrics = [], onClick }) => {
  const footerText = bottomLabel || title;
  return (
    <MainLayoutColor as="div" background="surface" onClick={onClick} className="border border-[#1d1d20] rounded-xl p-2 min-[1152px]:p-2.5 flex flex-col justify-between hover:border-[#27272a] transition-all relative overflow-hidden group cursor-pointer w-full h-full min-h-[76px] min-w-0">
      <div className="flex-1 flex items-center min-h-0"><div className="flex items-center justify-between gap-1.5 min-w-0 w-full"><div className="flex items-center gap-2 min-w-0"><div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${bgIcon}`}>{isDot ? <span className={`w-2 h-2 rounded-full ${dotColor}`} /> : Icon && <Icon size={14} className={colorIcon} />}</div><div className="leading-tight min-w-0"><h2 className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight truncate">{value}</h2><p className="text-[10px] text-[#71717a] truncate mt-0.5">{subtitle}</p></div></div>{sideMetrics.length > 0 && <div className="flex flex-col gap-0.5 shrink-0">{sideMetrics.map((metric) => <div key={metric.label} className="flex items-center gap-1 justify-end"><span className={`w-1.5 h-1.5 rounded-sm shrink-0 ${metric.color}`} /><span className="text-[10px] text-[#71717a] whitespace-nowrap">{metric.label}</span></div>)}</div>}</div></div>
      {footerText && <div className="flex items-center justify-between w-full pt-1.5 mt-1 border-t border-[#1d1d20]/40 shrink-0"><span className="text-[12px] font-medium text-[#9D6F00] tracking-wide truncate">{footerText}</span>{showArrow && <ArrowRight size={12} className="text-[#ffd60a] group-hover:translate-x-0.5 transition-transform shrink-0" />}</div>}
    </MainLayoutColor>
  );
};
