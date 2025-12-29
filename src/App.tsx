import React, { useState, useEffect } from "react";
import SalaryCalculator from "./SalaryCalculator";
import SeveranceCalculator from "./SeveranceCalculator";

// ---------------------------------------------------------
// 🌍 5개국어 번역 데이터베이스
// ---------------------------------------------------------
export const TRANSLATIONS: any = {
  kr: {
    name: "한국어",
    tabSalary: "급여 계산기",
    tabSeverance: "퇴직금 계산기",
  },
  vn: {
    name: "Tiếng Việt", // 베트남
    tabSalary: "Tính Lương",
    tabSeverance: "Tiền Thưởng",
  },
  kh: {
    name: "ខ្មែរ", // 캄보디아
    tabSalary: "គណនាប្រាក់ខែ",
    tabSeverance: "ប្រាក់បំណាច់",
  },
  mm: {
    name: "မြန်မာ", // 미얀마
    tabSalary: "လစာတွက်မယ်",
    tabSeverance: "လုပ်သက်ဆုကြေး",
  },
  uz: {
    name: "O'zbek", // 우즈벡
    tabSalary: "Oylik Hisoblash",
    tabSeverance: "Ishdan bo'shash",
  },
};

function App() {
  const [activeTab, setActiveTab] = useState<"salary" | "severance">("salary");

  // 언어 설정 (기본값: 한국어 'kr')
  const [lang, setLang] = useState("kr");

  // 로컬스토리지에서 언어 불러오기
  useEffect(() => {
    const savedLang = localStorage.getItem("app-language");
    if (savedLang && TRANSLATIONS[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  // 언어 변경 시 저장
  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("app-language", newLang);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col items-center min-h-screen font-sans bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-2xl h-[100dvh] flex flex-col relative border-x border-gray-100">
        {/* 🌍 언어 선택 바 (상단 고정) */}
        <div className="z-50 flex items-center justify-between p-3 bg-white border-b">
          <span className="text-lg font-bold text-gray-800">💰 PayDay</span>
          <select
            value={lang}
            onChange={(e) => handleLangChange(e.target.value)}
            className="px-3 py-1 text-sm font-bold text-gray-700 bg-gray-100 border border-gray-200 rounded-full outline-none"
          >
            <option value="kr">🇰🇷 한국어</option>
            <option value="vn">🇻🇳 Tiếng Việt</option>
            <option value="kh">🇰🇭 ខ្មែរ</option>
            <option value="mm">🇲🇲 မြန်မာ</option>
            <option value="uz">🇺🇿 O'zbek</option>
          </select>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="relative flex-1 overflow-hidden">
          {activeTab === "salary" && (
            <div className="h-full pb-20 overflow-y-auto">
              {/* 자식 컴포넌트에 언어 코드(lang) 전달 */}
              <SalaryCalculator lang={lang} />
            </div>
          )}
          {activeTab === "severance" && (
            <div className="h-full pb-20 overflow-y-auto">
              <SeveranceCalculator />
            </div>
          )}
        </div>

        {/* 하단 탭바 */}
        <div className="bg-white border-t border-gray-200 flex justify-around p-2 z-50 shrink-0 safe-area-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setActiveTab("salary")}
            className={`flex-1 p-2 rounded-xl flex flex-col items-center transition active:scale-95 ${
              activeTab === "salary"
                ? "bg-green-50 text-green-700"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span className="mb-1 text-2xl">📅</span>
            <span className="text-[10px] font-bold">{t.tabSalary}</span>
          </button>

          <button
            onClick={() => setActiveTab("severance")}
            className={`flex-1 p-2 rounded-xl flex flex-col items-center transition active:scale-95 ${
              activeTab === "severance"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span className="mb-1 text-2xl">✈️</span>
            <span className="text-[10px] font-bold">{t.tabSeverance}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
