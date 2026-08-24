import { NavLink, useLocation } from "react-router-dom";
import {
  IconSettings,
  IconHistory,
  IconLayoutList,
} from "@tabler/icons-react";

import SideColor from "./SideColor";
import SideTextSize from "./SideTextSize";

const workflowItems = [
  {
    label: "Products",
    path: "/your-products/products",
    icon: IconSettings,
  },
  {
    label: "List",
    path: "/your-products/list",
    icon: IconHistory,
  },
  {
    label: "Workflows",
    path: "/your-products/workflows",
    icon: IconLayoutList,
  },
];

export default function SideNavDrawerItem({ onNavigate }) {
  const location = useLocation();

  const selectedIndex = workflowItems.findIndex(
    (item) => location.pathname === item.path,
  );

  return (
    <div className="relative ml-[12px] flex flex-col gap-2 pt-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[4px] top-0 z-20 w-[2px] bg-[#3A3A3F]"
        style={{ height: `${workflowItems.length * 40 - 20}px` }}
      />

      {selectedIndex >= 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4px] top-0 z-50 w-[2px] bg-[#FDB914]"
          style={{ height: `${selectedIndex * 40 + 14}px` }}
        />
      )}

      {workflowItems.map((item, index) => {
        const Icon = item.icon;

        const isSelected = index === selectedIndex;
        /*
         * Only selected item gets background.
         */
        return (
          <div
            key={item.label}
            className="relative h-8"
          >
            {/* =================================================
                SELECTED ROW
            ================================================= */}

            <NavLink
              to={item.path}
              preventScrollReset
              onClick={onNavigate}
              className={`
                absolute
                inset-y-0
                left-[-2px]
                right-0
                z-0
                flex
                items-center
                gap-2
                rounded-md
                pl-[40px]
                pr-2
                bg-transparent
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={15}
                    stroke={1.8}
                    color="#FDB914"
                    className="relative z-[70] shrink-0"
                  />

                  <SideColor
                    as={SideTextSize}
                    color="text"
                    className={`
                      min-w-0
                      truncate
                      ${
                        isActive
                          ? "text-white"
                          : "text-[#B8B8BD]"
                      }
                    `}
                  >
                    {item.label}
                  </SideColor>
                </>
              )}
            </NavLink>


            {/* =================================================
                L SHAPE
            ================================================= */}

            <div
              className={`
                pointer-events-none
                absolute
                left-[4px]
                top-[4px]
                ${isSelected ? "z-[60]" : "z-40"}
                h-[14px]
                w-[22px]
                rounded-bl-[10px]
                border-b-[2px]
                border-l-[2px]
              `}
              style={{
                borderColor: isSelected ? "#FDB914" : "#3A3A3F",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}