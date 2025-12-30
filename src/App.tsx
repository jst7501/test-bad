import { useState, useEffect } from "react";
import SalaryCalculator from "./SalaryCalculator";
import SeveranceCalculator from "./SeveranceCalculator";
import RemittanceAnalyzer from "./RemittanceAnalyzer";
import VisaSimulator from "./VisaSimulator";
import Carrot from "./Carrot";
import Blind from "./Blind";

// 1. 번역 데이터 확장
export const TRANSLATIONS: any = {
  kr: {
    name: "한국어",
    tabSalary: "급여 계산",
    tabSeverance: "퇴직금",
    tabRemit: "송금 분석",
    tabVisa: "비자 정보",
    tabCarrot: "중고 장터",
    tabTalk: "익명 게시판",
  },
  vn: {
    name: "Tiếng Việt",
    tabSalary: "Tính Lương",
    tabSeverance: "Tiền Thưởng",
    tabRemit: "Gửi Tiền",
    tabVisa: "Visa",
    tabCarrot: "Chợ Cũ",
    tabTalk: "talk",
  },
  kh: {
    name: "ខ្មែរ",
    tabSalary: "ប្រាក់ខែ",
    tabSeverance: "ប្រាក់បំណាច់",
    tabRemit: "ផ្ញើប្រាក់",
    tabVisa: "ទិដ្ឋាការ",
    tabCarrot: "ផ្សារ",
    tabTalk: "talk",
  },
  mm: {
    name: "မြန်မာ",
    tabSalary: "လစာ",
    tabSeverance: "ဆုကြေး",
    tabRemit: "ငွေလွှဲ",
    tabVisa: "ဗီဇာ",
    tabCarrot: "ဈေး",
    tabTalk: "talk",
  },
  uz: {
    name: "O'zbek",
    tabSalary: "Oylik",
    tabSeverance: "Ishdan bo'shash",
    tabRemit: "Pul Yuborish",
    tabVisa: "Viza",
    tabCarrot: "Bozor",
    tabTalk: "Forum",
  },
};

// 2. 탭 설정 (리팩토링의 핵심)
const TABS = [
  {
    id: "salary",
    icon: "📅",
    labelKey: "tabSalary",
    color: "text-green-700 bg-green-50",
  },
  {
    id: "remit",
    icon: "💸",
    labelKey: "tabRemit",
    color: "text-blue-700 bg-blue-50",
  },
  {
    id: "severance",
    icon: "✈️",
    labelKey: "tabSeverance",
    color: "text-teal-700 bg-teal-50",
  },
  {
    id: "visa",
    icon: "🛂",
    labelKey: "tabVisa",
    color: "text-purple-700 bg-purple-50",
  },
  {
    id: "carrot",
    icon: "🥕",
    labelKey: "tabCarrot",
    color: "text-orange-700 bg-orange-50",
  },
  {
    id: "talk",
    icon: "💬",
    labelKey: "tabTalk",
    color: "text-red-700 bg-red-50",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("salary");
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
        {/* 상단: 언어 선택 */}
        <div className="z-50 flex items-center justify-between p-3 bg-white border-b shrink-0">
          <span className="text-lg font-bold tracking-tight text-gray-800">
            💰 PayDay
          </span>
          <select
            value={lang}
            onChange={(e) => handleLangChange(e.target.value)}
            className="px-3 py-1 text-sm font-bold text-gray-700 bg-gray-100 border border-gray-200 rounded-full outline-none cursor-pointer"
          >
            <option value="kr">🇰🇷 한국어</option>
            <option value="vn">🇻🇳 Tiếng Việt</option>
            <option value="kh">🇰🇭 ខ្មែរ</option>
            <option value="mm">🇲🇲 မြန်မာ</option>
            <option value="uz">🇺🇿 O'zbek</option>
          </select>
        </div>

        {/* 중단: 콘텐츠 (스크롤 영역) */}
        <div className="relative flex-1 w-full overflow-hidden bg-white">
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            {activeTab === "salary" && <SalaryCalculator lang={lang} />}
            {activeTab === "severance" && <SeveranceCalculator lang={lang} />}
            {activeTab === "remit" && <RemittanceAnalyzer lang={lang} />}
            {activeTab === "visa" && <VisaSimulator lang={lang} />}
            {activeTab === "carrot" && <Carrot lang={lang} />}
            {activeTab === "talk" && <Blind lang={lang} />}
          </div>
        </div>

        {/* 하단: 탭바 (Map으로 중복 제거) */}
        <div className="z-50 flex justify-around p-2 bg-white border-t border-gray-200 shrink-0 safe-area-bottom">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-2 rounded-xl flex flex-col items-center transition duration-200 ${
                activeTab === tab.id
                  ? tab.color
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <span className="mb-1 text-2xl">{tab.icon}</span>
              <span className="text-[10px] font-bold whitespace-nowrap">
                {t[tab.labelKey]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
