import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Lock,
  Unlock,
  ArrowDown,
} from "lucide-react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import { getCommands } from "../../api/mobilizeApi";

const getStatusBadge = (status) => {
  const normalized = String(status || "").toLowerCase();

  switch (normalized) {
    case "completed":
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#092918] text-[#10b981]">
          Completed
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#362005] text-[#f59e0b]">
          Pending
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#331114] text-[#ef4444]">
          Failed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1f2937] text-[#d4d4d8]">
          {String(status || "Unknown")}
        </span>
      );
  }
};

const COMMAND_OPTIONS = [
  { label: "All commands", value: "All commands" },
  { label: "Immobilize", value: "Immobilize" },
  { label: "Mobilize", value: "Mobilize" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "All Status" },
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

const normalizeCommandRow = (row = {}, index) => {
  const action = String(row.action || row.command || row.type || "").toLowerCase();
  const status = row.status || row.state || row.command_status || "Unknown";
  const vehicle = row.vehicle || row.vehicle_number || row.unique_id || row.plate || "Unknown";
  const requestedAt =
    row.requested_at || row.created_at || row.requestedAt || "-";
  const requestedBy = row.requested_by || row.requestedBy || row.user || "-";
  const executionTime =
    row.execution_time || row.duration || row.executionTime || "--";

  const command = action === "immobilize" ? "Immobilize" : "Mobilize";
  const type = action === "mobilize" ? "mobilize" : "immobilize";

  return {
    id: row.id || row.command_id || `${action}-${index}`,
    vehicle,
    command,
    type,
    requestedAt,
    requestedBy,
    executionTime,
    status,
  };
};

export default function CommandHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommand, setSelectedCommand] = useState("All commands");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = { limit: 50 };
        if (selectedCommand !== "All commands") {
          params.action = selectedCommand.toLowerCase();
        }
        if (selectedStatus !== "All Status") {
          params.status = selectedStatus.toLowerCase();
        }

        const response = await getCommands(params);
        setHistoryData(response.map(normalizeCommandRow));
      } catch (err) {
        setError(err?.message || "Unable to load command history.");
        setHistoryData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [selectedCommand, selectedStatus]);

  const filteredRows = useMemo(() => {
    return historyData.filter((row) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        !search ||
        row.vehicle.toLowerCase().includes(search) ||
        row.requestedBy.toLowerCase().includes(search);

      return matchesSearch;
    });
  }, [historyData, searchTerm]);

  return (
    <div className="w-full min-h-full text-white font-sans">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white tracking-tight mb-1">
            Command History
          </h1>
          <p className="text-xs text-[#71717a]">
            Remotely control supported vehicles and monitor command execution.
          </p>
        </div>

        <div className="w-full bg-[#141416] border border-[#222226] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-white">
              Command History
            </h2>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="w-full sm:w-auto">
                <MainDropDown
                  label="All commands"
                  options={COMMAND_OPTIONS}
                  selectedValue={selectedCommand}
                  onSelect={setSelectedCommand}
                  className="min-w-[160px]"
                />
              </div>

              <div className="w-full sm:w-auto">
                <MainDropDown
                  label="All Status"
                  options={STATUS_OPTIONS}
                  selectedValue={selectedStatus}
                  onSelect={setSelectedStatus}
                  className="min-w-[160px]"
                />
              </div>

              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search Vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-55 bg-[#0c0c0e] border border-[#222226] text-xs text-white placeholder-[#71717a] rounded-xl pl-3.5 pr-9 py-2.5 focus:outline-none focus:border-[#3f3f46]"
                />
                <Search className="w-4 h-4 text-[#71717a] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222226] text-[#71717a] text-xs font-medium">
                  <th className="py-3.5 px-6">Vehicle</th>
                  <th className="py-3.5 px-6">Command</th>
                  <th className="py-3.5 px-6 cursor-pointer">
                    <div className="flex items-center gap-1.5">
                      <span>Requested at</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6">Requested by</th>
                  <th className="py-3.5 px-6">Execution Time</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f23] text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 px-6 text-center text-[#71717a]">
                      Loading command history...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="py-8 px-6 text-center text-[#fca5a5]">
                      {error}
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 px-6 text-center text-[#71717a]">
                      No command history matches your filters.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#1a1a1e]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">{row.vehicle}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {row.type === "immobilize" ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-[#ef4444]" />
                              <span className="text-[#ef4444] font-medium">{row.command}</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5 text-[#10b981]" />
                              <span className="text-[#10b981] font-medium">{row.command}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#d4d4d8]">{row.requestedAt}</td>
                      <td className="py-4 px-6 text-[#d4d4d8]">{row.requestedBy}</td>
                      <td className="py-4 px-6 text-[#d4d4d8]">{row.executionTime}</td>
                      <td className="py-4 px-6">{getStatusBadge(row.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}