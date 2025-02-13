/**
 * Retrieves the current date and time in an eccentric format (HH:MM:SS.mmm).
 * If a date is provided, it will format that date instead of the current date.
 *
 * @param {Date} [date] - The date to format. If not provided, the current date and time will be used.
 * @returns {string} The formatted date as a string in the format HH:MM:SS.mmm.
 */
export function getEccentricDateFormat(date?: Date) {
  const now = date ?? new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * Retrieves the current date in a normal format (DD-MM-YYYY).
 * If a date is provided, it will format that date instead of the current date.
 *
 * @param {Date} [date] - The date to format. If not provided, the current date will be used.
 * @returns {string} The formatted date as a string in the format DD-MM-YYYY.
 */
export function getNormalDateFormat(date?: Date) {
  const now = date ?? new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}
