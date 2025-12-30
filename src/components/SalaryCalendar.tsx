import type { WorkLog } from "../types";
import { HOLIDAYS } from "../constants";

interface Props {
  year: number;
  month: number;
  workLog: WorkLog;
  onDateClick: (dateKey: string) => void;
}

export default function SalaryCalendar({
  year,
  month,
  workLog,
  onDateClick,
}: Props) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIdx = new Date(year, month, 1).getDay();
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-1 mb-4 select-none">
      {/* 요일 헤더 */}
      {DAYS.map((d, i) => (
        <div
          key={d}
          className={`text-center text-xs font-bold py-1 ${
            i === 0
              ? "text-red-500"
              : i === 6
              ? "text-blue-500"
              : "text-gray-400"
          }`}
        >
          {d}
        </div>
      ))}

      {/* 빈 칸 채우기 */}
      {Array.from({ length: firstDayIdx }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {/* 날짜 그리드 */}
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const d = i + 1;
        const k = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          d
        ).padStart(2, "0")}`;
        const log = workLog[k];
        const isHoli = !!HOLIDAYS[k];
        const dayOfWeek = (firstDayIdx + i) % 7;

        // 스타일 로직...
        let style = "bg-white border-gray-200";
        if (log)
          style =
            log.ot > 0
              ? "bg-orange-100 border-orange-300 ring-1 ring-orange-200"
              : "bg-blue-50 border-blue-200";
        else if (dayOfWeek === 0 || isHoli) style = "bg-red-50 border-red-100";

        return (
          <div
            key={d}
            onClick={() => onDateClick(k)}
            className={`h-12 border rounded-lg flex flex-col items-center justify-center relative active:scale-95 transition cursor-pointer shadow-sm ${style}`}
          >
            <span
              className={`text-sm font-bold ${
                isHoli || dayOfWeek === 0
                  ? "text-red-500"
                  : dayOfWeek === 6
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              {d}
            </span>
            {log && (log.basic > 0 || log.ot > 0) && (
              <div className="flex gap-0.5 mt-1">
                {log.basic > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
                {log.ot > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
