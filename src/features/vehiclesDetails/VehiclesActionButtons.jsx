import React from "react";
import { Eye, Edit, Wrench, Trash2 } from "lucide-react";

export default function VehiclesActionButtons() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
      <button className="bg-[#181c22] hover:bg-[#202630] text-gray-200 border border-gray-800 py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition">
        <Eye className="w-3.5 h-3.5 text-gray-400" />
        Track Live
      </button>
      <button className="bg-[#181c22] hover:bg-[#202630] text-gray-200 border border-gray-800 py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition">
        <Edit className="w-3.5 h-3.5 text-gray-400" />
        Edit Vehicle
      </button>
      <button className="bg-[#181c22] hover:bg-[#202630] text-gray-200 border border-gray-800 py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition">
        <Wrench className="w-3.5 h-3.5 text-gray-400" />
        Schedule Maintenance
      </button>
      <button className="bg-red-600/90 hover:bg-red-600 text-white py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-sm">
        <Trash2 className="w-3.5 h-3.5" />
        Remove Vehicle
      </button>
    </div>
  );
}