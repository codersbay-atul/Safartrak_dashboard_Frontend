import {
  getTripSchedules as getTripSchedulesRequest,
  getTripSchedulesSummary as getTripSchedulesSummaryRequest,
  createTripSchedule as createTripScheduleRequest,
} from "../api/tripSchedulesApi";
import { mapAssignVehicleTrips } from "../features/assignVehicle/assignVehicleData";

export async function getTripSchedulesList(params = {}) {
  const payload = await getTripSchedulesRequest(params);
  const trips = mapAssignVehicleTrips(payload);
  return {
    ...payload,
    trips,
    results: trips,
    total: Number(payload.total ?? trips.length),
    count: trips.length,
  };
}

export async function getTripSchedulesSummary() {
  const payload = await getTripSchedulesSummaryRequest();
  return {
    tripCount: Number(payload.tripCount ?? payload.trip_count ?? 0),
    totalKm: Number(payload.totalKm ?? payload.total_km ?? 0),
    tempCompliancePct: payload.tempCompliancePct ?? payload.temp_compliance_pct ?? "100%",
    total: Number(payload.total ?? 0),
  };
}

export function createTripSchedule(payload) {
  return createTripScheduleRequest(payload);
}
