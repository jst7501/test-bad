import { useState, useEffect } from "react";
import SalaryCalculator from "./SalaryCalculator";
import SeveranceCalculator from "./SeveranceCalculator";
import RemittanceAnalyzer from "./RemittanceAnalyzer"; // <--- Import 추가

export const TRANSLATIONS: any = {
  kr: {
    name: "한국어",
    tabSalary: "급여 계산기",
    tabSeverance: "퇴직금 계산기",
    tabRemit: "송금 분석",
  },
  vn: {
    name: "Tiếng Việt",
    tabSalary: "Tính Lương",
    tabSeverance: "Tiền Thưởng",
    tabRemit: "Gửi Tiền",
  },
  kh: {
    name: "ខ្មែរ",
    tabSalary: "គណនាប្រាក់ខែ",
    tabSeverance: "ប្រាក់បំណាច់",
    tabRemit: "ផ្ញើប្រាក់",
  },
  mm: {
    name: "မြန်မာ",
    tabSalary: "လစာတွက်မယ်",
    tabSeverance: "လုပ်သက်ဆုကြေး",
    tabRemit: "ငွေလွှဲ",
  },
  uz: {
    name: "O'zbek",
    tabSalary: "Oylik Hisoblash",
    tabSeverance: "Ishdan bo'shash",
    tabRemit: "Pul Yuborish",
  },
};

function App() {
  const [activeTab, setActiveTab] = useState<"salary" | "severance" | "remit">(
    "salary"
  ); // remit 추가
  const [lang, setLang] = useState("kr");

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language");
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
  }, []);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("app-language", newLang);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col items-center min-h-screen font-sans bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-2xl h-[100dvh] flex flex-col relative border-x border-gray-100">
        {/* 언어 선택 바 */}
        <div className="z-50 flex items-center justify-between p-3 bg-white border-b shrink-0">
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
        <div className="relative flex-1 w-full overflow-hidden">
          {activeTab === "salary" && (
            <div className="w-full h-full overflow-y-auto">
              <SalaryCalculator lang={lang} />
            </div>
          )}
          {activeTab === "severance" && (
            <div className="w-full h-full overflow-y-auto">
              <SeveranceCalculator lang={lang} />
            </div>
          )}
          {activeTab === "remit" && (
            <div className="w-full h-full overflow-y-auto">
              <RemittanceAnalyzer lang={lang} />
            </div>
          )}
        </div>

        {/* 하단 탭바 (3개로 확장) */}
        <div className="bg-white border-t border-gray-200 flex justify-around p-2 z-50 shrink-0 safe-area-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setActiveTab("salary")}
            className={`flex-1 p-2 rounded-xl flex flex-col items-center transition ${
              activeTab === "salary"
                ? "bg-green-50 text-green-700"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span className="mb-1 text-2xl">📅</span>
            <span className="text-[10px] font-bold">{t.tabSalary}</span>
          </button>

          <button
            onClick={() => setActiveTab("remit")}
            className={`flex-1 p-2 rounded-xl flex flex-col items-center transition ${
              activeTab === "remit"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            <span className="mb-1 text-2xl">💸</span>
            <span className="text-[10px] font-bold">{t.tabRemit}</span>
          </button>

          <button
            onClick={() => setActiveTab("severance")}
            className={`flex-1 p-2 rounded-xl flex flex-col items-center transition ${
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
