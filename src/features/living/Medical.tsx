import { useState, useMemo } from "react";
import {
  Stethoscope,
  ChevronLeft,
  Search,
  Phone,
  Siren,
  Thermometer,
  Brain,
  Bone,
  Eye,
  Activity,
  Droplets,
  Smile,
  Zap,
  Clock,
  MapPin,
  Navigation,
  Baby, // 산부인과용
  Scissors, // 외과/피부용
} from "lucide-react";

// =========================================================
// [Translation] UI 번역
// =========================================================
const MED_DICT: any = {
  kr: {
    title: "병원 진료 도우미",
    placeholder: "어디가 아프신가요?",
    symptomCheck: "증상으로 찾기",
    deptCheck: "진료과로 찾기",
    cardTitle: "진료 희망 카드",
    cardDesc: "의료진에게 이 화면을 보여주세요.",
    howLong: "언제부터 아프셨나요?",
    howMuch: "통증 강도 (1-10)",
    days: "일 전",
    hours: "시간 전",
    generate: "카드 만들기",
    nearby: "근처 추천 병원",
    open: "진료중",
    closed: "마감",
    call: "전화",
    map: "지도",
    meters: "m",
    km: "km",
    depts: {
      internal: "내과",
      ortho: "정형외과",
      ent: "이비인후과",
      eye: "안과",
      dental: "치과",
      skin: "피부과",
      uro: "비뇨기과",
      obgyn: "산부인과",
      psych: "정신과",
    },
  },
  vn: {
    title: "Hỗ trợ y tế",
    placeholder: "Bạn đau ở đâu?",
    symptomCheck: "Tìm theo triệu chứng",
    deptCheck: "Tìm theo chuyên khoa",
    cardTitle: "Thẻ khám bệnh",
    cardDesc: "Đưa màn hình này cho bác sĩ.",
    howLong: "Đau từ khi nào?",
    howMuch: "Mức độ đau (1-10)",
    days: "ngày trước",
    hours: "giờ trước",
    generate: "Tạo thẻ",
    nearby: "Bệnh viện gần đây",
    open: "Mở cửa",
    closed: "Đóng cửa",
    call: "Gọi",
    map: "Bản đồ",
    meters: "m",
    km: "km",
    depts: {
      internal: "Nội khoa",
      ortho: "Chỉnh hình",
      ent: "Tai Mũi Họng",
      eye: "Mắt",
      dental: "Nha khoa",
      skin: "Da liễu",
      uro: "Tiết niệu",
      obgyn: "Sản phụ khoa",
      psych: "Tâm thần",
    },
  },
  // ... (다른 언어도 동일 패턴 적용 가능)
  kh: {
    title: "ជំនួយវេជ្ជសាស្ត្រ",
    placeholder: "ស្វែងរក",
    symptomCheck: "រោគសញ្ញា",
    deptCheck: "ផ្នែកវេជ្ជសាស្ត្រ",
    cardTitle: "ប័ណ្ណព្យាបាល",
    cardDesc: "បង្ហាញគ្រូពេទ្យ",
    howLong: "ឈឺពីអង្កាល់?",
    howMuch: "ឈឺកម្រិតណា?",
    days: "ថ្ងៃមុន",
    hours: "ម៉ោងមុន",
    generate: "បង្កើតកាត",
    nearby: "មន្ទីរពេទ្យក្បែរនោះ",
    open: "បើក",
    closed: "បិទ",
    call: "ហៅ",
    map: "ផែនទី",
    meters: "m",
    km: "km",
    depts: {
      internal: "ផ្នែកខាងក្នុង",
      ortho: "ឆ្អឹង",
      ent: "ត្រចៀក ច្រមុះ",
      eye: "ភ្នែក",
      dental: "ធ្មេញ",
      skin: "ស្បែក",
      uro: "បត់ជើង",
      obgyn: "ស្ត្រី",
      psych: "ផ្លូវចិត្ត",
    },
  },
  mm: {
    title: "ဆေးဘက်ဆိုင်ရာ",
    placeholder: "ရှာဖွေပါ",
    symptomCheck: "ရောဂါလက္ခဏာ",
    deptCheck: "ဆေးကုသမှုဌာန",
    cardTitle: "ကုသမှုကဒ်",
    cardDesc: "ဆရာဝန်ပြပါ",
    howLong: "ဘယ်တုန်းကစ",
    howMuch: "ဘယ်လောက်နာ",
    days: "ရက်",
    hours: "နာရီ",
    generate: "ကဒ်လုပ်မည်",
    nearby: "အနီးနားဆေးရုံ",
    open: "ဖွင့်",
    closed: "ပိတ်",
    call: "ခေါ်ဆို",
    map: "မြေပုံ",
    meters: "m",
    km: "km",
    depts: {
      internal: "အတွင်းလူနာ",
      ortho: "အရိုး",
      ent: "နားနှာခေါင်း",
      eye: "မျက်စိ",
      dental: "သွား",
      skin: "အရေပြား",
      uro: "ဆီး",
      obgyn: "သားဖွားမီးယပ်",
      psych: "စိတ်ကျန်းမာရေး",
    },
  },
  uz: {
    title: "Tibbiy yordam",
    placeholder: "Qidirish",
    symptomCheck: "Belgilar",
    deptCheck: "Bo'limlar",
    cardTitle: "Davolash kartasi",
    cardDesc: "Shifokorga ko'rsating",
    howLong: "Qachon?",
    howMuch: "Og'riq?",
    days: "kun oldin",
    hours: "soat oldin",
    generate: "Yaratish",
    nearby: "Yaqin shifoxonalar",
    open: "Ochiq",
    closed: "Yopiq",
    call: "Tel",
    map: "Xarita",
    meters: "m",
    km: "km",
    depts: {
      internal: "Terapevt",
      ortho: "Ortoped",
      ent: "LOR",
      eye: "Ko'z",
      dental: "Tish",
      skin: "Teri",
      uro: "Urolog",
      obgyn: "Ginekolog",
      psych: "Psixiatr",
    },
  },
};

