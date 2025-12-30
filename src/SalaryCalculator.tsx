import { useState, useEffect, useRef, useMemo } from "react";
import {
  HOLIDAYS,
  DICT,
  CURRENCY_MAP,
  TAX_RATES,
  TIERS_MIN,
  TIER_ICONS,
} from "./constants";
import { useAnimatedNumber } from "./hooks/useAnimatedNumber";
import { PrettyAreaChart2 } from "./RemittanceAnalyzer";

interface DayLog {
  basic: number;
  ot: number;
}
interface WorkLog {
  [date: string]: DayLog;
}
// 급여 히스토리 타입 정의
interface SalaryHistory {
  [monthKey: string]: number; // "YYYY-MM": netPay
}

export default function SalaryCalculator({ lang }: { lang: string }) {
  const t = DICT[lang] || DICT["kr"];
  const currencyInfo = CURRENCY_MAP[lang] || CURRENCY_MAP["kr"];

  const [currentDate, setCurrentDate] = useState(new Date());

  // 데이터 상태
  const [workLog, setWorkLog] = useState<WorkLog>({});
  const [history, setHistory] = useState<SalaryHistory>({}); // [New] 급여 기록

  // 설정 상태
  const [hourlyWage, setHourlyWage] = useState(10030);
  const [taxMode, setTaxMode] = useState<"fourMajor" | "freelance" | "none">(
    "fourMajor"
  );
  const [dormCost, setDormCost] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [advance, setAdvance] = useState(0);

  const [allRates, setAllRates] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tempBasic, setTempBasic] = useState(8);
  const [tempOt, setTempOt] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<any>(null);
  const isLongPress = useRef(false);
  const isPressing = useRef(false);

  // 1. 초기 로드
  useEffect(() => {
    const savedLog = localStorage.getItem("final-work-log");
    if (savedLog) setWorkLog(JSON.parse(savedLog));

    const savedSettings = localStorage.getItem("final-settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setHourlyWage(parsed.wage ?? 10030);
      setTaxMode(parsed.taxMode ?? "fourMajor");
      setDormCost(parsed.dorm ?? 0);
      setBonus(parsed.bonus ?? 0);
      setAdvance(parsed.advance ?? 0);
    }

    // [New] 히스토리 로드
    const savedHistory = localStorage.getItem("salary-history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    fetch("https://api.exchangerate-api.com/v4/latest/KRW")
      .then((res) => res.json())
      .then((d) => {
        if (d?.rates) setAllRates(d.rates);
      })
      .catch((e) => console.error("Rate Fetch Error", e));

    setIsLoaded(true);
  }, []);

  // 2. 데이터 저장 (WorkLog & Settings)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("final-work-log", JSON.stringify(workLog));
    const settings = {
      wage: hourlyWage,
      taxMode: taxMode,
      dorm: dormCost,
      bonus: bonus,
      advance: advance,
    };
    localStorage.setItem("final-settings", JSON.stringify(settings));
  }, [workLog, hourlyWage, taxMode, dormCost, bonus, advance, isLoaded]);

  // 터치 핸들러
  const startPress = (k: string) => {
    isPressing.current = true;
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      if (isPressing.current) {
        isLongPress.current = true;
        openPopup(k);
      }
    }, 500);
  };
  const endPress = (k: string) => {
    if (!isPressing.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    isPressing.current = false;
    if (!isLongPress.current) toggleDay(k);
  };
  const toggleDay = (k: string) => {
    const log = workLog[k];
    const newLog = { ...workLog };
    if (log && (log.basic > 0 || log.ot > 0)) delete newLog[k];
    else newLog[k] = { basic: 8, ot: 0 };
    setWorkLog(newLog);
  };
  const openPopup = (k: string) => {
    if (navigator.vibrate) navigator.vibrate(50);
    const log = workLog[k] || { basic: 8, ot: 0 };
    setSelectedDate(k);
    setTempBasic(log.basic);
    setTempOt(log.ot);
    isPressing.current = false;
  };
  const saveTempLog = () => {
    if (selectedDate) {
      const newLog = { ...workLog };
      if (tempBasic === 0 && tempOt === 0) delete newLog[selectedDate];
      else newLog[selectedDate] = { basic: tempBasic, ot: tempOt };
      setWorkLog(newLog);
      setSelectedDate(null);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 자동 채우기
  useEffect(() => {
    if (!isLoaded) return;
    const hasData = Object.keys(workLog).some((k) => {
      const [y, m] = k.split("-").map(Number);
      return y === year && m === month + 1;
    });
    if (!hasData) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const newLog = { ...workLog };
      for (let d = 1; d <= daysInMonth; d++) {
        const k = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          d
        ).padStart(2, "0")}`;
        const day = new Date(year, month, d).getDay();
        const isHoli = HOLIDAYS[k] !== undefined;
        if (day !== 0 && day !== 6 && !isHoli) newLog[k] = { basic: 8, ot: 0 };
      }
      setWorkLog(newLog);
    }
  }, [year, month, isLoaded]);

  // 계산 로직 (주휴수당 개근 조건 포함)
  const result = useMemo(() => {
    let totalBasic = 0,
      totalOt = 0,
      juhyuCount = 0;
    const weeks = Array.from({ length: 6 }, () => ({
      hours: 0,
      hasAbsence: false,
    }));
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const k = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      const log = workLog[k];
      const day = new Date(year, month, d).getDay();
      const isHoli = HOLIDAYS[k] !== undefined;
      const isWeekend = day === 0 || day === 6;
      const wIdx = Math.floor((d + firstDay - 1) / 7);

      if (log) {
        const hours = log.basic + log.ot;
        if (isWeekend || isHoli) {
          totalOt += hours * hourlyWage * 1.5;
        } else {
          totalBasic += log.basic * hourlyWage;
          totalOt += log.ot * hourlyWage * 1.5;
          weeks[wIdx].hours += log.basic;
        }
      }
      const isMonToFri = day >= 1 && day <= 5;
      const worked = log && log.basic > 0;
      if (isMonToFri) {
        if (!worked && !isHoli) weeks[wIdx].hasAbsence = true;
      }
    }

    weeks.forEach((week) => {
      if (week.hours >= 15 && !week.hasAbsence) juhyuCount++;
    });

    const totalJuhyu = juhyuCount * 8 * hourlyWage;
    const gross = totalBasic + totalOt + totalJuhyu + bonus;
    const tax = Math.floor(gross * TAX_RATES[taxMode]);
    const net = gross - tax - dormCost - advance;

    return { totalBasic, totalOt, totalJuhyu, juhyuCount, tax, net, gross };
  }, [workLog, hourlyWage, taxMode, dormCost, bonus, advance, year, month]);

  // [New] 결과가 나오면 히스토리에 자동 저장
  useEffect(() => {
    if (!isLoaded) return;
    const currentMonthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

    setHistory((prev) => {
      // 값이 변했을 때만 업데이트하여 불필요한 렌더링 방지
      if (prev[currentMonthKey] === result.net) return prev;

      const newHistory = { ...prev, [currentMonthKey]: result.net };
      localStorage.setItem("salary-history", JSON.stringify(newHistory));
      return newHistory;
    });
  }, [result.net, year, month, isLoaded]);

  // -----------------------------------------------------------
  // [New] 그래프 데이터 생성 (최근 6개월)
  // -----------------------------------------------------------
  const graphData = useMemo(() => {
    const data = [];

    const labels = [];
    // ... 기존 데이터 생성 로직 ...
    // 대신 data 배열과 labels 배열을 각각 분리해서 만듭니다.
    for (let i = 5; i >= 0; i--) {
      const d = new Date(year, month - i, 1);
      const m = d.getMonth() + 1;
      const key = `${d.getFullYear()}-${String(m).padStart(2, "0")}`;
      const val = i === 0 ? result.net : history[key] || 0;

      data.push(val);
      labels.push(`${m}월`);
    }
    return { data, labels };
  }, [history, result.net, year, month]);

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const targetRate = allRates[currencyInfo.code] || 1;
  const exchangedAmount = Math.floor(result.net * targetRate);

  const animatedNetPay = useAnimatedNumber(result.net);
  const animatedExchangedPay = useAnimatedNumber(exchangedAmount);

  let tierIdx = 0;
  TIERS_MIN.forEach((min, idx) => {
    if (result.net >= min) tierIdx = idx;
  });

  const firstDayIdx = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="min-h-full p-4 pb-64 bg-gray-50">
      {/* 1. 계급 카드 */}
      <div className="flex items-center justify-between p-4 mb-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="text-4xl animate-bounce-slow">
            {TIER_ICONS[tierIdx]}
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400">Level</div>
            <div className="text-lg font-extrabold text-gray-800">
              {t.tiers[tierIdx]}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-400">Est. (KRW)</div>
          <div className="text-2xl font-black tracking-tight text-indigo-600">
            {Math.round(animatedNetPay).toLocaleString()}
          </div>
        </div>
      </div>

      {/* 2. 설정 */}
      <details className="p-3 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl group">
        <summary className="flex items-center justify-between text-xs font-bold text-gray-500 list-none cursor-pointer">
          <span>
            ⚙️ {t.hourly} / {t.taxType} / {t.allowance}
          </span>
          <span className="transition group-open:rotate-180">▼</span>
        </summary>
        <div className="mt-3 space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[9px] block text-gray-400">
                {t.hourly}
              </label>
              <input
                type="number"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full p-2 font-bold bg-gray-100 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="text-[9px] block text-gray-400">
                {t.taxType}
              </label>
              <select
                value={taxMode}
                onChange={(e: any) => setTaxMode(e.target.value)}
                className="w-full p-2 text-sm font-bold bg-gray-100 rounded"
              >
                <option value="fourMajor">9.4%</option>
                <option value="freelance">3.3%</option>
                <option value="none">0%</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t">
            <div>
              <label className="text-[9px] block text-gray-400">
                {t.allowance}
              </label>
              <input
                type="number"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold text-blue-700 rounded bg-blue-50"
              />
            </div>
            <div>
              <label className="text-[9px] block text-gray-400">
                {t.dormitory}
              </label>
              <input
                type="number"
                value={dormCost}
                onChange={(e) => setDormCost(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold text-red-700 rounded bg-red-50"
              />
            </div>
            <div>
              <label className="text-[9px] block text-gray-400">
                {t.advance}
              </label>
              <input
                type="number"
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
                className="w-full p-2 text-xs font-bold text-red-700 rounded bg-red-50"
              />
            </div>
          </div>
        </div>
      </details>

      {/* 3. 달력 컨트롤 */}
      <div className="flex items-center justify-between px-2 mb-2">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="p-2 bg-white rounded-lg shadow-sm"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold text-gray-800">
          {year}. {month + 1}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="p-2 bg-white rounded-lg shadow-sm"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4 select-none">
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
        {Array.from({ length: firstDayIdx }).map((_, i) => (
          <div key={`e-${i}`}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const k = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            d
          ).padStart(2, "0")}`;
          const log = workLog[k];
          const isHoli = HOLIDAYS[k];
          const day = (firstDayIdx + i) % 7;
          let style = "bg-white border-gray-200";
          if (log) {
            style =
              log.ot > 0
                ? "bg-orange-100 border-orange-300 ring-1 ring-orange-200"
                : "bg-blue-50 border-blue-200";
          } else if (day === 0 || isHoli) style = "bg-red-50 border-red-100";
          return (
            <div
              key={d}
              onMouseDown={() => startPress(k)}
              onMouseUp={() => endPress(k)}
              onMouseLeave={() => endPress(k)}
              onTouchStart={() => startPress(k)}
              onTouchEnd={(e) => {
                e.preventDefault();
                endPress(k);
              }}
              className={`h-12 border rounded-lg flex flex-col items-center justify-center relative active:scale-95 transition cursor-pointer shadow-sm ${style}`}
            >
              <span
                className={`text-sm font-bold ${
                  isHoli || day === 0
                    ? "text-red-500"
                    : day === 6
                    ? "text-blue-500"
                    : "text-gray-700"
                }`}
              >
                {d}
              </span>
              {log && (log.basic > 0 || log.ot > 0) && (
                <div className="flex gap-0.5 mt-1">
                  {log.basic > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  )}
                  {log.ot > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. [NEW] 급여 추이 그래프 (최근 6개월) */}
      <div className="p-5 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-700">
          📊 급여 추이 (최근 6개월)
        </h3>

        {/* 여기에 PrettyAreaChart 적용 */}
        <PrettyAreaChart2
          data={graphData.data}
          labels={graphData.labels}
          color="#4F46E5" // Indigo 색상
          height={140}
        />

        <div className="flex justify-between pt-4 mt-4 text-xs text-gray-500 border-t border-gray-50">
          <span>
            이번 달:{" "}
            <b className="text-indigo-600">{result.net.toLocaleString()}</b>
          </span>
          <span>
            평균:{" "}
            <b>
              {Math.round(
                graphData.data.reduce((a, b) => a + b, 0) / 6
              ).toLocaleString()}
            </b>
          </span>
        </div>
      </div>

      {/* 5. 상세 명세서 (하단 고정) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-5 z-20 max-w-md mx-auto rounded-t-3xl max-h-[40vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 mb-3 border-b">
          <span className="font-bold text-gray-800">{t.totalNet}</span>
          <span className="text-xs font-bold text-green-600">
            1 KRW ≈ {targetRate} {currencyInfo.code}
          </span>
        </div>
        <div className="mb-3 space-y-1 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>{t.basicPay}</span>
            <span className="font-medium">
              {result.totalBasic.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-blue-600">
            <span>{t.otPay}</span>
            <span className="font-medium">
              + {result.totalOt.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-teal-600">
            <span>
              {t.juhyuPay} ({result.juhyuCount})
            </span>
            <span className="font-medium">
              + {result.totalJuhyu.toLocaleString()}
            </span>
          </div>
          {bonus > 0 && (
            <div className="flex justify-between text-indigo-600">
              <span>{t.allowance}</span>
              <span className="font-medium">+ {bonus.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="my-2 border-t border-dashed"></div>
        <div className="mb-4 space-y-1 text-xs">
          <div className="flex justify-between text-red-500">
            <span>{t.taxDeduct}</span>
            <span>- {result.tax.toLocaleString()}</span>
          </div>
          {dormCost > 0 && (
            <div className="flex justify-between text-red-500">
              <span>{t.dormitory}</span>
              <span>- {dormCost.toLocaleString()}</span>
            </div>
          )}
          {advance > 0 && (
            <div className="flex justify-between text-red-500">
              <span>{t.advance}</span>
              <span>- {advance.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between p-3 border border-gray-100 bg-gray-50 rounded-xl">
          <div>
            <span className="block text-xs text-gray-400">{t.totalNet}</span>
            <span className="text-2xl font-extrabold text-gray-900 transition-all">
              {Math.round(animatedNetPay).toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold text-green-600">
              {currencyInfo.name} ({currencyInfo.code})
            </span>
            <span className="text-lg font-bold text-green-700 transition-all">
              {currencyInfo.symbol}{" "}
              {Math.round(animatedExchangedPay).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 팝업 */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="w-5/6 max-w-sm p-6 bg-white rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-center">
              {selectedDate}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-xs font-bold text-gray-500">
                  <span>{t.basicHour}</span>
                  <span className="text-blue-600">{tempBasic}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={tempBasic}
                  onChange={(e) => setTempBasic(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-xs font-bold text-gray-500">
                  <span>{t.otHour}</span>
                  <span className="text-orange-600">+{tempOt}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={tempOt}
                  onChange={(e) => setTempOt(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-orange-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setSelectedDate(null)}
                className="py-3 font-bold text-gray-600 bg-gray-100 rounded-xl"
              >
                {t.close}
              </button>
              <button
                onClick={saveTempLog}
                className="py-3 font-bold text-white bg-blue-600 rounded-xl"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
