import { useState, useMemo, useEffect, useRef } from "react";
import {
  Building2,
  Home,
  Star,
  Search,
  MapPin,
  ChevronLeft,
  ThumbsUp,
  AlertTriangle,
  PenLine,
  BedDouble,
  Utensils,
  Camera,
  Map as MapIcon,
  List,
  Navigation,
  CheckCircle2,
  XCircle,
  Loader2,
  ImagePlus
} from "lucide-react";

// =========================================================
// [Translation] UI 번역
// =========================================================
const UI_DICT: any = {
  kr: {
    title: "기숙사 클린 리뷰",
    searchPlaceholder: "회사, 지역, 기숙사 검색",
    write: "리뷰 쓰기",
    viewMap: "지도 보기",
    viewList: "목록 보기",
    totalRating: "종합 평점",
    compRating: "회사 만족도",
    dormRating: "기숙사 점수",
    gpsTitle: "위치 인증",
    gpsDesc: "신뢰할 수 있는 리뷰를 위해 현재 위치를 확인합니다.\n공단 근처에서만 작성 가능합니다.",
    gpsBtn: "위치 확인 시작",
    gpsVerifying: "위치 확인 중...",
    gpsSuccess: "인증 성공! (화성 반월공단)",
    gpsFail: "인증 실패: 공단 지역이 아닙니다.",
    attachPhoto: "사진 인증 (선택)",
    submit: "리뷰 등록",
    filter: {
      all: "전체",
      goodPay: "급여 좋음",
      goodDorm: "기숙사 좋음",
      bad: "비추천",
    },
    dormTags: {
      apartment: "아파트",
      oneroom: "원룸",
      container: "컨테이너",
      factory: "공장내부",
    },
    pros: "장점",
    cons: "단점",
  },
  vn: {
    title: "Review KTX Sạch",
    searchPlaceholder: "Tìm công ty, khu vực",
    write: "Viết review",
    viewMap: "Xem Bản đồ",
    viewList: "Xem Danh sách",
    totalRating: "Đánh giá chung",
    compRating: "Công ty",
    dormRating: "KTX",
    gpsTitle: "Xác thực vị trí",
    gpsDesc: "Để đảm bảo tin cậy, chúng tôi cần xác minh vị trí của bạn.\nChỉ có thể viết khi ở gần khu công nghiệp.",
    gpsBtn: "Bắt đầu xác thực",
    gpsVerifying: "Đang kiểm tra...",
    gpsSuccess: "Thành công! (KCN Hwaseong)",
    gpsFail: "Thất bại: Bạn không ở KCN.",
    attachPhoto: "Thêm ảnh (Tùy chọn)",
    submit: "Đăng bài",
    filter: {
      all: "Tất cả",
      goodPay: "Lương tốt",
      goodDorm: "KTX tốt",
      bad: "Không nên đến",
    },
    dormTags: {
      apartment: "Chung cư",
      oneroom: "One-room",
      container: "Container",
      factory: "Trong xưởng",
    },
    pros: "Ưu điểm",
    cons: "Nhược điểm",
  },
  kh: {
    title: "ការពិនិត្យអន្តេវាសិកដ្ឋានល្អ",
    searchPlaceholder: "ស្វែងរកក្រុមហ៊ុន",
    write: "សរសេរ",
    viewMap: "ផែនទី",
    viewList: "បញ្ជី",
    totalRating: "ពិន្ទុសរុប",
    compRating: "ក្រុមហ៊ុន",
    dormRating: "អន្តេវាសិកដ្ឋាន",
    gpsTitle: "ផ្ទៀងផ្ទាត់ទីតាំង",
    gpsDesc: "ដើម្បីភាពជឿជាក់ យើងត្រូវពិនិត្យមើលទីតាំងរបស់អ្នក។\nអាចសរសេរបានតែនៅជិតតំបន់ឧស្សាហកម្មប៉ុណ្ណោះ។",
    gpsBtn: "ចាប់ផ្តើម",
    gpsVerifying: "កំពុងពិនិត្យ...",
    gpsSuccess: "ជោគជ័យ! (តំបន់ឧស្សាហកម្ម)",
    gpsFail: "បរាជ័យ៖ មិននៅក្នុងតំបន់ឧស្សាហកម្ម។",
    attachPhoto: "រូបថត (ជម្រើស)",
    submit: "ដាក់ស្នើ",
    filter: {
      all: "ទាំងអស់",
      goodPay: "ប្រាក់ខែល្អ",
      goodDorm: "កន្លែងស្នាក់នៅល្អ",
      bad: "មិនល្អ",
    },
    dormTags: {
      apartment: "អាផាតមិន",
      oneroom: "បន្ទប់មួយ",
      container: "កុងតឺន័រ",
      factory: "ក្នុងរោងចក្រ",
    },
    pros: "ចំណុចល្អ",
    cons: "ចំណុចអាក្រក់",
  },
  mm: {
    title: "သန့်ရှင်းသော အဆောင် သုံးသပ်ချက်",
    searchPlaceholder: "ကုမ္ပဏီရှာဖွေရန်",
    write: "ရေးမည်",
    viewMap: "မြေပုံ",
    viewList: "စာရင်း",
    totalRating: "စုစုပေါင်း",
    compRating: "ကုမ္ပဏီ",
    dormRating: "အဆောင်",
    gpsTitle: "တည်နေရာ အတည်ပြုခြင်း",
    gpsDesc: "ယုံကြည်စိတ်ချရမှုအတွက် သင့်တည်နေရာကို စစ်ဆေးပါမည်။\nစက်မှုဇုန်အနီးတွင်သာ ရေးသားနိုင်သည်။",
    gpsBtn: "စတင်မည်",
    gpsVerifying: "စစ်ဆေးနေသည်...",
    gpsSuccess: "အောင်မြင်သည်! (Hwaseong Zone)",
    gpsFail: "မအောင်မြင်ပါ - စက်မှုဇုန်ဧရိယာ မဟုတ်ပါ။",
    attachPhoto: "ဓာတ်ပုံ (အဆင်ပြေရင်)",
    submit: "တင်မည်",
    filter: {
      all: "အားလုံး",
      goodPay: "လစာကောင်း",
      goodDorm: "အဆောင်ကောင်း",
      bad: "မကောင်းပါ",
    },
    dormTags: {
      apartment: "တိုက်ခန်း",
      oneroom: "One-room",
      container: "ကွန်တိန်နာ",
      factory: "စက်ရုံအတွင်း",
    },
    pros: "ကောင်းကွက်",
    cons: "ဆိုးကွက်",
  },
  uz: {
    title: "Toza Yotoqxona Sharhlari",
    searchPlaceholder: "Kompaniya qidirish",
    write: "Yozish",
    viewMap: "Xarita",
    viewList: "Ro'yxat",
    totalRating: "Baholar",
    compRating: "Kompaniya",
    dormRating: "Yotoq",
    gpsTitle: "Joylashuvni tasdiqlash",
    gpsDesc: "Ishonchlilik uchun joylashuvingizni tekshiramiz.\nFaqat sanoat zonasi yaqinida yozish mumkin.",
    gpsBtn: "Boshlash",
    gpsVerifying: "Tekshirilmoqda...",
    gpsSuccess: "Muvaffaqiyatli! (Hwaseong)",
    gpsFail: "Xato: Sanoat zonasi emas.",
    attachPhoto: "Rasm (Ixtiyoriy)",
    submit: "Yuborish",
    filter: {
      all: "Barchasi",
      goodPay: "Yaxshi maosh",
      goodDorm: "Yaxshi yotoq",
      bad: "Yomon",
    },
    dormTags: {
      apartment: "Kvartira",
      oneroom: "Bir xonali",
      container: "Konteyner",
      factory: "Zavod ichida",
    },
    pros: "Afzallik",
    cons: "Kamchilik",
  },
};

