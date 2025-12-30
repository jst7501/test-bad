import { useState, useEffect } from "react";
import {
  Home,
  MessageCircle,
  Grid,
  User,
  Wallet,
  ChevronRight,
  Bell,
  TrendingUp,
  Sun,
  MapPin,
  Volume2,
  ChevronLeft,
} from "lucide-react";

// Sub-components
import SalaryCalculator from "./SalaryCalculator";
import SeveranceCalculator from "./SeveranceCalculator";
import RemittanceAnalyzer from "./RemittanceAnalyzer";
import VisaSimulator from "./VisaSimulator";
import Carrot from "./Carrot";
import Blind from "./Blind";
import Club from "./Club";
import Housing from "./Housing";
import PhonePlan from "./Phone";
import Medical from "./Medical";

// ... (USER_MOCK, HOME_DATA, APP_DICT, TOOLS, getDday 등의 데이터 부분은 기존과 동일하므로 생략하지 않고 그대로 두거나,
//      이미 파일에 있다면 아래 App 컴포넌트 부분만 교체하시면 됩니다.
//      편의를 위해 데이터 선언부도 포함합니다.)

// =========================================================
// [Data] 데이터 선언부 (기존 유지)
// =========================================================
const USER_MOCK = {
  name: "Kim Chul-soo",
  nationality: "Vietnam",
  visaType: "E-9",
  visaExpiry: "2026-05-20",
  goalAmount: 50000000,
  currentAmount: 23500000,
};

const HOME_DATA = {
  exchange: {
    currency: "USD",
    rate: 1445.5,
    diff: 12.5,
    trend: "up",
    graph: [1412.0, 1428.5, 1419.0, 1438.5, 1445.5],
  },
  weather: {
    temp: 28,
    status: "Sunny",
    alert: "폭염 주의! 물을 자주 마시세요.",
    loc: "Hwaseong",
  },
  word: {
    kr: "안전화",
    pronun: "An-jeon-hwa",
    en: "Safety Shoes",
    category: "현장 용어",
  },
  trending: [
    { id: 1, type: "blind", text: "E-7-4 비자 점수 질문이요", views: 120 },
    { id: 2, type: "carrot", text: "전기자전거 팝니다 (급매)", price: "30만" },
    { id: 3, type: "club", text: "이번주 일요일 축구할 사람?", loc: "수원" },
  ],
};