// =========================================================
// [Data] 병원 목업 데이터 (과별 분류)
// =========================================================
const MOCK_HOSPITALS = [
  // 내과 (internal)
  {
    id: 1,
    name: "굿모닝 내과의원",
    dept: "internal",
    dist: 150,
    open: true,
    time: "09:00~19:00",
    rating: 4.5,
  },
  {
    id: 2,
    name: "서울 365 내과",
    dept: "internal",
    dist: 400,
    open: true,
    time: "09:00~21:00",
    rating: 4.8,
  },
  {
    id: 3,
    name: "연세 가정의학과",
    dept: "internal",
    dist: 800,
    open: false,
    time: "09:00~18:00",
    rating: 4.2,
  },

  // 정형외과 (ortho)
  {
    id: 4,
    name: "튼튼 정형외과",
    dept: "ortho",
    dist: 300,
    open: true,
    time: "09:00~19:00",
    rating: 4.6,
  },
  {
    id: 5,
    name: "마디마디 신경외과",
    dept: "ortho",
    dist: 1200,
    open: true,
    time: "09:30~18:30",
    rating: 4.3,
  },

  // 이비인후과 (ent)
  {
    id: 6,
    name: "코코 이비인후과",
    dept: "ent",
    dist: 250,
    open: true,
    time: "09:00~19:00",
    rating: 4.7,
  },
  {
    id: 7,
    name: "숨 이비인후과",
    dept: "ent",
    dist: 600,
    open: false,
    time: "09:00~17:00",
    rating: 4.0,
  },

  // 안과 (eye)
  {
    id: 8,
    name: "밝은세상 안과",
    dept: "eye",
    dist: 500,
    open: true,
    time: "09:30~18:30",
    rating: 4.9,
  },

  // 치과 (dental)
  {
    id: 9,
    name: "미소 치과의원",
    dept: "dental",
    dist: 100,
    open: true,
    time: "10:00~20:00",
    rating: 4.4,
  },
  {
    id: 10,
    name: "바른이 치과",
    dept: "dental",
    dist: 900,
    open: true,
    time: "09:30~18:30",
    rating: 4.6,
  },

  // 피부과 (skin)
  {
    id: 11,
    name: "아름다운 피부과",
    dept: "skin",
    dist: 700,
    open: true,
    time: "10:00~20:00",
    rating: 4.8,
  },

  // 비뇨기과 (uro)
  {
    id: 12,
    name: "맨즈 비뇨기과",
    dept: "uro",
    dist: 1500,
    open: true,
    time: "09:00~18:00",
    rating: 4.5,
  },

  // 산부인과 (obgyn)
  {
    id: 13,
    name: "봄 여성병원",
    dept: "obgyn",
    dist: 2000,
    open: true,
    time: "09:00~18:00",
    rating: 4.9,
  },
];

