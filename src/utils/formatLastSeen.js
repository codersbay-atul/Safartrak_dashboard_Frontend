/**
 * Format API last_updated_sec (seconds since last update)
 * into a human-readable "Last Seen …" string.
 *
 * @param {number|string|null|undefined} seconds
 * @returns {string}
 */
export function formatLastSeen(seconds) {
  if (seconds == null || seconds === "" || seconds === "-") {
    return "Not Available";
  }

  const sec = Number(seconds);
  if (Number.isNaN(sec) || sec < 0) return "Not Available";

  const totalMinutes = Math.floor(sec / 60);

  if (totalMinutes <= 0) return "Last Seen Just now";

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];

  if (days > 0) {
    parts.push(`${days} day${days === 1 ? "" : "s"}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} min${minutes === 1 ? "" : "s"}`);
  }

  if (parts.length === 0) return "Last Seen Just now";

  return `Last Seen ${parts.join(" ")} ago`;
}

/** Alias for call sites that prefer this name. */
export const getHumanReadableLastSeen = formatLastSeen;

export default formatLastSeen;
