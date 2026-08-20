import React from "react";
import { ChevronRight } from "lucide-react";
import NavText from "./NavTextSize";
import TextColor from "./NavTextColor";


export default function NavBreadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 min-w-0" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.onClick ? (
              <NavText
                as="button"
                size="moduleName"
                type="button"
                onClick={item.onClick}
                className="truncate cursor-pointer"
              >
                <TextColor color="monthText" className="hover:text-white transition-colors">
                  {item.label}
                </TextColor>
              </NavText>
            ) : (
              <NavText as="span" size="moduleName" className="truncate">
                <TextColor color="navbarText">{item.label}</TextColor>
              </NavText>
            )}
            {!isLast && <ChevronRight size={14} className="text-[#52525b] shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}