export const APP_DICT: any = {
  kr: {
    tabHome: "홈",
    tabComm: "커뮤니티",
    tabMenu: "전체",
    catFinance: "금융 & 계산",
    catLiving: "한국 생활",
    catComm: "소통",
    myVisa: "나의 비자",
    expires: "만료까지",
    goal: "목표 저축액",
    saved: "현재 달성",
    quickTools: "자주 쓰는 기능",
    viewAll: "전체보기",
    trending: "실시간 인기글",
    todayWord: "오늘의 단어",
    tools: {
      salary: "급여 계산기",
      severance: "퇴직금 계산",
      remit: "송금 분석",
      visa: "비자 시뮬",
      housing: "방 구하기",
      phone: "알뜰폰",
      medical: "병원/약국",
      carrot: "중고장터",
      blind: "블라인드",
      club: "소모임",
      food: "맛집",
      job: "일자리",
    },
    welcome: "오늘도 힘내세요! 💪",
  },
  vn: {
    tabHome: "Trang chủ",
    tabComm: "Cộng đồng",
    tabMenu: "Menu",
    catFinance: "Tài chính",
    catLiving: "Đời sống",
    catComm: "Giao lưu",
    myVisa: "Visa của tôi",
    expires: "Hết hạn sau",
    goal: "Mục tiêu",
    saved: "Đã tiết kiệm",
    quickTools: "Tính năng phổ biến",
    viewAll: "Xem tất cả",
    trending: "Bài viết HOT",
    todayWord: "Từ vựng hôm nay",
    tools: {
      salary: "Tính lương",
      severance: "Thôi việc",
      remit: "Gửi tiền",
      visa: "Visa",
      housing: "Thuê nhà",
      phone: "Sim thẻ",
      medical: "Y tế",
      carrot: "Chợ cũ",
      blind: "Ẩn danh",
      club: "Hội nhóm",
      food: "Quán ngon",
      job: "Việc làm",
    },
    welcome: "Cố lên bạn nhé! 💪",
  },
  // ... (다른 언어 생략 - 필요시 기존 코드 참조)
  kh: {
    tabHome: "ទំព័រដើម",
    tabComm: "សហគមន៍",
    tabMenu: "ម៉ឺនុយ",
    catFinance: "ហិរញ្ញវត្ថុ",
    catLiving: "ការរស់នៅ",
    catComm: "ទំនាក់ទំនង",
    myVisa: "ទិដ្ឋាការរបស់ខ្ញុំ",
    expires: "ផុតកំណត់",
    goal: "គោលដៅ",
    saved: "បានសន្សំ",
    quickTools: "មុខងារពេញនិយម",
    viewAll: "មើលទាំងអស់",
    trending: "ពេញនិយម",
    todayWord: "ពាក្យថ្ងៃនេះ",
    tools: {
      salary: "ប្រាក់ខែ",
      severance: "ប្រាក់បំណាច់",
      remit: "ផ្ញើប្រាក់",
      visa: "ទិដ្ឋាការ",
      housing: "រកបន្ទប់",
      phone: "ស៊ីមកាត",
      medical: "ពេទ្យ",
      carrot: "ផ្សារ",
      blind: "អនាមិក",
      club: "ក្លឹប",
      food: "맛집",
      job: "일자리",
    },
    welcome: "ស៊ូៗណា! 💪",
  },
  mm: {
    tabHome: "ပင်မ",
    tabComm: "အသိုင်းအဝိုင်း",
    tabMenu: "မီနူး",
    catFinance: "ငွေကြေး",
    catLiving: "နေထိုင်မှု",
    catComm: "ဆက်သွယ်ရေး",
    myVisa: "ကျွန်ုပ်၏ဗီဇာ",
    expires: "သက်တမ်းကုန်ရန်",
    goal: "ရည်မှန်းချက်",
    saved: "စုဆောင်းမိ",
    quickTools: "အသုံးများသော",
    viewAll: "အားလုံးကြည့်မည်",
    trending: "ရေပန်းစားသော",
    todayWord: "ယနေ့ဝေါဟာရ",
    tools: {
      salary: "လစာ",
      severance: "ဆုကြေး",
      remit: "ငွေလွှဲ",
      visa: "ဗီဇာ",
      housing: "အိမ်ငှား",
      phone: "ဖုန်း",
      medical: "ဆေးရုံ",
      carrot: "ဈေး",
      blind: "လျှို့ဝှက်",
      club: "အသင်း",
      food: "맛집",
      job: "일자리",
    },
    welcome: "ဒီနေ့လည်း အားတင်းထား! 💪",
  },
  uz: {
    tabHome: "Bosh sahifa",
    tabComm: "Hamjamiyat",
    tabMenu: "Menyu",
    catFinance: "Moliya",
    catLiving: "Hayot",
    catComm: "Muloqot",
    myVisa: "Mening vizam",
    expires: "Muddati",
    goal: "Maqsad",
    saved: "Yig'ilgan",
    quickTools: "Tezkor",
    viewAll: "Barchasi",
    trending: "Trend",
    todayWord: "Bugungi so'z",
    tools: {
      salary: "Oylik",
      severance: "Ishdan bo'shash",
      remit: "Pul yuborish",
      visa: "Viza",
      housing: "Uy",
      phone: "Aloqa",
      medical: "Tibbiyot",
      carrot: "Bozor",
      blind: "Anonim",
      club: "Klub",
      food: "맛집",
      job: "일자리",
    },
    welcome: "Bugun ham omad! 💪",
  },
};

