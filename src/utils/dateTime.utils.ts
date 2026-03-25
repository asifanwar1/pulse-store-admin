import dayjs, { Dayjs } from "dayjs";

import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

export const dateTimeFormat = {
    appDateTimeFormat: "DD/MM/YYYY, HH:mm a",
    appDateFormat: "DD-MM-YYYY",
    dateFormatMMDDYYY: "MM/DD/YYYY",
    americanFormat: "MM/DD/YYYY",
    americanFormatWithDay: "dddd, MM/DD/YYYY",
    apiDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    bookingDateTimeFormat: "MM/DD/YYYY hh:mm:ss A",
    apiDateFormat: "YYYY-MM-DD",
    gmtDateTimeFormat: "YYYY-MM-DD HH:mm",
    creationDateFormat: "MMM DD, YYYY",
    apiTimeFormat: "HH:mm:ss",
    appTimeFormat: "HH:mm",
    payoutDateQuery: "YYYY-MM",
    timeFormat: "hh:mm A",
    detailedFormat: "MMM D, YYYY",
    rangeFormat: "MMM. DD, YYYY",
    dateWithTimeFormat: "MMM  Do, h:mm A",
    dateWithYearTimeFormat: "MMM  Do YYYY, h:mm A",
    scheduleDateFormat: "DD/MMM/YYYY",
    scheduleDateTimeFormat: "DD/MMM/YYYY    hh:mm A",
};

export type calendarDateType = {
    startTime: Dayjs;
    endTime: Dayjs;
    currentDay: Dayjs;
};

export const getFullYear = (date: Date | string) => {
    return new Date(date).getFullYear();
};

export const getShortMonth = (date: Date | string) => {
    return new Date(date).toLocaleString("default", { month: "short" });
};

export const getFormattedDate = (date: Date | string) => {
    if (!date) return "-";
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${month}/${day}/${year}`;
};

export const convertDateTime = ({
    date,
    dateOnly = true,
    customFormat = null,
    utc = false,
}: any) => {
    const format = customFormat
        ? customFormat
        : dateOnly
          ? dateTimeFormat.creationDateFormat
          : dateTimeFormat.apiDateTimeFormat;

    if (date !== undefined && date !== null) {
        return utc
            ? dayjs(date).utc().format(format)
            : dayjs(date).local().format(format);
    } else {
        return null;
    }
};

export const formatVideoTime = (t: number) => {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t % 3600) / 60);
    const seconds = Math.floor(t % 60);

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds,
        ).padStart(2, "0")}`;
    } else {
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
};

export const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatDateToApiDate = (
    date?: Date | string,
    mode?: "startOf" | "endOf",
    utc: boolean = false,
): string | undefined => {
    if (!date) return undefined;
    let d = dayjs(date);
    if (mode === "startOf") d = d.startOf("day");
    if (mode === "endOf") d = d.endOf("day");
    return convertDateTime({
        date: d.toDate(),
        customFormat: dateTimeFormat.apiDateTimeFormat,
        utc: utc,
    }) as string;
};

export function GetDayTimeDifference(previousDate: any): string {
    let current = new Date();
    let previous = new Date(previousDate);
    let milliseconds = current.getTime() - previous.getTime();

    if (milliseconds < 1) {
        return `Just Now`;
    }

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    if (years > 0 || months > 0) {
        return (
            convertDateTime({
                date: previousDate,
                dateOnly: false,
                customFormat: dateTimeFormat.creationDateFormat,
            }) || "-"
        );
    } else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
}

export function to12Hour(time: string): string {
    const [hStr, mStr] = (time || "").split(":");
    let h = Number(hStr);
    const m = Number(mStr);
    if (Number.isNaN(h) || Number.isNaN(m)) return time;
    const am = h < 12 || h === 24;
    h = h % 12;
    if (h === 0) h = 12;
    const mm = String(m).padStart(2, "0");
    const hh = String(h).padStart(2, "0");
    return `${hh}:${mm} ${am ? "AM" : "PM"}`;
}

export function timeToMinutes(t: string): number {
    const [h, m] = t.split(":").map((n) => Number(n));
    return h * 60 + m;
}

export const formatTime12h = (date: Date | string) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatTimeRange12h = (startISO: string, endISO: string) => {
    const start = formatTime12h(startISO);
    const end = formatTime12h(endISO);
    return `${start} - ${end}`;
};

export const formatDateToYearMonthDay = (date: Date | string) => {
    if (!date) return "-";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const formatDateToYearMonthDayWithSlash = (date: Date | string) => {
    if (!date) return "-";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
};

export const convertTimeToUTCDateString = (time: string) => {
    const today = dayjs().format("YYYY-MM-DD");

    const localTime = dayjs(`${today}T${time}:00`);

    const utcTime = localTime.local().utc();

    return utcTime.toISOString();
};

export const convertSecondtoHours = (seconds: number) => {
    return seconds / 3600;
};

export function toIsoTime(time: string): string {
    const today = dayjs().format("YYYY-MM-DD");
    const localTime = dayjs(`${today}T${time}:00`);
    const utcTime = localTime.local().utc();
    return utcTime.toISOString();
}

export const convertDateToISOString = (date?: string | Date | null): string => {
    if (!date) return "";
    return dayjs(date).utc().toISOString();
};

export const clampDateInput = (e: React.FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    let v = el.value.replace(/[^\d-]/g, "").slice(0, 10);
    let [y = "", m = "", d = ""] = v.split("-");
    y = y.slice(0, 4);
    m = m.slice(0, 2);
    d = d.slice(0, 2);
    el.value = [y, m, d].filter(Boolean).join("-");
};

export const toTimePickerValue = (time: string) => {
    if (!time) return "";
    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!match) return "";
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    const ampm = match[3]?.toUpperCase();
    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minute}`;
};

export const formatScheduleTime = (isoTime: string | null | undefined) => {
    if (!isoTime) return "";
    const date = new Date(isoTime);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minStr = minutes.toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minStr} ${ampm}`;
};

export const formatApiDateAndTime = (isoString: string | Date) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
};

export const combineDateAndTimeToUtcIso = (date: string, time: string) => {
    const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i);
    if (!match) return "";
    let [_, hourStr, minStr, period] = match;
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    if (period) {
        period = period.toUpperCase();
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
    }
    return dayjs(
        `${date}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`,
    )
        .utc()
        .toISOString();
};

export function convertToDecimalHours(hours: number, minutes: number): number {
    if (isNaN(hours)) hours = 0;
    if (isNaN(minutes)) minutes = 0;
    return +(hours + minutes / 60).toFixed(2);
}

export function convertToHoursAndMinutes(decimalHours: number): {
    hours: number;
    minutes: number;
} {
    if (isNaN(decimalHours) || decimalHours < 0)
        return { hours: 0, minutes: 0 };
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return { hours, minutes };
}
