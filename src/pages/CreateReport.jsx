import { useEffect, useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import MainLayoutHeader from "../components/Ui/MainLayoutUI/MainLayoutHeader";
import { getVehiclesList } from "../services/vehicleService";
import { generateReport } from "../services/reportsService";
import ReportResults from "../features/reports/ReportResults";
import { toast } from "../components/Ui/toast";

function formatDateInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function defaultDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  return {
    from: formatDateInput(from),
    to: formatDateInput(to),
  };
}

export default function CreateReport() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [fromTo, setFromTo] = useState(defaultDateRange());
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const payload = await getVehiclesList({ page: 1, page_size: 200 });
        const list = (payload?.results ?? []).map((v) => ({
          label: v.vehicle_number ?? v.plate ?? v.name ?? v.unique_id ?? "",
          value: v.unique_id ?? v.uniqueId,
        }));
        setVehicles(list.filter((x) => x.value));
      } catch (err) {
        console.error("Failed to load vehicles", err);
      }
    })();
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const body = {
        type: "trip",
        from: fromTo.from,
        to: fromTo.to,
        vehicles: vehicle ? [vehicle] : [],
      };

      const res = await generateReport(body);
      setResult(res ?? { rows: [], totals: {}, count: 0 });
    } catch (err) {
      console.error("Generate report failed", err);
      setError(err?.message || "Generate failed");
      toast.error(err?.message || "Generate failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout activeTab="Reports">
      <div className="flex-1 flex flex-col gap-3 min-h-0 p-4">
        <div className="flex items-center justify-between gap-3">
          <MainLayoutHeader
            title="Create Custom Report"
            subtitle="Generate trip reports for selected vehicles and date ranges."
          />
          <div className="flex items-center gap-2">
            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="rounded bg-[#0f1113] border p-2 text-sm">
              <option value="">All Vehicles</option>
              {vehicles.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>

            <input type="date" value={fromTo.from} onChange={(e) => setFromTo((s) => ({ ...s, from: e.target.value }))} className="rounded bg-[#0f1113] border p-2" />
            <input type="date" value={fromTo.to} onChange={(e) => setFromTo((s) => ({ ...s, to: e.target.value }))} className="rounded bg-[#0f1113] border p-2" />

            <button onClick={handleGenerate} className="px-4 py-2 bg-[#FFC107] rounded text-black font-semibold">Generate Report</button>
          </div>
        </div>

        <div className="flex-1">
          <ReportResults title="Trip Report" result={result} isLoading={isLoading} errorMessage={error} />
        </div>
      </div>
    </MainLayout>
  );
}
