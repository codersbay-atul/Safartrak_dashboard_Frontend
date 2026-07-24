import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AoiHeader from "../features/aoi/AoiHeader";
import AoiStats from "../features/aoi/AoiStats";
import AoiListPanel from "../features/aoi/AoiListPanel";
import AoiMap from "../features/aoi/AoiMap";
import AoiDetailsPanel from "../features/aoi/AoiDetailsPanel";
import { AOI_LIST } from "../features/aoi/aoiData";

export default function Aoi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(AOI_LIST[0]?.id ?? null);

  const filteredAois = AOI_LIST.filter((aoi) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      aoi.name.toLowerCase().includes(query) ||
      aoi.type.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || aoi.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedAoi =
    filteredAois.find((aoi) => aoi.id === selectedId) ||
    AOI_LIST.find((aoi) => aoi.id === selectedId) ||
    null;

  return (
    <MainLayout activeTab="Area of Interest (AOI)">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        <AoiHeader onCreateClick={() => {}} />
        <AoiStats />

        <div className="flex flex-col xl:flex-row gap-3.5 w-full flex-1 min-h-[520px] xl:min-h-0 overflow-hidden">
          <div className="w-full xl:w-[280px] shrink-0 h-[280px] xl:h-full min-h-0 overflow-hidden">
            <AoiListPanel
              aois={filteredAois}
              selectedId={selectedId}
              onSelect={(aoi) => setSelectedId(aoi.id)}
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          <div className="flex-1 min-w-0 h-[320px] xl:h-full min-h-0 overflow-hidden">
            <AoiMap aois={AOI_LIST} selectedAoi={selectedAoi} />
          </div>

          <div className="w-full xl:w-[300px] shrink-0 h-[420px] xl:h-full min-h-0 overflow-hidden">
            <AoiDetailsPanel
              aoi={selectedAoi}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
