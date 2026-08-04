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
    <div className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-3.5 sm:p-4 text-white w-full">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#1f1f23]">
        <h2 className="text-sm font-semibold text-white">My Tickets</h2>

        <div className="relative w-full max-w-[200px]">
          <input
            type="text"
            placeholder="Search Ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#09090b] text-[10.5px] text-white placeholder-[#71717a] rounded-full pl-3.5 pr-8 py-1.25 border border-[#27272a] focus:outline-none focus:border-[#3f3f46]"
          />
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-1">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="text-[10.5px] text-[#71717a] border-b border-[#1f1f23]/60">
              <th className="py-2.5 font-normal w-[12%]">ID</th>
              <th className="py-2.5 font-normal w-[58%]">Subject</th>
              <th className="py-2.5 font-normal text-center w-[15%]">Status</th>
              <th className="py-2.5 font-normal text-right w-[15%]">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {filteredTickets.map((ticket) => {
              const isResolved = ticket.status.toLowerCase() === "resolved";

              return (
                <tr key={ticket.id} className="text-[11px] hover:bg-[#18181b]/50 transition-colors">
                  <td className="py-2.5 text-white font-medium">{ticket.id}</td>

                  <td className="py-2.5 text-[#e4e4e7] font-normal">{ticket.subject}</td>

                  <td className="py-2.5 text-center">
                    <span
                      className={`inline-block text-[9.5px] font-medium px-2.5 py-0.5 rounded-full ${
                        isResolved
                          ? "bg-[#052e16] text-[#22c55e] border border-[#14532d]/40"
                          : "bg-[#451a03] text-[#f59e0b] border border-[#78350f]/40"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

        
                  <td className="py-2.5 text-right text-white font-medium">{ticket.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}