// =========================================================
// [Data] 증상 데이터 (진료과 매핑 포함)
// =========================================================
const SYMPTOM_DB = [
  {
    id: "general",
    icon: <Thermometer size={24} />,
    color: "bg-red-100 text-red-600",
    items: [
      {
        id: "g1",
        kr: "열이 나고 으슬으슬 추워요 (오한)",
        en: "Fever & Chills",
        dept: "internal",
      },
      {
        id: "g2",
        kr: "온몸이 두드려 맞은 듯 아파요 (몸살)",
        en: "Body aches",
        dept: "internal",
      },
    ],
  },
  {
    id: "head",
    icon: <Brain size={24} />,
    color: "bg-indigo-100 text-indigo-600",
    items: [
      {
        id: "h1",
        kr: "머리가 깨질듯이 아파요 (두통)",
        en: "Severe headache",
        dept: "internal",
      },
      {
        id: "h2",
        kr: "어지러워서 서있기 힘들어요",
        en: "Dizziness",
        dept: "ent",
      },
    ],
  },
  {
    id: "eye",
    icon: <Eye size={24} />,
    color: "bg-yellow-100 text-yellow-700",
    items: [
      {
        id: "e1",
        kr: "눈이 빨개지고 간지러워요",
        en: "Red & Itchy eyes",
        dept: "eye",
      },
      {
        id: "e2",
        kr: "앞이 흐릿하게 보여요",
        en: "Blurry vision",
        dept: "eye",
      },
      {
        id: "e3",
        kr: "콧물이 나고 코가 막혀요",
        en: "Runny/Stuffy nose",
        dept: "ent",
      },
      {
        id: "e4",
        kr: "목이 따갑고 침 삼키기 힘들어요",
        en: "Sore throat",
        dept: "ent",
      },
    ],
  },
  {
    id: "chest",
    icon: <Activity size={24} />,
    color: "bg-pink-100 text-pink-600",
    items: [
      {
        id: "c1",
        kr: "기침이 계속 나와요",
        en: "Continuous cough",
        dept: "internal",
      },
      {
        id: "c2",
        kr: "가슴이 답답하고 숨쉬기 힘들어요",
        en: "Chest tightness",
        dept: "internal",
      },
    ],
  },
  {
    id: "stomach",
    icon: <Stethoscope size={24} />,
    color: "bg-orange-100 text-orange-600",
    items: [
      {
        id: "s1",
        kr: "속이 쓰리고 신물이 올라와요",
        en: "Heartburn",
        dept: "internal",
      },
      {
        id: "s2",
        kr: "배가 너무 아파요 (복통)",
        en: "Stomach ache",
        dept: "internal",
      },
      { id: "s3", kr: "설사를 계속 해요", en: "Diarrhea", dept: "internal" },
    ],
  },
  {
    id: "bone",
    icon: <Bone size={24} />,
    color: "bg-blue-100 text-blue-600",
    items: [
      {
        id: "b1",
        kr: "허리를 삐끗했어요 (요통)",
        en: "Back pain",
        dept: "ortho",
      },
      {
        id: "b2",
        kr: "손목/발목이 부었어요",
        en: "Swollen joints",
        dept: "ortho",
      },
      {
        id: "b3",
        kr: "작업하다가 뼈를 다친 것 같아요",
        en: "Fracture",
        dept: "ortho",
      },
    ],
  },
  {
    id: "skin",
    icon: <Scissors size={24} />,
    color: "bg-rose-100 text-rose-600",
    items: [
      {
        id: "sk1",
        kr: "피부에 두드러기가 났어요",
        en: "Skin rash",
        dept: "skin",
      },
      {
        id: "sk2",
        kr: "상처가 나서 꿰매야 할 것 같아요",
        en: "Deep cut",
        dept: "ortho",
      },
    ],
  },
  {
    id: "dental",
    icon: <Smile size={24} />,
    color: "bg-purple-100 text-purple-600",
    items: [
      {
        id: "d1",
        kr: "이빨이 너무 아파요 (치통)",
        en: "Toothache",
        dept: "dental",
      },
      {
        id: "d2",
        kr: "잇몸이 붓고 피가 나요",
        en: "Bleeding gums",
        dept: "dental",
      },
    ],
  },
];

