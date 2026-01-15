import { useState, useEffect } from "react";
// 위에서 정의한 SEVERANCE_DICT를 import 했다고 가정하거나 같은 파일에 두세요.
import { SEVERANCE_DICT } from "../../constants";

export default function SeveranceCalculator({ lang }: { lang: string }) {
  // 언어 선택 (기본값 kr)
  const t = SEVERANCE_DICT[lang] || SEVERANCE_DICT["kr"];

  // 오늘 날짜 (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(todayStr);
  const [avgWage, setAvgWage] = useState(2500000);

  const [totalDays, setTotalDays] = useState(0);
  const [severancePay, setSeverancePay] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError(
        lang === "kr"
          ? "퇴사일이 입사일보다 빠릅니다."
          : "End date must be after start date."
      );
      setTotalDays(0);
      setSeverancePay(0);
      return;
    }
    setError("");

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 퇴직금 약식 계산: (3개월 평균임금) * (근속일수 / 365)
    const pay = Math.floor(avgWage * (days / 365));

    setTotalDays(days);
    setSeverancePay(pay > 0 ? pay : 0);
  }, [startDate, endDate, avgWage, lang]);

  return (
    <div className="flex flex-col h-full min-h-screen pb-20 overflow-y-auto bg-gray-50 ">
      {/* 헤더 */}
      <div className="relative px-6 pt-8 pb-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-b-[2.5rem] shadow-lg">
        <div className="text-center text-white">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-2xl rounded-full bg-white/20 backdrop-blur-sm">
            ✈️
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-1 text-sm font-medium text-teal-100 opacity-90">
            {t.subTitle}
          </p>
        </div>
      </div>

      <div className="flex-1 px-5 mt-6 space-y-4">
        {/* 입력 카드 */}
        <div className="p-5 space-y-5 bg-white border border-gray-100 shadow-md rounded-2xl">
          {/* 입사일 */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 pl-1">
              📅 {t.startDate}
            </label>
            <input
              type="date"
              max={todayStr}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-bold outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>

          {/* 퇴사일 */}
          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1">
              <label className="text-xs font-bold text-gray-500">
                📅 {t.endDate}
              </label>
              <button
                onClick={() => setEndDate(todayStr)}
                className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-md font-bold hover:bg-teal-100 transition"
              >
                {t.setToday}
              </button>
            </div>
            <input
              type="date"
              max={todayStr}
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-bold outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>

          {error && (
            <div className="p-2 text-xs text-center text-red-500 rounded-lg bg-red-50 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          <div className="w-full h-px my-2 bg-gray-100"></div>

          {/* 평균 임금 */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 pl-1">
              💰 {t.avgWage}
            </label>
            <div className="relative">
              <input
                type="string"
                value={avgWage > 0 ? avgWage.toLocaleString() : ""}
                onChange={(e) => setAvgWage(Number(e.target.value))}
                className="w-full p-3.5 text-lg font-bold text-right bg-teal-50/50 border border-teal-100 rounded-xl text-teal-900 outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder-gray-300"
                placeholder="2500000"
              />
              <span className="absolute text-sm font-bold text-gray-400 left-4 top-4">
                {t.currency}
              </span>
            </div>
          </div>
        </div>

        {/* 결과 카드 */}
        <div className="relative overflow-hidden bg-white shadow-lg rounded-2xl ring-1 ring-gray-100">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                {t.totalDays}
              </span>
              <span className="px-3 py-1 text-xs font-bold text-teal-700 bg-teal-100 rounded-full">
                {totalDays.toLocaleString()} Days
              </span>
            </div>

            <div className="text-right">
              <p className="mb-1 text-xs font-bold text-gray-500">{t.result}</p>
              <p className="text-3xl font-black tracking-tight text-gray-800">
                {severancePay.toLocaleString()}
                <span className="ml-1 text-base font-bold text-gray-400">
                  {t.currency}
                </span>
              </p>
            </div>
          </div>
          <div className="px-5 py-2 text-right bg-gray-50">
            <p className="text-[10px] text-gray-400 font-medium">{t.info}</p>
          </div>
        </div>

        {/* 5개국어 번역된 하단 안내문 */}
        <div className="p-3 border border-blue-100 bg-blue-50/50 rounded-xl">
          <p className="text-[11px] text-gray-500 leading-relaxed text-center break-keep">
            {t.footerTip}
          </p>
        </div>
      </div>
    </div>
  );
}