const TOOLS = [
  {
    id: "salary",
    icon: "💰",
    color: "bg-green-100 text-green-700",
    cat: "finance",
  },
  {
    id: "remit",
    icon: "💸",
    color: "bg-blue-100 text-blue-700",
    cat: "finance",
  },
  {
    id: "severance",
    icon: "✈️",
    color: "bg-teal-100 text-teal-700",
    cat: "finance",
  },
  {
    id: "job",
    icon: "💼",
    color: "bg-slate-100 text-slate-700",
    cat: "finance",
  },
  {
    id: "visa",
    icon: "🛂",
    color: "bg-purple-100 text-purple-700",
    cat: "living",
  },
  {
    id: "housing",
    icon: "🏠",
    color: "bg-indigo-100 text-indigo-700",
    cat: "living",
  },
  {
    id: "medical",
    icon: "🏥",
    color: "bg-rose-100 text-rose-700",
    cat: "living",
  },
  {
    id: "phone",
    icon: "📱",
    color: "bg-violet-100 text-violet-700",
    cat: "living",
  },
  {
    id: "food",
    icon: "🍜",
    color: "bg-orange-100 text-orange-700",
    cat: "living",
  },
];

const getDday = (dateString: string) => {
  const target = new Date(dateString);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
};

// =========================================================
// [Main App Component] - 구조 변경됨
// =========================================================
export default function App() {
  const [mainTab, setMainTab] = useState<"home" | "community" | "menu">("home");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [commTab, setCommTab] = useState<"carrot" | "blind" | "club">("carrot");
  const [lang, setLang] = useState("kr");

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language");
    if (savedLang && APP_DICT[savedLang]) setLang(savedLang);
  }, []);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("app-language", newLang);
  };

  const t = APP_DICT[lang] || APP_DICT["kr"];

  const openTool = (toolId: string) => setActiveTool(toolId);
  const closeTool = () => setActiveTool(null);

  // 탭 전환 시 툴이 열려있으면 닫기
  const switchTab = (tab: "home" | "community" | "menu") => {
    setMainTab(tab);
    setActiveTool(null);
  };

  const progress = Math.min(
    (USER_MOCK.currentAmount / USER_MOCK.goalAmount) * 100,
    100
  );

  // 그래프 높이 계산 (Home Dashboard용)
  const getGraphHeight = (val: number, data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return `${((val - min) / (max - min)) * 80 + 10}%`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen font-sans bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-2xl h-[100dvh] flex flex-col relative border-x border-gray-100">
        {/* ================= HEADER ================= */}
        {/* activeTool이 있으면 '뒤로가기 헤더', 없으면 '메인 헤더' 표시 */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
          {activeTool ? (
            // [Tool Header]
            <>
              <div className="flex items-center">
                <button
                  onClick={closeTool}
                  className="p-2 -ml-2 text-gray-600 transition rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="ml-1 text-lg font-bold text-gray-900">
                  {t.tools[activeTool]}
                </span>
              </div>
              {/* 툴 헤더 우측 여백 or 추가 버튼 */}
              <div className="w-8"></div>
            </>
          ) : (
            // [Main Header]
            <>
              <span className="text-xl font-black tracking-tighter text-indigo-600">
                PayDay
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={lang}
                  onChange={(e) => handleLangChange(e.target.value)}
                  className="px-2 py-1 text-xs font-bold text-gray-500 bg-gray-100 border-none rounded-lg outline-none cursor-pointer"
                >
                  <option value="kr">🇰🇷 한국어</option>
                  <option value="vn">🇻🇳 Tiếng Việt</option>
                  <option value="kh">🇰🇭 ខ្មែរ</option>
                  <option value="mm">🇲🇲 မြန်မာ</option>
                  <option value="uz">🇺🇿 O'zbek</option>
                </select>
                <Bell size={20} className="text-gray-400" />
              </div>
            </>
          )}
        </div>

        {/* ================= CONTENT AREA ================= */}
        <div className="relative flex-1 overflow-hidden bg-gray-50">
          {/* [CASE 1] 도구가 활성화된 경우: 도구 컴포넌트 렌더링 */}
          {activeTool ? (
            <div className="w-full h-full">
              {activeTool === "salary" && <SalaryCalculator lang={lang} />}
              {activeTool === "severance" && (
                <SeveranceCalculator lang={lang} />
              )}
              {activeTool === "remit" && <RemittanceAnalyzer lang={lang} />}
              {activeTool === "visa" && <VisaSimulator lang={lang} />}
              {activeTool === "housing" && <Housing lang={lang} />}
              {activeTool === "phone" && <PhonePlan lang={lang} />}
              {activeTool === "medical" && <Medical lang={lang} />}
              {activeTool === "food" && (
                // FoodMap 등 임시 컴포넌트 처리 (파일이 있다면 import 해서 사용)
                <div className="p-10 text-center text-gray-400">
                  Food Map Component
                </div>
              )}
              {activeTool === "job" && (
                <div className="p-10 text-center text-gray-400">
                  Job Search Component
                </div>
              )}
            </div>
          ) : (
            // [CASE 2] 도구가 없는 경우: 메인 탭 내용 렌더링
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
              {/* [Tab 1] Home Dashboard */}
              {mainTab === "home" && (
                <div className="p-5 space-y-5">
                  {/* Status Card */}
                  <div className="relative p-5 overflow-hidden bg-white border shadow-sm rounded-3xl border-indigo-50">
                    <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full opacity-50 bg-indigo-50"></div>
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 border-2 border-white rounded-full shadow-sm">
                          <User size={24} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {USER_MOCK.name}
                          </div>
                          <div className="text-xs font-medium text-gray-400">
                            VISA:{" "}
                            <span className="font-bold text-indigo-600">
                              {USER_MOCK.visaType}
                            </span>{" "}
                            ({getDday(USER_MOCK.visaExpiry)})
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-300 transition hover:text-indigo-600">
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-end justify-between mb-2">
                        <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                          <Wallet size={14} /> {t.goal}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-600">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full h-3 mb-2 overflow-hidden bg-gray-100 rounded-full">
                        <div
                          className="h-full transition-all duration-1000 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-medium text-gray-400">
                        <span>
                          {(USER_MOCK.currentAmount / 10000).toLocaleString()}
                          만원
                        </span>
                        <span>
                          {(USER_MOCK.goalAmount / 10000).toLocaleString()}만원
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Widgets (Exchange & Weather) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col justify-between h-32 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-gray-400">
                          1 {HOME_DATA.exchange.currency}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center ${
                            HOME_DATA.exchange.trend === "up"
                              ? "bg-red-50 text-red-500"
                              : "bg-blue-50 text-blue-500"
                          }`}
                        >
                          {HOME_DATA.exchange.trend === "up" ? "▲" : "▼"}{" "}
                          {HOME_DATA.exchange.diff}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight text-gray-800">
                          {HOME_DATA.exchange.rate.toLocaleString()}{" "}
                          <span className="text-xs font-normal text-gray-400">
                            KRW
                          </span>
                        </h3>
                      </div>
                      <div className="flex items-end h-8 gap-1 pb-1 mt-1 border-b border-gray-100">
                        {HOME_DATA.exchange.graph.map((val, i) => (
                          <div
                            key={i}
                            className="relative flex flex-col justify-end flex-1 group"
                          >
                            <div
                              className={`w-full rounded-t-sm transition-all duration-500 ${
                                i === HOME_DATA.exchange.graph.length - 1
                                  ? "bg-red-500"
                                  : "bg-red-200"
                              }`}
                              style={{
                                height: getGraphHeight(
                                  val,
                                  HOME_DATA.exchange.graph
                                ),
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex flex-col justify-between h-32 p-4 overflow-hidden text-white shadow-lg bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-orange-100">
                      <Sun
                        className="absolute text-white -right-4 -top-4 opacity-20"
                        size={64}
                      />
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin size={10} />
                          <span className="text-[10px] font-medium">
                            {HOME_DATA.weather.loc}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-2xl font-bold">
                          {HOME_DATA.weather.temp}°
                        </div>
                      </div>
                      <div className="text-[10px] bg-white/20 backdrop-blur rounded-lg p-2 leading-tight">
                        ⚠️ {HOME_DATA.weather.alert}
                      </div>
                    </div>
                  </div>

                  {/* Daily Word */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.98] transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                        <Volume2 size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 rounded mb-1 inline-block">
                          {t.todayWord} ({HOME_DATA.word.category})
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">
                          {HOME_DATA.word.kr}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {HOME_DATA.word.pronun} ({HOME_DATA.word.en})
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                  </div>

                  {/* Tools Grid */}
                  <div>
                    <div className="flex items-end justify-between px-1 mb-3">
                      <h3 className="text-sm font-bold text-gray-800">
                        {t.quickTools}
                      </h3>
                      <span className="text-[10px] text-gray-400 underline">
                        {t.viewAll}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {TOOLS.slice(0, 8).map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => openTool(tool.id)}
                          className="flex flex-col items-center gap-2 transition active:scale-95 group"
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tool.color} shadow-sm border border-white group-hover:shadow-md transition`}
                          >
                            {tool.icon}
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 text-center leading-tight whitespace-nowrap overflow-hidden w-full text-ellipsis px-1">
                            {t.tools[tool.id]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending */}
                  <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <h3 className="flex items-center gap-1 mb-3 text-xs font-bold text-gray-500">
                      <TrendingUp size={14} className="text-red-500" />{" "}
                      {t.trending}
                    </h3>
                    <div className="space-y-3">
                      {HOME_DATA.trending.map((post, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-1 pb-3 transition border-b rounded-lg cursor-pointer border-gray-50 last:border-0 last:pb-0 active:bg-gray-50"
                        >
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white shrink-0 ${
                              post.type === "blind"
                                ? "bg-red-500"
                                : post.type === "carrot"
                                ? "bg-orange-500"
                                : "bg-indigo-500"
                            }`}
                          >
                            {post.type === "blind"
                              ? "B"
                              : post.type === "carrot"
                              ? "C"
                              : "G"}
                          </span>
                          <span className="flex-1 text-sm text-gray-700 truncate">
                            {post.text}
                          </span>
                          <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                            {post.views
                              ? `${post.views} view`
                              : post.price
                              ? `${post.price}만`
                              : post.loc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* [Tab 2] Community */}
              {mainTab === "community" && (
                <div className="flex flex-col h-full min-h-full">
                  <div className="sticky top-0 z-20 flex bg-white border-b border-gray-100 shrink-0">
                    {["carrot", "blind", "club"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCommTab(tab as any)}
                        className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${
                          commTab === tab
                            ? tab === "carrot"
                              ? "border-orange-500 text-orange-600"
                              : tab === "blind"
                              ? "border-red-500 text-red-600"
                              : "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-400"
                        }`}
                      >
                        {t.tools[tab]}
                      </button>
                    ))}
                  </div>
                  {commTab === "carrot" && <Carrot lang={lang} />}
                  {commTab === "blind" && <Blind lang={lang} />}
                  {commTab === "club" && <Club lang={lang} />}
                </div>
              )}

              {/* [Tab 3] Menu */}
              {mainTab === "menu" && (
                <div className="p-5">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    {t.tabMenu}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                      <div className="flex items-center justify-center w-12 h-12 text-gray-400 bg-gray-100 rounded-full">
                        <User size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {USER_MOCK.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {USER_MOCK.nationality} · {USER_MOCK.visaType}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                        <span className="text-sm font-bold text-gray-700">
                          Language
                        </span>
                        <span className="text-xs text-gray-400">
                          {lang.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                        <span className="text-sm font-bold text-gray-700">
                          Notification
                        </span>
                        <div className="relative w-8 h-4 bg-indigo-600 rounded-full">
                          <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                        <span className="text-sm font-bold text-gray-700">
                          Version
                        </span>
                        <span className="text-xs text-gray-400">1.0.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= BOTTOM NAVIGATION ================= */}
        {/* activeTool이 없을 때만 보임 */}
        <div className="z-50 flex justify-around p-2 pb-5 bg-white border-t border-gray-200 shrink-0 safe-area-bottom">
          <button
            onClick={() => switchTab("home")}
            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              mainTab === "home"
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-400"
            }`}
          >
            <Home size={24} strokeWidth={mainTab === "home" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{t.tabHome}</span>
          </button>
          <button
            onClick={() => switchTab("community")}
            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              mainTab === "community"
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-400"
            }`}
          >
            <MessageCircle
              size={24}
              strokeWidth={mainTab === "community" ? 2.5 : 2}
            />
            <span className="text-[10px] font-bold">{t.tabComm}</span>
          </button>
          <button
            onClick={() => switchTab("menu")}
            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              mainTab === "menu"
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-400"
            }`}
          >
            <Grid size={24} strokeWidth={mainTab === "menu" ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{t.tabMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
