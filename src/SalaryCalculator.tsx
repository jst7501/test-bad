import { useState, useEffect, useRef } from "react";

// =========================================================
// [NEW] 숫자 애니메이션 마법 주문
// =========================================================
function useAnimatedNumber(targetValue: number) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(targetValue);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (targetValue === displayValue) return;
    startValueRef.current = displayValue;
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const duration = 500;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );
      const easedProgress = progress * (2 - progress);
      const nextValue =
        startValueRef.current +
        (targetValue - startValueRef.current) * easedProgress;
      setDisplayValue(nextValue);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setDisplayValue(targetValue);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetValue]);
  return displayValue;
}

// ---------------------------------------------------------
// 1. 데이터 및 설정
// ---------------------------------------------------------
const HOLIDAYS_2025: { [key: string]: string } = {
  "2025-01-01": "신정",
  "2025-01-27": "설날",
  "2025-01-28": "설날",
  "2025-01-29": "설날",
  "2025-01-30": "대체공휴일",
  "2025-03-01": "삼일절",
  "2025-03-03": "대체공휴일",
  "2025-05-05": "어린이날",
  "2025-05-06": "대체공휴일",
  "2025-06-06": "현충일",
  "2025-08-15": "광복절",
  "2025-10-03": "개천절",
  "2025-10-05": "추석",
  "2025-10-06": "추석",
  "2025-10-07": "추석",
  "2025-10-08": "대체공휴일",
  "2025-10-09": "한글날",
  "2025-12-25": "성탄절",
};

const TAX_RATES = { fourMajor: 0.094, freelance: 0.033, none: 0.0 };

const FUN_PRICES = {
  ramen: 1000,
  coffee: 4500,
  chicken: 20000,
  flight: 600000,
  iphone: 1500000,
};
const ICONS = {
  ramen: "🍜",
  coffee: "☕",
  chicken: "🍗",
  flight: "✈️",
  iphone: "📱",
};
const TIERS_MIN = [0, 2000000, 3000000, 4000000];
const TIER_ICONS = ["🥚", "🐥", "🐓", "👑"];

// ---------------------------------------------------------
// [핵심] 국가별 통화 매핑 (언어코드 -> 통화코드)
// ---------------------------------------------------------
const CURRENCY_MAP: any = {
  kr: { code: "KRW", name: "Korea", symbol: "₩" },
  vn: { code: "VND", name: "Vietnam", symbol: "₫" },
  kh: { code: "KHR", name: "Cambodia", symbol: "៛" },
  mm: { code: "MMK", name: "Myanmar", symbol: "Ks" },
  uz: { code: "UZS", name: "Uzbekistan", symbol: "so'm" },
};