// 진료과 직접 찾기용 데이터
const DEPT_BUTTONS = [
  {
    id: "internal",
    icon: <Stethoscope size={20} />,
    color: "bg-orange-50 text-orange-600",
  },
  { id: "ortho", icon: <Bone size={20} />, color: "bg-blue-50 text-blue-600" },
  {
    id: "ent",
    icon: <Thermometer size={20} />,
    color: "bg-green-50 text-green-600",
  },
  { id: "eye", icon: <Eye size={20} />, color: "bg-yellow-50 text-yellow-600" },
  {
    id: "dental",
    icon: <Smile size={20} />,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "skin",
    icon: <Scissors size={20} />,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "uro",
    icon: <Droplets size={20} />,
    color: "bg-cyan-50 text-cyan-600",
  },
  { id: "obgyn", icon: <Baby size={20} />, color: "bg-pink-50 text-pink-600" },
];

// =========================================================
// [Types]
// =========================================================
type ViewState = "home" | "detailBuilder" | "resultCard" | "hospitalList";

// =========================================================
// [Main Component]
// =========================================================
export default function Medical({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [targetDept, setTargetDept] = useState<string>("internal"); // 병원 리스트 필터용

  // 상세 증상 빌더 상태
  const [duration, setDuration] = useState<number>(1);
  const [unit, setUnit] = useState<"days" | "hours">("days");
  const [painLevel, setPainLevel] = useState<number>(5);

  const t = MED_DICT[lang] || MED_DICT["kr"];

  // 검색 필터링
  const filteredSymptoms = useMemo(() => {
    if (!searchTerm) return SYMPTOM_DB;
    const lower = searchTerm.toLowerCase();
    return SYMPTOM_DB.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.en.toLowerCase().includes(lower) || item.kr.includes(lower)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchTerm]);

  // 병원 필터링 (거리순 정렬)
  const filteredHospitals = useMemo(() => {
    return MOCK_HOSPITALS.filter((h) => h.dept === targetDept).sort(
      (a, b) => a.dist - b.dist
    );
  }, [targetDept]);

  // 1. 증상 선택 핸들러
  const handleSelectSymptom = (item: any) => {
    setSelectedItem(item);
    setTargetDept(item.dept); // 증상에 맞는 과 설정
    setView("detailBuilder");
    // 초기화
    setDuration(1);
    setUnit("days");
    setPainLevel(5);
  };

  // 2. 카드 생성 핸들러
  const handleGenerate = () => {
    setView("resultCard");
  };

  // 3. 진료과 직접 선택 핸들러
  const handleSelectDept = (deptId: string) => {
    setTargetDept(deptId);
    setView("hospitalList");
  };

  // 뒤로가기 로직
  const goBack = () => {
    if (view === "resultCard") setView("detailBuilder");
    else if (view === "detailBuilder") {
      setView("home");
      setSelectedItem(null);
    } else if (view === "hospitalList") setView("home");
  };

  // 거리 포맷팅 (m, km)
  const fmtDist = (d: number) =>
    d >= 1000 ? `${(d / 1000).toFixed(1)}${t.km}` : `${d}${t.meters}`;

  return (
    <div className="relative flex flex-col w-full h-full font-sans bg-slate-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {view !== "home" ? (
          <button
            onClick={goBack}
            className="p-2 -ml-2 text-gray-700 rounded-full active:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-teal-600">
            <Stethoscope size={24} />
            <span className="text-lg font-bold">{t.title}</span>
          </div>
        )}
        <a
          href="tel:119"
          className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100 animate-pulse"
        >
          <Siren size={14} /> 119
        </a>
      </header>

      <div className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
        {/* 1. 홈 화면 */}
        {view === "home" && (
          <div className="p-4 space-y-6">
            {/* 검색창 */}
            <div className="sticky top-0 z-10 flex items-center gap-2 p-3 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder={t.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* B. 진료과 바로 찾기 (Quick Find) */}
            <div>
              <h3 className="px-1 mb-3 text-sm font-bold text-gray-500">
                {t.deptCheck}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {DEPT_BUTTONS.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleSelectDept(btn.id)}
                    className="flex flex-col items-center justify-center gap-1 p-3 transition bg-white border border-gray-100 shadow-sm rounded-xl active:scale-95"
                  >
                    <div className={`p-2 rounded-full ${btn.color}`}>
                      {btn.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                      {t.depts[btn.id]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* A. 증상 리스트 */}
            <div>
              <h3 className="px-1 mb-3 text-sm font-bold text-gray-500">
                {t.symptomCheck}
              </h3>
              <div className="space-y-4">
                {filteredSymptoms.map((cat) => (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 px-1 mb-2">
                      <div className={`p-1.5 rounded-lg ${cat.color}`}>
                        {cat.icon}
                      </div>
                      {/* 카테고리 이름은 여기서 매핑하거나 영어로 표기 가능 */}
                      <span className="text-sm font-bold text-gray-700">
                        {cat.id.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {cat.items.map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectSymptom(item)}
                          className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left hover:border-teal-500 transition active:scale-[0.99] flex justify-between items-center"
                        >
                          <div>
                            <div className="text-base font-bold text-gray-800">
                              {item.en}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {item.kr}
                            </div>
                          </div>
                          <ChevronLeft
                            size={16}
                            className="text-gray-300 rotate-180"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredSymptoms.length === 0 && (
                  <div className="py-4 text-center text-gray-400">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. 상세 증상 빌더 */}
        {view === "detailBuilder" && selectedItem && (
          <div className="flex flex-col h-full p-5">
            <div className="flex-1">
              <div className="p-5 mb-6 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
                <h2 className="mb-1 text-xl font-bold text-gray-900">
                  {selectedItem.en}
                </h2>
                <p className="font-bold text-teal-600">({selectedItem.kr})</p>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-700">
                  <Clock size={18} /> {t.howLong}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-20 p-3 text-lg font-bold text-center border border-gray-200 outline-none rounded-xl focus:border-teal-500"
                  />
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setUnit("days")}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                        unit === "days"
                          ? "bg-white shadow text-teal-600"
                          : "text-gray-400"
                      }`}
                    >
                      Days
                    </button>
                    <button
                      onClick={() => setUnit("hours")}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                        unit === "hours"
                          ? "bg-white shadow text-teal-600"
                          : "text-gray-400"
                      }`}
                    >
                      Hours
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-700">
                  <Zap size={18} /> {t.howMuch}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between px-1 mt-2 text-xs font-bold text-gray-400">
                  <span>Mild (1)</span>
                  <span className="text-lg text-teal-600">{painLevel}</span>
                  <span className="text-red-500">Severe (10)</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              className="w-full py-4 text-lg font-bold text-white transition bg-teal-600 shadow-lg rounded-2xl hover:bg-teal-700 active:scale-95"
            >
              {t.generate}
            </button>
          </div>
        )}

        {/* 3. 결과 카드 & 병원 리스트 (통합) */}
        {view === "resultCard" && selectedItem && (
          <div className="p-4 space-y-6">
            {/* A. 한국어 증상 카드 */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden">
              <div className="w-full h-3 bg-teal-600"></div>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Please help me
                </p>
                <h3 className="mb-2 text-2xl font-black leading-tight text-gray-900 break-keep">
                  "{selectedItem.kr}"
                </h3>
                <p className="mb-6 text-sm text-gray-400">
                  ({selectedItem.en})
                </p>

                <div className="flex justify-around w-full p-4 mb-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-[10px] text-gray-400">Duration</div>
                    <div className="font-bold text-gray-800">
                      {duration}
                      {unit === "days" ? t.days : t.hours}
                    </div>
                  </div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-gray-400">Pain Lv</div>
                    <div className="font-bold text-red-500">
                      {painLevel} / 10
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <p className="mb-1 text-xs font-bold text-gray-400">
                    Recommended Department
                  </p>
                  <div className="flex items-center justify-center w-full gap-2 py-2 font-bold text-teal-700 border border-teal-100 rounded-lg bg-teal-50">
                    <MapPin size={16} /> {t.depts[selectedItem.dept]}
                  </div>
                </div>
              </div>
            </div>

            {/* B. 근처 병원 리스트 (자동 필터링) */}
            <div>
              <h3 className="flex items-center gap-2 px-1 mb-3 font-bold text-gray-700">
                <MapPin size={18} className="text-teal-600" />
                {t.nearby} ({t.depts[selectedItem.dept]})
              </h3>
              <div className="space-y-3">
                {filteredHospitals.length === 0 ? (
                  <div className="py-10 text-center text-gray-400 bg-white rounded-xl">
                    근처에 해당 병원이 없습니다.
                  </div>
                ) : (
                  filteredHospitals.map((hos) => (
                    <div
                      key={hos.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800">
                            {hos.name}
                          </span>
                          <span className="text-xs font-bold text-yellow-500">
                            ★ {hos.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span
                            className={
                              hos.open
                                ? "text-green-600 font-bold"
                                : "text-gray-400 font-bold"
                            }
                          >
                            {hos.open ? t.open : t.closed}
                          </span>
                          <span>• {fmtDist(hos.dist)}</span>
                          <span>• {hos.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-teal-600 rounded-full bg-gray-50 active:bg-teal-100">
                          <Phone size={18} />
                        </button>
                        <button className="p-2 text-blue-600 rounded-full bg-gray-50 active:bg-blue-100">
                          <Navigation size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. 병원 리스트 직접 보기 (Quick Find 결과) */}
        {view === "hospitalList" && (
          <div className="p-4">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              근처 {t.depts[targetDept]} 목록
            </h3>
            <div className="space-y-3">
              {filteredHospitals.map((hos) => (
                <div
                  key={hos.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">
                        {hos.name}
                      </span>
                      <span className="text-xs font-bold text-yellow-500">
                        ★ {hos.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span
                        className={
                          hos.open
                            ? "text-green-600 font-bold"
                            : "text-gray-400 font-bold"
                        }
                      >
                        {hos.open ? t.open : t.closed}
                      </span>
                      <span>• {fmtDist(hos.dist)}</span>
                      <span>• {hos.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-teal-600 rounded-full bg-gray-50 active:bg-teal-100">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 text-blue-600 rounded-full bg-gray-50 active:bg-blue-100">
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