// =========================================================
// [Data] 리뷰 목업 데이터 (위치 정보 추가)
// =========================================================
const getMockReviews = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];

  return [
    {
      id: 1,
      name: "S Electronics Partner",
      industry: "Electronics",
      location: l({ kr: "화성시 반월동", vn: "Hwaseong Banwol", kh: "Hwaseong", mm: "Hwaseong", uz: "Hwaseong" }),
      pos: { x: 30, y: 40 }, // Mock Map Coord (%)
      ratingTotal: 4.5,
      ratingComp: 4.8,
      ratingDorm: 4.2,
      tags: ["goodPay", "goodDorm"],
      dormInfo: { type: "apartment", cost: 0, people: 2, lunch: true },
      review: {
        title: l({ kr: "돈 많이 벌고 싶으면 오세요", vn: "Muốn kiếm nhiều tiền thì vào đây", kh: "ចង់បានលុយច្រើនមកទីនេះ", mm: "ပိုက်ဆံများများလိုချင်ရင် လာခဲ့ပါ", uz: "Ko'p pul topishni xohlasangiz keling" }),
        pros: l({ kr: "잔업 특근 많아서 월급 350 이상, 밥 맛있음", vn: "Tăng ca nhiều, lương trên 3.5 triệu won. Cơm ngon.", kh: "ប្រាក់ខែល្អ បាយឆ្ងាញ់", mm: "လစာကောင်း ထမင်းကောင်း", uz: "Maosh yaxshi, ovqat zo'r" }),
        cons: l({ kr: "서서 일해야 함", vn: "Phải đứng làm việc", kh: "ត្រូវឈរធ្វើការ", mm: "မတ်တပ်ရပ်လုပ်ရ", uz: "Tik turib ishlash" }),
      },
      date: "2025.12.28",
    },
    {
      id: 2,
      name: "Daewon Plating Co.",
      industry: "Plating",
      location: l({ kr: "안산시 원곡동", vn: "Ansan Wongok", kh: "Ansan", mm: "Ansan", uz: "Ansan" }),
      pos: { x: 60, y: 25 },
      ratingTotal: 2.5,
      ratingComp: 3.0,
      ratingDorm: 1.5,
      tags: ["bad"],
      dormInfo: { type: "container", cost: 200000, people: 4, lunch: true },
      review: {
        title: l({ kr: "기숙사가 너무 추워요", vn: "KTX lạnh quá", kh: "កន្លែងស្នាក់នៅត្រជាក់ពេក", mm: "အဆောင်က အရမ်းအေးတယ်", uz: "Yotoqxona juda sovuq" }),
        pros: l({ kr: "월급 밀린 적 없음", vn: "Lương đúng hạn", kh: "ប្រាក់ខែទៀងទាត់", mm: "လစာမှန်", uz: "Maosh vaqtida" }),
        cons: l({ kr: "컨테이너라 겨울에 얼어 죽음", vn: "Container lạnh cóng", kh: "កុងតឺន័រត្រជាក់ខ្លាំង", mm: "ကွန်တိန်နာအေးတယ်", uz: "Konteyner muzlaydi" }),
      },
      date: "2025.12.20",
    },
    {
      id: 3,
      name: "Green Farm",
      industry: "Agriculture",
      location: l({ kr: "포천시", vn: "Pocheon", kh: "Pocheon", mm: "Pocheon", uz: "Pocheon" }),
      pos: { x: 80, y: 70 },
      ratingTotal: 3.8,
      ratingComp: 3.5,
      ratingDorm: 4.5,
      tags: ["goodDorm"],
      dormInfo: { type: "oneroom", cost: 0, people: 1, lunch: false },
      review: {
        title: l({ kr: "숙소는 좋은데 일이 불규칙", vn: "Chỗ ở tốt nhưng việc ít", kh: "ស្នាក់នៅល្អ តែការងារតិច", mm: "နေစရာကောင်း အလုပ်ပါး", uz: "Yotoq zo'r, ish kam" }),
        pros: l({ kr: "1인 1실 원룸 제공", vn: "Phòng riêng 1 người", kh: "បន្ទប់ដាច់ដោយឡែក", mm: "တစ်ယောက်ခန်း", uz: "Alohida xona" }),
        cons: l({ kr: "일 없으면 돈 안됨", vn: "Ít việc ít tiền", kh: "អត់ការងារអត់លុយ", mm: "အလုပ်မရှိ ပိုက်ဆံမရှိ", uz: "Ish yo'q pul yo'q" }),
      },
      date: "2025.12.15",
    },
    {
      id: 4,
      name: "HK Metal",
      industry: "Manufacturing",
      location: l({ kr: "시흥시 정왕동", vn: "Siheung", kh: "Siheung", mm: "Siheung", uz: "Siheung" }),
      pos: { x: 20, y: 60 },
      ratingTotal: 4.0,
      ratingComp: 4.0,
      ratingDorm: 3.5,
      tags: ["goodPay"],
      dormInfo: { type: "apartment", cost: 150000, people: 3, lunch: true },
      review: {
        title: l({ kr: "상여금 400%", vn: "Thưởng 400%", kh: "Bonus 400%", mm: "ဘောနပ်စ် ၄၀၀%", uz: "Bonus 400%" }),
        pros: l({ kr: "상여금 잘 나옴", vn: "Thưởng tốt", kh: "ប្រាក់រង្វាន់ល្អ", mm: "ဘောနပ်စ်ကောင်း", uz: "Bonus yaxshi" }),
        cons: l({ kr: "기숙사 화장실 부족", vn: "Thiếu nhà vệ sinh", kh: "ខ្វះបន្ទប់ទឹក", mm: "အိမ်သာမလောက်", uz: "Tualet yetishmaydi" }),
      },
      date: "2025.12.10",
    },
     {
      id: 5,
      name: "DH Tech",
      industry: "PCB",
      location: l({ kr: "안산시 단원구", vn: "Ansan Danwon", kh: "Ansan", mm: "Ansan", uz: "Ansan" }),
      pos: { x: 45, y: 30 },
      ratingTotal: 1.8,
      ratingComp: 2.0,
      ratingDorm: 1.0,
      tags: ["bad"],
      dormInfo: { type: "container", cost: 250000, people: 4, lunch: false },
      review: {
        title: l({ kr: "절대 가지마세요", vn: "Đừng bao giờ đến đây", kh: "កុំមកទីនេះ", mm: "ဒီကိုလုံးဝမလာနဲ့", uz: "Bu yerga umuman kelmang" }),
        pros: l({ kr: "없음", vn: "Không có", kh: "គ្មាន", mm: "မရှိပါ", uz: "Yo'q" }),
        cons: l({ kr: "기숙사 곰팡이 냄새 심함. 온수 안나옴.", vn: "Mùi nấm mốc, không nước nóng.", kh: "ក្លិនផ្សិត គ្មានទឹកក្តៅ", mm: "မှိုနံ့နံ ရေနွေးမလာ", uz: "Mog'or hidi, issiq suv yo'q" }),
      },
      date: "2025.12.05",
    },
  ];
};