// ---------------------------------------------------------
// 2. 다국어 사전
// ---------------------------------------------------------
const DICT: any = {
  kr: {
    hourly: "시급",
    taxType: "세금",
    allowance: "수당/보너스",
    dormitory: "기숙사비",
    advance: "가불금",
    basicPay: "기본급",
    otPay: "잔업수당",
    juhyuPay: "주휴수당",
    taxDeduct: "세금공제",
    totalNet: "실수령액",
    save: "저장",
    close: "닫기",
    basicHour: "기본 8h",
    otHour: "잔업(1.5배)",
    guide: "짧게=8시간 / 길게=시간수정",
    funTitle: "내 월급으로 살 수 있는 것",
    tiers: ["알", "병아리", "닭", "황금닭"],
    items: {
      ramen: "라면",
      coffee: "커피",
      chicken: "치킨",
      flight: "비행기표",
      iphone: "아이폰",
    },
  },
  vn: {
    hourly: "Lương giờ",
    taxType: "Thuế",
    allowance: "Phụ cấp",
    dormitory: "Tiền phòng",
    advance: "Tạm ứng",
    basicPay: "Lương cơ bản",
    otPay: "Tiền tăng ca",
    juhyuPay: "Trợ cấp tuần",
    taxDeduct: "Trừ thuế",
    totalNet: "Thực nhận",
    save: "Lưu",
    close: "Đóng",
    basicHour: "Cơ bản 8h",
    otHour: "Tăng ca (1.5)",
    guide: "Chạm=8h / Giữ=Sửa",
    funTitle: "Bạn có thể mua gì?",
    tiers: ["Trứng", "Gà con", "Gà", "Gà vàng"],
    items: {
      ramen: "Mì gói",
      coffee: "Cà phê",
      chicken: "Gà rán",
      flight: "Vé máy bay",
      iphone: "iPhone",
    },
  },
  kh: {
    hourly: "ប្រាក់ម៉ោង",
    taxType: "ពន្ធ",
    allowance: "ប្រាក់ឧបត្ថម្ភ",
    dormitory: "ថ្លៃឈ្នួលផ្ទះ",
    advance: "បើកលុយមុន",
    basicPay: "ប្រាក់គោល",
    otPay: "ថែមម៉ោង",
    juhyuPay: "ប្រាក់ឈប់សម្រាក",
    taxDeduct: "កាត់ពន្ធ",
    totalNet: "ប្រាក់ទទួលបាន",
    save: "រក្សាទុក",
    close: "បិទ",
    basicHour: "ម៉ោងគោល",
    otHour: "ថែមម៉ោង",
    guide: "ចុចខ្លី=៨ម៉ោង / ចុចយូរ=កែប្រែ",
    funTitle: "តើអ្នកអាចទិញអ្វីបាន?",
    tiers: ["ពង", "កូនមាន់", "មាន់", "មាន់មាស"],
    items: {
      ramen: "មី",
      coffee: "កាហ្វេ",
      chicken: "មាន់បំពង",
      flight: "សំបុត្រយន្តហោះ",
      iphone: "iPhone",
    },
  },
  mm: {
    hourly: "တစ်နာရီလုပ်ခ",
    taxType: "အခွန်",
    allowance: "ထောက်ပံ့ကြေး",
    dormitory: "အဆောင်ခ",
    advance: "ကြိုထုတ်ငွေ",
    basicPay: "အခြေခံလစာ",
    otPay: "အချိန်ပိုကြေး",
    juhyuPay: "ရက်မှန်ကြေး",
    taxDeduct: "အခွန်ဖြတ်",
    totalNet: "စုစုပေါင်းရငွေ",
    save: "သိမ်းမည်",
    close: "ပိတ်မည်",
    basicHour: "ပုံမှန် ၈နာရီ",
    otHour: "အချိန်ပို",
    guide: "တချက်နှိပ်=၈နာရီ / ဖိနှိပ်=ပြင်မည်",
    funTitle: "ဘာတွေဝယ်လို့ရမလဲ",
    tiers: ["ဥ", "ကြက်ပေါက်", "ကြက်", "ရွှေကြက်"],
    items: {
      ramen: "ခေါက်ဆွဲ",
      coffee: "ကော်ဖီ",
      chicken: "ကြက်ကြော်",
      flight: "လေယာဉ်လက်မှတ်",
      iphone: "iPhone",
    },
  },
  uz: {
    hourly: "Soatlik haq",
    taxType: "Soliq",
    allowance: "Bonus",
    dormitory: "Yotoqxona",
    advance: "Avans",
    basicPay: "Asosiy oylik",
    otPay: "Qo'shimcha ish",
    juhyuPay: "Dam olish puli",
    taxDeduct: "Soliq ushlanmasi",
    totalNet: "Qo'lga tegadigan",
    save: "Saqlash",
    close: "Yopish",
    basicHour: "Asosiy 8s",
    otHour: "Qo'shimcha",
    guide: "Bosish=8s / Bosib turish=Tahrirlash",
    funTitle: "Nima sotib olsa bo'ladi?",
    tiers: ["Tuxum", "Jo'ja", "Tovuq", "Oltin Tovuq"],
    items: {
      ramen: "Ramen",
      coffee: "Qahva",
      chicken: "Tovuq",
      flight: "Chipta",
      iphone: "iPhone",
    },
  },
};

interface DayLog {
  basic: number;
  ot: number;
}
interface WorkLog {
  [date: string]: DayLog;
}

