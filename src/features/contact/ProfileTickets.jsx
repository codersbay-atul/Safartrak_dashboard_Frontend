import React, { useState } from "react";
import { Search } from "lucide-react";

const DEFAULT_TICKETS = [
  {
    id: "#1042",
    subject: "GPS not reporting on truck KA-04-1123",
    status: "Resolved",
    updated: "July 22",
  },
  {
    id: "#1039",
    subject: "Report export missing last week's data",
    status: "In Progress",
    updated: "July 18",
  },
];

export default function ProfileTickets({ tickets = DEFAULT_TICKETS }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-5 text-white w-full">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1f1f23]">
        <h2 className="text-sm font-semibold text-white">My Tickets</h2>

        {/* Search Input */}
        <div className="relative w-full max-w-[220px]">
          <input
            type="text"
            placeholder="Search Ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#09090b] text-[11px] text-white placeholder-[#71717a] rounded-full pl-4 pr-8 py-1.5 border border-[#27272a] focus:outline-none focus:border-[#3f3f46]"
          />
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="text-[11px] text-[#71717a] border-b border-[#1f1f23]/60">
              <th className="py-3 font-normal w-[12%]">ID</th>
              <th className="py-3 font-normal w-[58%]">Subject</th>
              <th className="py-3 font-normal text-center w-[15%]">Status</th>
              <th className="py-3 font-normal text-right w-[15%]">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {filteredTickets.map((ticket) => {
              const isResolved = ticket.status.toLowerCase() === "resolved";

              return (
                <tr key={ticket.id} className="text-xs hover:bg-[#18181b]/50 transition-colors">
                  {/* ID */}
                  <td className="py-4 text-white font-medium">{ticket.id}</td>

                  {/* Subject */}
                  <td className="py-4 text-[#e4e4e7] font-normal">{ticket.subject}</td>

                  {/* Status Pill */}
                  <td className="py-4 text-center">
                    <span
                      className={`inline-block text-[10px] font-medium px-3 py-0.5 rounded-full ${
                        isResolved
                          ? "bg-[#052e16] text-[#22c55e] border border-[#14532d]/40"
                          : "bg-[#451a03] text-[#f59e0b] border border-[#78350f]/40"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  {/* Updated Date */}
                  <td className="py-4 text-right text-white font-medium">{ticket.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}