// =========================================================
// [Components] Helper Components
// =========================================================
const StarRating = ({ score, size = 14 }: { score: number; size?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i <= Math.round(score)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

// =========================================================
// [Main Component]
// =========================================================
type ViewState = "list" | "map" | "detail" | "write" | "write_gps";

export default function CompanyReview({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // GPS Mock State
  const [gpsStatus, setGpsStatus] = useState<"idle" | "verifying" | "success" | "fail">("idle");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const reviews = useMemo(() => getMockReviews(lang), [lang]);

  // Scroll to top when view changes
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }
  }, [view]);

  const filteredReviews = reviews.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;

    if (filter === "all") return true;
    if (filter === "goodPay") return r.ratingComp >= 4.0;
    if (filter === "goodDorm") return r.ratingDorm >= 4.0;
    if (filter === "bad") return r.ratingTotal <= 2.5;
    return true;
  });

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setView("detail");
  };

  const startGpsVerification = () => {
    setGpsStatus("verifying");
    setTimeout(() => {
        // Mock Success
        setGpsStatus("success");
    }, 2000);
  };

  const handleWriteClick = () => {
      setGpsStatus("idle");
      setView("write_gps");
  }

  const handleBack = () => {
    if (view === "detail" || view === "write" || view === "write_gps") {
        setView("list");
        setSelectedReview(null);
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden font-sans bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0 transition-opacity">
        {view === "detail" || view === "write" || view === "write_gps" ? (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-indigo-700">
            <Building2 size={24} />
            <span className="text-lg font-bold">{t.title}</span>
          </div>
        )}
        
        {/* View Toggles (List vs Map) */}
        {(view === "list" || view === "map") && (
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded-md transition ${view === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400"}`}
                >
                    <List size={20} />
                </button>
                <button 
                    onClick={() => setView("map")}
                    className={`p-1.5 rounded-md transition ${view === "map" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400"}`}
                >
                    <MapIcon size={20} />
                </button>
            </div>
        )}
      </header>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 pb-20 overflow-y-auto scrollbar-hide relative"
      >
        
        {/* 1. LIST VIEW */}
        {view === "list" && (
          <div className="p-4 space-y-4 animate-in fade-in duration-300">
            {/* Search */}
            <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm placeholder-gray-400 outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-hide">
              {["all", "goodPay", "goodDorm", "bad"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    filter === f
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {t.filter[f]}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredReviews.map((item) => (
                <ReviewCard key={item.id} item={item} t={t} onClick={() => handleReviewClick(item)} />
              ))}
              {filteredReviews.length === 0 && (
                  <div className="py-10 text-center text-gray-400 text-sm">
                      검색 결과가 없습니다.
                  </div>
              )}
            </div>
          </div>
        )}

        {/* 2. MAP VIEW (MOCKED) */}
        {view === "map" && (
            <div className="w-full h-full bg-blue-50 relative overflow-hidden animate-in fade-in duration-300">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-10" 
                    style={{ 
                        backgroundImage: "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)", 
                        backgroundSize: "40px 40px" 
                    }}
                ></div>

                {/* Pins */}
                {filteredReviews.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleReviewClick(item)}
                        style={{ left: `${item.pos.x}%`, top: `${item.pos.y}%` }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 hover:z-50"
                    >
                        <div className={`
                            relative px-2 py-1 bg-white rounded-lg shadow-md text-[10px] font-bold whitespace-nowrap mb-1 border
                            ${item.ratingDorm >= 4 ? "border-green-400 text-green-700" : item.ratingDorm <= 2.5 ? "border-red-400 text-red-700" : "border-gray-200 text-gray-700"}
                        `}>
                            {item.name}
                        </div>
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110
                            ${item.ratingDorm >= 4 ? "bg-green-500" : item.ratingDorm <= 2.5 ? "bg-red-500" : "bg-indigo-500"}
                        `}>
                            {item.ratingDorm >= 4 ? <ThumbsUp size={14} /> : item.ratingDorm <= 2.5 ? <AlertTriangle size={14} /> : <Home size={14} />}
                        </div>
                        {/* Pin Point */}
                        <div className="w-1 h-2 bg-gray-400/50 mt-[-2px]"></div>
                    </button>
                ))}

                {/* Helper Text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-200">
                     ✨ 핀을 눌러 상세 리뷰를 확인하세요
                </div>
            </div>
        )}

        {/* 3. DETAIL VIEW */}
        {view === "detail" && selectedReview && (
          <div className="pb-24 animate-in slide-in-from-right duration-300 bg-slate-50 min-h-full">
             <ReviewDetail review={selectedReview} t={t} />
          </div>
        )}

        {/* 4. WRITE VIEW: GPS Verification */}
        {view === "write_gps" && (
            <div className="flex flex-col items-center justify-center h-full p-6 animate-in slide-in-from-bottom duration-300">
                 <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 text-center relative overflow-hidden">
                     {/* Background Deco */}
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-500"></div>

                     <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                         {gpsStatus === "verifying" ? <Loader2 size={32} className="animate-spin" /> : 
                          gpsStatus === "success" ? <CheckCircle2 size={32} className="text-green-500" /> :
                          gpsStatus === "fail" ? <XCircle size={32} className="text-red-500" /> :
                          <Navigation size={32} />}
                     </div>

                     <h3 className="text-xl font-black text-gray-800 mb-2">{t.gpsTitle}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed mb-6 whitespace-pre-wrap">{t.gpsDesc}</p>

                     {gpsStatus === "idle" && (
                         <button 
                            onClick={startGpsVerification}
                            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition"
                         >
                             {t.gpsBtn}
                         </button>
                     )}

                    {gpsStatus === "verifying" && (
                         <div className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl">
                             {t.gpsVerifying}
                         </div>
                     )}

                    {gpsStatus === "success" && (
                         <button 
                            onClick={() => setView("write")}
                            className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition animate-in zoom-in"
                         >
                             {t.gpsSuccess} <span className="ml-2">⮕</span>
                         </button>
                     )}
                 </div>
            </div>
        )}

        {/* 5. WRITE VIEW: Form (Mock) */}
        {view === "write" && (
          <div className="flex flex-col w-full h-full duration-300 bg-white animate-in slide-in-from-right">
            <header className="flex items-center justify-between px-4 border-b border-gray-100 h-14 shrink-0">
              <button onClick={() => setView("write_gps")} className="text-sm text-gray-600">
                Back
              </button>
              <span className="font-bold text-gray-900">{t.title}</span>
              <button
                onClick={handleBack}
                className="text-sm font-bold text-indigo-600"
              >
                {t.submit}
              </button>
            </header>
            <div className="flex flex-col p-5 gap-6 overflow-y-auto">
              
              {/* Company Name */}
              <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Company</label>
                  <div className="font-black text-lg text-gray-800">S Electronics Partner</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle2 size={12} /> GPS Verified: Hwaseong
                  </div>
              </div>

              {/* Ratings */}
              <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">{t.compRating}</label>
                      <div className="flex gap-2 text-gray-300">
                          <Star size={24} className="fill-yellow-400 text-yellow-400" />
                          <Star size={24} className="fill-yellow-400 text-yellow-400" />
                          <Star size={24} className="fill-yellow-400 text-yellow-400" />
                          <Star size={24} className="fill-yellow-400 text-yellow-400" />
                          <Star size={24} />
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">{t.dormRating}</label>
                      <div className="flex gap-2 text-gray-300">
                           <Star size={24} className="fill-green-500 text-green-500" />
                           <Star size={24} className="fill-green-500 text-green-500" />
                           <Star size={24} className="fill-green-500 text-green-500" />
                           <Star size={24} />
                           <Star size={24} />
                      </div>
                  </div>
              </div>

              {/* Photo Upload */}
              <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{t.attachPhoto}</label>
                  <div className="grid grid-cols-4 gap-2">
                       <button className="aspect-square bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                           <ImagePlus size={24} />
                       </button>
                  </div>
              </div>

               {/* Text Area */}
               <div>
                  <textarea 
                    className="w-full h-32 p-4 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-100 placeholder-gray-400 text-sm"
                    placeholder="기숙사 상태, 식사, 급여 등에 대해 솔직하게 적어주세요."
                  ></textarea>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB (Write Button) - Only in List/Map view */}
      {(view === "list" || view === "map") && (
        <button
          onClick={handleWriteClick}
          className="absolute bottom-6 right-5 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 z-30"
        >
          <PenLine size={20} />
          <span className="text-sm font-bold">{t.write}</span>
        </button>
      )}
    </div>
  );
}

// Sub-component: Review Card
function ReviewCard({ item, t, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.99] transition cursor-pointer"
        >
            <div className="flex items-start justify-between mb-2">
            <div>
                <h3 className="text-lg font-bold leading-tight text-gray-900">
                {item.name}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                <MapPin size={12} /> {item.location} · {item.industry}
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50">
                <Star
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                />
                <span className="text-sm font-bold text-yellow-700">
                    {item.ratingTotal}
                </span>
                </div>
            </div>
            </div>

            {/* Scores */}
            <div className="flex justify-around gap-4 p-2 my-3 text-xs text-gray-500 rounded-lg bg-gray-50">
            <div className="flex flex-col items-center">
                <span className="text-[10px] mb-0.5">{t.compRating}</span>
                <span className="font-bold text-gray-700">{item.ratingComp}</span>
            </div>
            <div className="w-[1px] bg-gray-200"></div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] mb-0.5">{t.dormRating}</span>
                <span
                className={`font-bold ${
                    item.ratingDorm >= 4
                    ? "text-green-600"
                    : item.ratingDorm <= 2.5
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
                >
                {item.ratingDorm}
                </span>
            </div>
            </div>

            {/* Snippet */}
            <div className="mb-3 text-sm font-medium text-gray-700 line-clamp-1">
            "{item.review.title}"
            </div>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Home size={10} /> {t.dormTags[item.dormInfo.type]}
            </span>
            {item.tags.includes("goodPay") && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                $$$
                </span>
            )}
            {item.tags.includes("bad") && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle size={10} /> Warning
                </span>
            )}
            </div>
        </div>
    );
}

// Sub-component: Review Detail
function ReviewDetail({ review, t }: any) {
    return (
        <div>
            {/* Header Info */}
            <div className="p-5 pb-8 bg-white border-b border-gray-100">
            <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded mb-2">
                {review.industry}
            </div>
            <h2 className="mb-1 text-2xl font-black text-gray-900">
                {review.name}
            </h2>
            <div className="flex items-center gap-1 mb-6 text-sm text-gray-500">
                <MapPin size={14} /> {review.location}
            </div>

            {/* Big Score Card */}
            <div className="flex items-center justify-between p-5 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl shadow-indigo-200">
                <div>
                <div className="mb-1 text-xs font-bold text-indigo-100">
                    {t.totalRating}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-4xl font-black">
                    {review.ratingTotal}
                    </span>
                    <div className="flex flex-col text-xs text-indigo-100">
                    <StarRating score={review.ratingTotal} />
                    <span>Verified</span>
                    </div>
                </div>
                </div>
                <div className="h-10 w-[1px] bg-white/20"></div>
                <div className="flex flex-col gap-1 text-right">
                <div className="flex items-center justify-end gap-1 text-xs text-indigo-100">
                    {t.compRating}{" "}
                    <span className="text-sm font-bold text-white">
                    {review.ratingComp}
                    </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-xs text-indigo-100">
                    {t.dormRating}{" "}
                    <span className="text-sm font-bold text-white">
                    {review.ratingDorm}
                    </span>
                </div>
                </div>
            </div>
            </div>

            {/* Dormitory Info */}
            <div className="p-5">
            <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
                <Home size={20} className="text-indigo-600" /> {t.dormRating}{" "}
                Info
            </h3>
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                    Type
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                    {t.dormTags[review.dormInfo.type]}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                    Cost
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                    {review.dormInfo.cost === 0
                        ? "Free"
                        : `${review.dormInfo.cost.toLocaleString()} KRW`}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                    People
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-800">
                    <BedDouble size={14} /> {review.dormInfo.people}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                    Food
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-800">
                    <Utensils size={14} />{" "}
                    {review.dormInfo.lunch ? "OK" : "NO"}
                    </span>
                </div>
                </div>
                {/* Fake Image (Placeholder for now) */}
                <div className="flex items-center justify-center w-full h-32 gap-1 mt-4 text-xs border rounded-lg bg-slate-100 text-slate-400 border-slate-200">
                <Camera size={16} /> Dormitory Photos
                </div>
            </div>
            </div>

            {/* Review Text */}
            <div className="px-5 pb-5">
            <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
                <PenLine size={20} className="text-indigo-600" /> Review
            </h3>
            <div className="p-5 space-y-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="text-lg font-bold leading-snug text-gray-900">
                "{review.review.title}"
                </div>
                <div>
                <div className="flex items-center gap-2 mb-1">
                    <ThumbsUp size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-blue-600">
                    {t.pros}
                    </span>
                </div>
                <p className="p-3 text-sm leading-relaxed text-gray-600 rounded-lg bg-blue-50/50">
                    {review.review.pros}
                </p>
                </div>
                <div>
                <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={16} className="text-red-500" />
                    <span className="text-sm font-bold text-red-600">
                    {t.cons}
                    </span>
                </div>
                <p className="p-3 text-sm leading-relaxed text-gray-600 rounded-lg bg-red-50/50">
                    {review.review.cons}
                </p>
                </div>
                <div className="pt-2 text-xs text-right text-gray-400 border-t border-gray-100">
                Written on {review.date}
                </div>
            </div>
            </div>
        </div>
    );
}