export default function SalaryCalculator({ lang }: { lang: string }) {
  const t = DICT[lang] || DICT["kr"];
  const currencyInfo = CURRENCY_MAP[lang] || CURRENCY_MAP["kr"]; // 현재 언어에 맞는 통화 정보

  const [currentDate, setCurrentDate] = useState(new Date());

  const [workLog, setWorkLog] = useState<WorkLog>({});
  const [hourlyWage, setHourlyWage] = useState(10030);
  const [taxMode, setTaxMode] = useState<"fourMajor" | "freelance" | "none">(
    "fourMajor"
  );
  const [dormCost, setDormCost] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [advance, setAdvance] = useState(0);

  // [수정] 모든 환율 정보를 담을 객체
  const [allRates, setAllRates] = useState<any>({});

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tempBasic, setTempBasic] = useState(8);
  const [tempOt, setTempOt] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<any>(null);
  const isLongPress = useRef(false);
  const isPressing = useRef(false);

  // 로컬스토리지 로드 & 환율 API 호출
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

    // [핵심] 모든 통화에 대한 환율 가져오기
    fetch("https://api.exchangerate-api.com/v4/latest/KRW")
      .then((res) => res.json())
      .then((d) => {
        if (d?.rates) setAllRates(d.rates);
      })
      .catch((e) => console.error("Rate Fetch Error", e));

    setIsLoaded(true);
  }, []);

  // 저장
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

  // 계산 로직
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
        const isHoli = HOLIDAYS_2025[k] !== undefined;
        if (day !== 0 && day !== 6 && !isHoli) newLog[k] = { basic: 8, ot: 0 };
      }
      setWorkLog(newLog);
    }
  }, [year, month, isLoaded]);

  const calculate = () => {
    let totalBasic = 0,
      totalOt = 0,
      juhyuCount = 0;
    const weeklyHours = [0, 0, 0, 0, 0, 0];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const k = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      const log = workLog[k];
      if (log) {
        const day = new Date(year, month, d).getDay();
        const isHoli = HOLIDAYS_2025[k] !== undefined;
        const isWeekend = day === 0 || day === 6;
        const wIdx = Math.floor((d + firstDay - 1) / 7);
        const hours = log.basic + log.ot;
        if (isWeekend || isHoli) totalOt += hours * hourlyWage * 1.5;
        else {
          totalBasic += log.basic * hourlyWage;
          totalOt += log.ot * hourlyWage * 1.5;
          weeklyHours[wIdx] += log.basic;
        }
      }
    }
    weeklyHours.forEach((h) => {
      if (h >= 15) juhyuCount++;
    });
    const totalJuhyu = juhyuCount * 8 * hourlyWage;
    const gross = totalBasic + totalOt + totalJuhyu + bonus;
    const tax = Math.floor(gross * TAX_RATES[taxMode]);
    const net = gross - tax - dormCost - advance;
    return { totalBasic, totalOt, totalJuhyu, juhyuCount, tax, net, gross };
  };
  const result = calculate();
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // [환율 계산] 현재 선택된 언어의 통화 코드로 환산
  const targetRate = allRates[currencyInfo.code] || 1;
  const exchangedAmount = Math.floor(result.net * targetRate);

  // 애니메이션 적용
  const animatedNetPay = useAnimatedNumber(result.net);
  const animatedExchangedPay = useAnimatedNumber(exchangedAmount);

  // 계급 계산
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
            <div className="text-lg font-extrabold text-gray-800 transition-all duration-300">
              {t.tiers[tierIdx]}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-400">Est. (KRW)</div>
          <div className="text-2xl font-black tracking-tight text-indigo-600 transition-all">
            {Math.round(animatedNetPay).toLocaleString()}
          </div>
        </div>
      </div>

      {/* 2. 컨트롤 (설정) */}
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

      {/* 3. 달력 */}
      <div className="text-center text-[10px] text-gray-400 mb-2">
        👆 {t.guide}
      </div>
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
          const isHoli = HOLIDAYS_2025[k];
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

      {/* 4. 구매력 (재미) */}
      <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg mb-6 transition-all hover:scale-[1.02]">
        <h3 className="mb-3 text-sm font-bold opacity-90">🛍️ {t.funTitle}</h3>
        <div className="flex flex-col gap-3 pb-2 overflow-x-auto scrollbar-hide">
          {Object.entries(FUN_PRICES).map(([key, price]) => {
            const count = Math.floor(result.net / price);
            return (
              <div
                key={key}
                className="bg-white text-gray-800 p-2 rounded-xl min-w-[70px] flex-shrink-0 flex flex-col items-center shadow-md transition-transform active:scale-95"
              >
                <div className="text-xl">{(ICONS as any)[key]}</div>
                <div className="text-lg font-extrabold text-indigo-600 transition-all">
                  {useAnimatedNumber(count).toFixed(0)}
                </div>
                <div className="text-[9px] text-gray-400 font-bold truncate w-full text-center">
                  {(t.items as any)[key]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 상세 명세서 (하단 고정) */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-5 z-20 max-w-sm mx-auto overflow-y-auto max-h-[40vh] transition-all">
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
            {/* ▼▼▼ 선택된 국가 언어로 표시됨 ▼▼▼ */}
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
