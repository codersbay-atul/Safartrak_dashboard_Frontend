import React from "react";
import {
  Gauge,
  Fuel,
  Battery,
  Activity,
  Clock,
  MapPin,
  Radio,
  Zap,
  Navigation,
  AlertCircle,
  Truck,
} from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

export default function VehiclesAndDriverInfo() {
  const vehicleDetails = [
    { label: "Model", value: "Prima 5530" },
    { label: "Year", value: "2024" },
    { label: "VIN Number", value: "MAT4825GH1234567", isMono: true },
    { label: "Engine Number", value: "ENG4825GHN7654321", isMono: true },
    { label: "Color", value: "White" },
    { label: "Vehicle Type", value: "Heavy Truck" },
    { label: "Registration No", value: "MH14AB3248", isAccent: true },
    { label: "Chassis No", value: "CHS4625GHN1234567", isMono: true },
    { label: "Fuel Type", value: "Diesel" },
    { label: "Capacity", value: "12 Tons" },
    { label: "Odometer", value: "45,682 km" },
  ];

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#27272a] p-3.5 rounded-xl flex flex-col min-h-0 overflow-hidden select-none font-sans"
    >
      {/* Fixed Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#27272a] shrink-0 mb-2">
        <div className="flex items-center gap-2">
          <MainLayoutColor color="yellow" as={Truck} className="w-4 h-4 shrink-0" />
          <MainLayoutColor
            as={MainLayoutTextSize}
            color="title"
            size="sectionTitle"
            className="font-medium tracking-tight block"
          >
            Driver & Vehicle Information
          </MainLayoutColor>
        </div>

        {/* Live Status Badge */}
        <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <MainLayoutTextSize size="badgeText" className="font-medium">
            Live Tracking
          </MainLayoutTextSize>
        </span>
      </div>

      {/* Explicit Yellow Scrollbar Container */}
      <div 
        className="flex-1 min-h-0 overflow-y-auto pr-2.5 [scrollbar-width:thin] [scrollbar-color:#ffd60a_#18181b] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#ffd60a] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#e6c200]"
        style={{
          scrollbarColor: "#ffd60a #18181b",
        }}
      >
        <div className="grid grid-cols-2 gap-x-6 items-start py-1">
          {/* Left Side: Vehicle Details */}
          <div className="flex flex-col gap-1.5">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="subInfoText"
              className="font-medium uppercase tracking-wider mb-1 block shrink-0"
            >
              Vehicle Specifications
            </MainLayoutColor>

            {vehicleDetails.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 border-b border-[#27272a]/50 last:border-0"
              >
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium shrink-0"
                >
                  {item.label}
                </MainLayoutColor>

                {item.isAccent ? (
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="yellow"
                    size="subInfoText"
                    className="font-medium text-right truncate"
                  >
                    {item.value}
                  </MainLayoutColor>
                ) : (
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="title"
                    size="subInfoText"
                    className={`font-medium text-right truncate ${
                      item.isMono ? "font-mono text-[#d4d4d8]" : ""
                    }`}
                  >
                    {item.value}
                  </MainLayoutColor>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Live Telematics */}
          <div className="flex flex-col gap-1.5 border-l border-[#27272a] pl-5">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="yellow"
              size="subInfoText"
              className="font-medium uppercase tracking-wider mb-1 block shrink-0"
            >
              Live Telematics
            </MainLayoutColor>

            {/* Speed */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <MainLayoutColor color="yellow" as={Gauge} className="w-3.5 h-3.5 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Speed
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="subInfoText"
                className="font-medium"
              >
                52 km/h
              </MainLayoutColor>
            </div>

            {/* Fuel Level */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Fuel className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Fuel Level
                </MainLayoutColor>
              </span>
              <div className="flex items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="title"
                  size="subInfoText"
                  className="font-medium"
                >
                  82%
                </MainLayoutColor>
                <div className="w-12 bg-[#27272a] h-1.5 rounded-full overflow-hidden shrink-0">
                  <div className="bg-emerald-400 h-full w-[82%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Battery className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Battery
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="subInfoText"
                className="font-medium"
              >
                12.8V
              </MainLayoutColor>
            </div>

            {/* Engine Health */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Engine Health
                </MainLayoutColor>
              </span>
              <MainLayoutTextSize
                size="subInfoText"
                className="font-medium text-emerald-400"
              >
                Excellent
              </MainLayoutTextSize>
            </div>

            {/* Trip Progress */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <MainLayoutColor color="yellow" as={Clock} className="w-3.5 h-3.5 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Trip Progress
                </MainLayoutColor>
              </span>
              <div className="flex items-center gap-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="title"
                  size="subInfoText"
                  className="font-medium"
                >
                  72%
                </MainLayoutColor>
                <div className="w-12 bg-[#27272a] h-1.5 rounded-full overflow-hidden shrink-0">
                  <MainLayoutColor
                    as="div"
                    background="yellow"
                    className="h-full w-[72%] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* ETA */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  ETA
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="subInfoText"
                className="font-medium"
              >
                1 hr 24 min
              </MainLayoutColor>
            </div>

            {/* Current Address */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Current Address
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="title"
                size="subInfoText"
                className="font-medium truncate max-w-[130px] text-right"
                title="Andheri East, Mumbai"
              >
                Andheri East, Mumbai
              </MainLayoutColor>
            </div>

            {/* GPS Signal */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  GPS Signal
                </MainLayoutColor>
              </span>
              <MainLayoutTextSize
                size="subInfoText"
                className="font-medium text-emerald-400"
              >
                Strong
              </MainLayoutTextSize>
            </div>

            {/* Ignition */}
            <div className="flex items-center justify-between py-1 border-b border-[#27272a]/50">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Ignition
                </MainLayoutColor>
              </span>
              <MainLayoutTextSize
                size="subInfoText"
                className="font-medium text-emerald-400"
              >
                ON
              </MainLayoutTextSize>
            </div>

            {/* Last Updated */}
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#71717a] shrink-0" />
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="subtitle"
                  size="subInfoText"
                  className="font-medium"
                >
                  Last Updated
                </MainLayoutColor>
              </span>
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="font-medium"
              >
                12 sec ago
              </MainLayoutColor>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutColor>
  );
}