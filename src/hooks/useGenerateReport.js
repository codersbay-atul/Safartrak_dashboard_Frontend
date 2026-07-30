import { useMutation } from "@tanstack/react-query";
import { generateReport } from "../services/reportsService";

/**
 * Detect API rejection of unsupported report types (e.g. prediction).
 */
export function isReportTypeUnavailableError(error) {
  if (!error) return false;

  const details = error.details ?? error;
  const typeErrors = details?.type;

  if (Array.isArray(typeErrors)) {
    return typeErrors.some((msg) =>
      String(msg).toLowerCase().includes("not a valid choice")
    );
  }

  if (typeof typeErrors === "string") {
    return typeErrors.toLowerCase().includes("not a valid choice");
  }

  const message = String(error.message ?? details?.message ?? "").toLowerCase();
  return (
    message.includes("not a valid choice") ||
    message.includes("report type currently unavailable")
  );
}

/**
 * React Query mutation: POST /v1/reports/generate
 */
export function useGenerateReport() {
  return useMutation({
    mutationKey: ["reports", "generate"],
    mutationFn: (body) => generateReport(body),
  });
}

export default useGenerateReport;
