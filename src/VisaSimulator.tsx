// src/components/VisaSimulator.tsx
import React, { useState, useEffect } from "react";
import {
  calculateScore,
  type VisaFormData,
  type VisaResult,
} from "./utils/e74Logic"; // 경로 주의: 실제 경로에 맞게 수정해주세요
import { VISA_DICT } from "./utils/visaDict"; // 경로 주의: 실제 경로에 맞게 수정해주세요
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

// Props 타입 정의
interface VisaSimulatorProps {
  lang: string;
}

const STORAGE_KEY = "visa-simulator-data"; // 로컬 스토리지 키

const VisaSimulator: React.FC<VisaSimulatorProps> = ({ lang }) => {
  // 언어 설정 (기본값: 한국어)
  const t = VISA_DICT[lang] || VISA_DICT["kr"];

  // [1] 초기값 설정: 로컬스토리지 확인 -> 없으면 기본값
  const [formData, setFormData] = useState<VisaFormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse saved visa data", e);
      }
    }
    // 기본값
    return {
      birthYear: 1995,
      entryDate: "2020-01-01",
      income: 3000,
      koreanScore: 2,
      recType: "none",
      continuousWork3Yr: false,
      remoteArea3Yr: false,
      licenseOrDegree: false,
      driverLicense: false,
      penaltyFineCount: 0,
      penaltyTaxCount: 0,
      penaltyImmigrationCount: 0,
    };
  });

  const [result, setResult] = useState<VisaResult | null>(null);
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);

  // [2] 실시간 계산
  useEffect(() => {
    setResult(calculateScore(formData));
  }, [formData]);

  // [3] 데이터 변경 시 로컬스토리지 저장 (Auto Save)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "income"
          ? Number(value)
          : value,
    }));
  };

  const handlePenaltyChange = (name: string, count: number) => {
    setFormData((prev) => ({ ...prev, [name]: count }));
  };

  if (!result) return null;

  return (
    <div className="min-h-full pb-32 font-sans bg-gray-50">
      {/* 1. Score Dashboard (Header) */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 pt-4 pb-10 rounded-b-[2rem] shadow-xl text-white relative z-10">
        <div className="px-3 py-1 text-xs font-bold rounded-full ">
          {t.stayDuration}:
          {result.durationText.replace("년", t.years).replace("개월", t.months)}
        </div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-extrabold">{t.title}</h1>
            <p className="mt-1 text-xs text-purple-200 opacity-90">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="p-5 text-center text-gray-900 transform translate-y-2 bg-white shadow-lg rounded-2xl">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
            {t.myScore}
          </p>
          <div className="flex items-baseline justify-center gap-1 mb-3">
            <span
              className={`text-6xl font-black ${
                result.isPass ? "text-green-600" : "text-purple-600"
              }`}
            >
              {result.totalScore}
            </span>
            <span className="text-lg font-bold text-gray-400">/ 300</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                result.isPass ? "bg-green-500" : "bg-purple-500"
              }`}
              style={{
                width: `${Math.min((result.totalScore / 300) * 100, 100)}%`,
              }}
            />
          </div>

          <div
            className={`mt-3 py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${
              result.isPass
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {result.isPass ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {result.isPass
              ? t.pass
              : result.isEligibilityMet
              ? `${result.gap} Point ${t.fail}`
              : t.minRequirement}
          </div>
        </div>
      </div>

      <main className="px-5 mt-8 space-y-5">
        {/* Eligibility Warning */}
        {!result.isEligibilityMet && (
          <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-xl animate-pulse">
            <AlertTriangle className="text-red-500 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-red-700">
                {t.minRequirement}
              </p>
              <p className="mt-1 text-xs text-red-500">{t.minReqDesc}</p>
            </div>
          </div>
        )}

        {/* [A] Income & Korean */}
        <section className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="flex items-center justify-between mb-4 font-bold text-gray-800">
            <span>
              {t.income} & {t.korean}
            </span>
            <span className="px-2 py-1 text-xs font-bold text-purple-700 rounded bg-purple-50">
              +{result.breakdown.income + result.breakdown.korean}
            </span>
          </h3>

          {/* Income Slider */}
          <div className="mb-6">
            <label className="block mb-1 text-xs font-bold text-gray-500">
              {t.income} (Unit: 10,000 KRW)
            </label>
            <input
              type="range"
              name="income"
              min="2000"
              max="6000"
              step="100"
              value={formData.income}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between mt-2 text-sm font-medium">
              <span className="text-gray-400">2,000</span>
              <span className="font-black text-purple-600">
                {formData.income.toLocaleString()}
              </span>
              <span className="text-gray-400">6,000+</span>
            </div>
          </div>

          {/* Korean Level Buttons */}
          <div>
            <label className="block mb-2 text-xs font-bold text-gray-500">
              {t.korean} (Level)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[0, 2, 3, 4, 5].map((lv) => (
                <button
                  key={lv}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, koreanScore: lv }))
                  }
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    formData.koreanScore === lv
                      ? "bg-purple-600 text-white border-purple-600 shadow-md transform scale-105"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {lv === 0 ? "-" : lv === 5 ? "5+" : lv}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* [B] Age & Entry */}
        <section className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-xs font-bold text-gray-500">
                {t.birthYear}
              </label>
              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthYear: Number(e.target.value),
                  }))
                }
                className="w-full p-2 text-sm font-bold border border-gray-200 rounded-lg bg-gray-50"
              >
                {Array.from(
                  { length: 40 },
                  (_, i) => new Date().getFullYear() - 18 - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-bold text-gray-500">
                {t.entryDate}
              </label>
              <input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                className="w-full p-2 text-sm font-bold border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          <div className="mt-3 text-right">
            <span className="text-xs font-medium text-gray-400">
              {t.age} Score:{" "}
            </span>
            <span className="text-sm font-bold text-purple-600">
              +{result.breakdown.age}
            </span>
          </div>
        </section>

        {/* [C] Bonus Items */}
        <section className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">{t.bonus}</h3>
            <span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded text-xs">
              +{result.breakdown.bonus}
            </span>
          </div>
          <div className="space-y-3">
            {/* Recommendation Select */}
            <div className="p-3 bg-gray-50 rounded-xl">
              <label className="block mb-2 text-xs font-bold text-gray-500">
                {t.bonusItems.rec}
              </label>
              <select
                name="recType"
                value={formData.recType}
                onChange={handleChange}
                className="w-full p-2 text-sm font-medium bg-white border border-gray-200 rounded-lg"
              >
                <option value="none">-</option>
                <option value="central">
                  {t.recDesc ? t.recDesc.central : "Central (+30)"}
                </option>
                <option value="local">
                  {t.recDesc ? t.recDesc.local : "Local (+30)"}
                </option>
                <option value="company">
                  {t.recDesc ? t.recDesc.company : "Company (+50)"}
                </option>
              </select>
              {/* 아래에 작게 해당 사항들 무엇인지 설명 (번역 데이터에 따라 조건부 렌더링) */}
              {formData.recType !== "none" && t.recDescKr && (
                <p className="mt-2 text-xs text-gray-400">
                  {t.recDescKr[formData.recType]}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            {[
              { id: "continuousWork3Yr", label: t.bonusItems.work, score: 20 },
              { id: "remoteArea3Yr", label: t.bonusItems.remote, score: 20 },
              { id: "licenseOrDegree", label: t.bonusItems.degree, score: 20 },
              {
                id: "driverLicense",
                label: t.bonusItems.driverLicense || "Driver License (+10)", // 번역 키가 없을 경우 대비
                score: 10,
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-500">
                    +{item.score}
                  </span>
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={(formData as any)[item.id]}
                    onChange={handleChange}
                    className="w-5 h-5 rounded accent-purple-600"
                  />
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* [D] Penalty Trigger Button */}
        <button
          onClick={() => setShowPenaltyModal(true)}
          className="w-full bg-red-50 border border-red-100 p-4 rounded-xl flex justify-between items-center group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 text-red-500 bg-red-100 rounded-full">
              <AlertTriangle size={20} />
            </div>
            <div className="text-left">
              <span className="block text-sm font-bold text-red-900">
                {t.penalty}
              </span>
              <span className="block text-xs text-red-400">Click to edit</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {result.breakdown.penalty > 0 && (
              <span className="font-bold text-red-600">
                -{result.breakdown.penalty}
              </span>
            )}
            <ChevronRight size={18} className="text-red-300" />
          </div>
        </button>
      </main>

      {/* Penalty Modal */}
      {showPenaltyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">{t.penalty}</h3>
              <button
                onClick={() => setShowPenaltyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: t.penaltyItems.fine,
                  key: "penaltyFineCount",
                  scores: [0, 5, 10, 20],
                },
                {
                  label: t.penaltyItems.tax,
                  key: "penaltyTaxCount",
                  scores: [0, 5, 10, 15],
                },
                {
                  label: t.penaltyItems.immigration,
                  key: "penaltyImmigrationCount",
                  scores: [0, 5, 10, 15],
                },
              ].map((item) => (
                <div key={item.key}>
                  <label className="flex justify-between mb-2 text-sm font-bold text-gray-700">
                    <span>{item.label}</span>
                    <span className="text-red-500">
                      -{item.scores[Math.min((formData as any)[item.key], 3)]}
                    </span>
                  </label>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => handlePenaltyChange(item.key, cnt)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                          (formData as any)[item.key] === cnt
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {cnt === 0 ? "0" : cnt === 3 ? "3+" : cnt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPenaltyModal(false)}
              className="w-full mt-8 bg-gray-900 text-white font-bold py-3.5 rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaSimulator;
