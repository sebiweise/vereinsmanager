import { type ClassValue, clsx } from "clsx"
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function helperDateRange(year: string | null, range: string | null) {
  const currentDate = new Date();

  const targetYear = year ? parseInt(year, 10) : currentDate.getFullYear() - 1;
  let startDate: Date = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0));
  let endDate: Date = new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59));

  if (range) {
    const [rawStartDate, rawEndDate] = range.split("-");

    if (rawStartDate) {
      const [day, month, year] = rawStartDate.split(".").map(Number);
      if (day !== undefined && month !== undefined && year !== undefined) {
        startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      }
    }

    if (rawEndDate) {
      const [day, month, year] = rawEndDate.split(".").map(Number);
      if (day !== undefined && month !== undefined && year !== undefined) {
        endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
      }
    }
  }

  return { startDate, endDate };
}

export function formatToDateRange(dateRange: DateRange): string {
  const from = dateRange.from?.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const to = dateRange.to?.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const range = `${from}-${to}`;

  return range;
}

export function formatDate(date: string | Date, short: boolean = false): string {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  if (short) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day}. ${monthNames[month - 1]}`;
  }

  return `${day}.${month.toString().padStart(2, '0')}.${year}`;
}