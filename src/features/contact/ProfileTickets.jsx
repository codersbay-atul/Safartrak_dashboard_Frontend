import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getTickets } from "../../api/ticketsApi";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

function formatStatus(status) {
  if (!status) return "";
  const statusMap = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };
  const key = String(status).toLowerCase();
  if (statusMap[key]) return statusMap[key];
  return String(status)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function mapApiTicket(ticket) {
  if (ticket.updated && !ticket.updated_at && !ticket.created_at) {
    return ticket;
  }
  return {
    id: ticket.id != null ? String(ticket.id) : "",
    subject: ticket.subject || "",
    status: formatStatus(ticket.status),
    updated: formatDate(ticket.updated_at || ticket.created_at),
  };
}

export default function ProfileTickets({ tickets: ticketsProp }) {
  const [ticketList, setTicketList] = useState(() =>
    Array.isArray(ticketsProp) ? ticketsProp.map(mapApiTicket) : []
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (Array.isArray(ticketsProp)) {
      setTicketList(ticketsProp.map(mapApiTicket));
      return;
    }

    let isMounted = true;

    async function fetchTickets() {
      try {
        const response = await getTickets({ page: 1, page_size: 25 });
        const results = Array.isArray(response?.results)
          ? response.results
          : Array.isArray(response)
          ? response
          : [];

        if (isMounted) {
          setTicketList(results.map(mapApiTicket));
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    }

    fetchTickets();

    return () => {
      isMounted = false;
    };
  }, [ticketsProp]);

  const filteredTickets = ticketList.filter(
    (ticket) =>
      (ticket.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      borderHover="cardBorderHover"
      className="border rounded-2xl p-3.5 sm:p-4 text-white w-full transition-all"
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#1f1f23]">
        {/* Header Title -> sectionTitle */}
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-semibold block"
        >
          My Tickets
        </MainLayoutColor>

        {/* Search Input -> searchText */}
        <div className="relative w-full max-w-[200px]">
          <MainLayoutColor
            as={MainLayoutTextSize}
            size="searchText"
            className="w-full block"
          >
            <input
              type="text"
              placeholder="Search Ticket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090b] text-white placeholder-[#71717a] rounded-full pl-3.5 pr-8 py-1.25 border border-[#27272a] focus:outline-none focus:border-[#3f3f46] text-inherit"
            />
          </MainLayoutColor>
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-1">
        <table className="w-full text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="border-b border-[#1f1f23]/60">
              <th className="py-2.5 font-normal w-[12%]">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="metricText">
                  ID
                </MainLayoutColor>
              </th>
              <th className="py-2.5 font-normal w-[58%]">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="metricText">
                  Subject
                </MainLayoutColor>
              </th>
              <th className="py-2.5 font-normal text-center w-[15%]">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="metricText">
                  Status
                </MainLayoutColor>
              </th>
              <th className="py-2.5 font-normal text-right w-[15%]">
                <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="metricText">
                  Updated
                </MainLayoutColor>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {filteredTickets.map((ticket) => {
              const isResolved = (ticket.status || "").toLowerCase() === "resolved";

              return (
                <tr key={ticket.id} className="hover:bg-[#18181b]/50 transition-colors">
                  {/* Table Details -> sectionTitle */}
                  <td className="py-2.5 font-medium">
                    <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle">
                      {ticket.id}
                    </MainLayoutColor>
                  </td>

                  <td className="py-2.5 font-normal">
                    <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle">
                      {ticket.subject}
                    </MainLayoutColor>
                  </td>

                  <td className="py-2.5 text-center">
                    <span
                      className={`inline-block font-medium px-2.5 py-0.5 rounded-full ${
                        isResolved
                          ? "bg-[#052e16] text-[#22c55e] border border-[#14532d]/40"
                          : "bg-[#451a03] text-[#f59e0b] border border-[#78350f]/40"
                      }`}
                    >
                      <MainLayoutTextSize size="badgeText">
                        {ticket.status}
                      </MainLayoutTextSize>
                    </span>
                  </td>

                  <td className="py-2.5 text-right font-medium">
                    <MainLayoutColor as={MainLayoutTextSize} color="title" size="sectionTitle">
                      {ticket.updated}
                    </MainLayoutColor>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MainLayoutColor>
  );
}