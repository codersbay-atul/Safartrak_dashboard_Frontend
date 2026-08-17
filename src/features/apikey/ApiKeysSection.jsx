import React from "react";
import { ShieldCheck } from "lucide-react";
import ApiKeysTable from "./ApiKeysTable";

export default function ApiKeysSection() {
  return (
    <div className="flex flex-col gap-2.5">
      
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-[#F5B700]" />
        <h3 className="text-sm font-semibold text-white">Production Credentials</h3>
      </div>


      <ApiKeysTable />
    </div>
  );
}
