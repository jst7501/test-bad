import { useState, useEffect } from "react";

const t = {
  title: "ប្រាក់បំណាច់ឆ្នាំ (Severance)", // 퇴직금
  startDate: "ថ្ងៃចូលធ្វើការ (Start Date)", // 입사일
  endDate: "ថ្ងៃឈប់ធ្វើការ (End Date)", // 퇴사일
  avgWage: "ប្រាក់ខែមធ្យម ៣ខែ (Avg. Wage)", // 3개월 평균 임금
  totalDays: "រយៈពេលធ្វើការ (Total Days)", // 총 근무일수
  calcButton: "គណនា (Calculate)", // 계산하기
  result: "ប្រាក់បំណាច់សរុប (Total)", // 총 퇴직금
  info: "*នេះជាចំនួនប៉ាន់ស្មាន។ (Estimated amount)", // 추정치입니다
  departureIns: "រួមទាំងធានារ៉ាប់រង (Incl. Insurance)", // 출국만기보험 포함
};

export default function SeveranceCalculator() {
  console.log("SeveranceCalculator language:");
  // 상태 관리
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10)); // 오늘 날짜 기본
  const [avgWage, setAvgWage] = useState(2500000); // 기본 250만원 (예시)

  const [totalDays, setTotalDays] = useState(0);
  const [severancePay, setSeverancePay] = useState(0);

  // 계산 로직
  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 근무 일수 계산
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 퇴직금 공식: (3개월 평균임금) * (근속일수 / 365)
    // *정확히는 퇴직전 3개월 임금총액 / 3개월 일수 * 30 * 근속연수이나, 약식으로 계산
    const pay = Math.floor(avgWage * (days / 365));

    setTotalDays(days);
    setSeverancePay(pay > 0 ? pay : 0);
  };

  // 값이 바뀌면 자동 계산
  useEffect(() => {
    calculate();
  }, [startDate, endDate, avgWage]);

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      {/* 헤더 */}
      <div className="p-6 mb-6 -mx-6 -mt-6 text-center text-white bg-teal-600 shadow-md rounded-b-3xl">
        <h1 className="text-2xl font-bold">✈️ {t.title}</h1>
        <p className="mt-2 text-xs text-teal-100">{t.departureIns}</p>
      </div>

      <div className="flex-1 space-y-5">
        {/* 1. 날짜 입력 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-500">
              {t.startDate}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 text-sm font-bold border rounded-xl bg-gray-50"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold text-gray-500">
              {t.endDate}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 text-sm font-bold border rounded-xl bg-gray-50"
            />
          </div>
        </div>

        {/* 2. 평균 임금 입력 */}
        <div>
          <label className="block mb-1 text-xs font-bold text-gray-500">
            {t.avgWage} (KRW)
          </label>
          <input
            type="number"
            value={avgWage}
            onChange={(e) => setAvgWage(Number(e.target.value))}
            className="w-full p-4 text-xl font-bold text-right border-2 border-teal-100 outline-none rounded-xl focus:border-teal-500"
            placeholder="2500000"
          />
        </div>

        {/* 3. 근무 일수 표시 */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
          <span className="text-sm font-bold text-gray-500">{t.totalDays}</span>
          <span className="text-lg font-bold text-gray-800">
            {totalDays} Days
          </span>
        </div>

        {/* 4. 결과 카드 */}
        <div className="p-6 mt-4 text-center border border-teal-200 shadow-sm bg-teal-50 rounded-2xl">
          <p className="mb-2 text-sm font-bold text-teal-800">{t.result}</p>
          <p className="text-3xl font-extrabold text-teal-900">
            {severancePay.toLocaleString()}{" "}
            <span className="text-lg font-normal">KRW</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-3">{t.info}</p>
        </div>
      </div>

      {/* 하단 팁 */}
      <div className="mt-auto text-[10px] text-gray-400 text-center bg-gray-50 p-2 rounded-lg">
        * 출국만기보험(삼성화재) + 회사 지급 차액 포함 예상액입니다.
      </div>
    </div>
  );
}
