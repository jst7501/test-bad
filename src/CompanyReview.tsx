import { useState, useMemo } from "react";
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
  Filter,
} from "lucide-react";

// =========================================================
// [Translation] UI 번역
// =========================================================
const UI_DICT: any = {
  kr: {
    title: "회사/기숙사 리뷰",
    searchPlaceholder: "회사 이름이나 지역 검색",
    write: "리뷰 쓰기",
    totalRating: "종합 평점",
    compRating: "회사 만족도",
    dormRating: "기숙사 등급",
    salary: "급여/잔업",
    safety: "안전/환경",
    food: "식사",
    dormType: "기숙사 형태",
    cost: "기숙사비",
    people: "인실",
    pros: "장점",
    cons: "단점",
    verified: "인증된 근로자",
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
  },
  vn: {
    title: "Review Công ty/KTX",
    searchPlaceholder: "Tìm tên công ty hoặc khu vực",
    write: "Viết review",
    totalRating: "Đánh giá chung",
    compRating: "Độ hài lòng công ty",
    dormRating: "Chất lượng KTX",
    salary: "Lương/Tăng ca",
    safety: "An toàn",
    food: "Ăn uống",
    dormType: "Loại KTX",
    cost: "Phí KTX",
    people: "người/phòng",
    pros: "Ưu điểm",
    cons: "Nhược điểm",
    verified: "Đã xác thực",
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
  },
  kh: {
    title: "ការវាយតម្លៃក្រុមហ៊ុន/អន្តេវាសិកដ្ឋាន",
    searchPlaceholder: "ស្វែងរកឈ្មោះក្រុមហ៊ុន",
    write: "សរសេរ",
    totalRating: "ពិន្ទុសរុប",
    compRating: "ការពេញចិត្តក្រុមហ៊ុន",
    dormRating: "គុណភាពអន្តេវាសិកដ្ឋាន",
    salary: "ប្រាក់ខែ/ថែមម៉ោង",
    safety: "សុវត្ថិភាព",
    food: "អាហារ",
    dormType: "ប្រភេទ",
    cost: "ថ្លៃឈ្នួល",
    people: "នាក់/បន្ទប់",
    pros: "ចំណុចល្អ",
    cons: "ចំណុចអាក្រក់",
    verified: "បានផ្ទៀងផ្ទាត់",
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
  },
  mm: {
    title: "ကုမ္ပဏီ/အဆောင် သုံးသပ်ချက်",
    searchPlaceholder: "ကုမ္ပဏီအမည် ရှာဖွေရန်",
    write: "ရေးမည်",
    totalRating: "စုစုပေါင်းအမှတ်",
    compRating: "ကုမ္ပဏီ စိတ်ကျေနပ်မှု",
    dormRating: "အဆောင် အဆင့်",
    salary: "လစာ/အိုတီ",
    safety: "ဘေးကင်းရေး",
    food: "အစားအသောက်",
    dormType: "အဆောင်ပုံစံ",
    cost: "အဆောင်ခ",
    people: "ယောက်/အခန်း",
    pros: "ကောင်းကွက်",
    cons: "ဆိုးကွက်",
    verified: "အတည်ပြုပြီး",
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
  },
  uz: {
    title: "Kompaniya/Yotoqxona",
    searchPlaceholder: "Kompaniya nomini qidirish",
    write: "Yozish",
    totalRating: "Umumiy baho",
    compRating: "Kompaniya",
    dormRating: "Yotoqxona",
    salary: "Maosh/Ish vaqti",
    safety: "Xavfsizlik",
    food: "Ovqat",
    dormType: "Turi",
    cost: "Narxi",
    people: "kishi/xona",
    pros: "Afzallik",
    cons: "Kamchilik",
    verified: "Tasdiqlangan",
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
  },
};

// =========================================================
// [Data] 리뷰 목업 데이터 생성기
// =========================================================
const getMockReviews = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];

  return [
    {
      id: 1,
      name: "S Electronics Partner",
      industry: "Electronics",
      location: l({
        kr: "화성시 반월동",
        vn: "Hwaseong Banwol",
        kh: "Hwaseong",
        mm: "Hwaseong",
        uz: "Hwaseong",
      }),
      ratingTotal: 4.5,
      ratingComp: 4.8,
      ratingDorm: 4.2,
      tags: ["goodPay", "goodDorm"],
      dormInfo: {
        type: "apartment", // apartment, oneroom, container, factory
        cost: 0, // 0이면 무료
        people: 2,
        lunch: true,
      },
      review: {
        title: l({
          kr: "돈 많이 벌고 싶으면 오세요",
          vn: "Muốn kiếm nhiều tiền thì vào đây",
          kh: "ចង់បានលុយច្រើនមកទីនេះ",
          mm: "ပိုက်ဆံများများလိုချင်ရင် လာခဲ့ပါ",
          uz: "Ko'p pul topishni xohlasangiz keling",
        }),
        pros: l({
          kr: "잔업 특근 많아서 월급 350 이상 나옵니다. 밥 맛있어요.",
          vn: "Tăng ca nhiều, lương trên 3.5 triệu won. Cơm ngon.",
          kh: "ការងារថែមម៉ោងច្រើន ប្រាក់ខែលើសពី ៣.៥ លានវ៉ុន។ បាយឆ្ងាញ់។",
          mm: "အိုတီများလို့ လစာ ၃၅ သိန်းကျော်ရတယ်။ ထမင်းကောင်းတယ်။",
          uz: "Ish ko'p, maosh 3.5 mln vondan oshadi. Ovqat mazali.",
        }),
        cons: l({
          kr: "일이 좀 힘들고 서서 일해야 합니다.",
          vn: "Công việc hơi vất vả, phải đứng làm việc.",
          kh: "ការងាររាងហត់ ត្រូវឈរធ្វើការ។",
          mm: "အလုပ်ပင်ပန်းပြီး မတ်တပ်ရပ်လုပ်ရတယ်။",
          uz: "Ish og'irroq, tik turib ishlash kerak.",
        }),
      },
      date: "2025.12.28",
    },
    {
      id: 2,
      name: "Daewon Plating Co.",
      industry: "Plating",
      location: l({
        kr: "안산시 원곡동",
        vn: "Ansan Wongok",
        kh: "Ansan",
        mm: "Ansan",
        uz: "Ansan",
      }),
      ratingTotal: 2.5,
      ratingComp: 3.0,
      ratingDorm: 1.5,
      tags: ["bad"],
      dormInfo: {
        type: "container",
        cost: 200000,
        people: 4,
        lunch: true,
      },
      review: {
        title: l({
          kr: "기숙사가 너무 추워요",
          vn: "KTX lạnh quá",
          kh: "កន្លែងស្នាក់នៅត្រជាក់ពេក",
          mm: "အဆောင်က အရမ်းအေးတယ်",
          uz: "Yotoqxona juda sovuq",
        }),
        pros: l({
          kr: "사장님은 착해요. 월급은 안 밀려요.",
          vn: "Giám đốc tốt bụng. Lương không bị chậm.",
          kh: "ថៅកែចិត្តល្អ។ ប្រាក់ខែមិនយឺតទេ។",
          mm: "သူဌေးသဘောကောင်းတယ်။ လစာမနောက်ကျဘူး။",
          uz: "Boshliq yaxshi. Maosh vaqtida.",
        }),
        cons: l({
          kr: "컨테이너 기숙사인데 난방이 잘 안돼요. 겨울에 죽음입니다.",
          vn: "KTX container, sưởi kém. Mùa đông lạnh chết.",
          kh: "កន្លែងស្នាក់នៅជាកុងតឺន័រ គ្មានកំដៅ។ រដូវរងាពិបាកណាស់។",
          mm: "ကွန်တိန်နာအဆောင်မို့ အပူပေးစက်မကောင်းဘူး။ ဆောင်းတွင်းဆို သေလောက်တယ်။",
          uz: "Konteyner yotoqxona, isitish yomon. Qishda muzlab qolasiz.",
        }),
      },
      date: "2025.12.20",
    },
    {
      id: 3,
      name: "Green Farm",
      industry: "Agriculture",
      location: l({
        kr: "포천시",
        vn: "Pocheon",
        kh: "Pocheon",
        mm: "Pocheon",
        uz: "Pocheon",
      }),
      ratingTotal: 3.8,
      ratingComp: 3.5,
      ratingDorm: 4.5,
      tags: ["goodDorm"],
      dormInfo: {
        type: "oneroom",
        cost: 0,
        people: 1,
        lunch: false,
      },
      review: {
        title: l({
          kr: "숙소는 좋은데 일이 불규칙해요",
          vn: "Chỗ ở tốt nhưng việc không đều",
          kh: "កន្លែងស្នាក់នៅល្អ ប៉ុន្តែការងារមិនទៀងទាត់",
          mm: "နေစရာကောင်းပေမယ့် အလုပ်မမှန်ဘူး",
          uz: "Yashash joyi yaxshi, lekin ish doimiy emas",
        }),
        pros: l({
          kr: "1인 1실 원룸 줍니다. 깨끗하고 좋아요.",
          vn: "Cho ở phòng riêng 1 người. Sạch sẽ.",
          kh: "បន្ទប់មួយនៅម្នាក់ឯង។ ស្អាតល្អ។",
          mm: "တစ်ယောက်ခန်း ပေးတယ်။ သန့်ရှင်းပြီးကောင်းတယ်။",
          uz: "Bir kishilik xona berishadi. Toza va yaxshi.",
        }),
        cons: l({
          kr: "비수기에는 일이 별로 없어서 돈이 안돼요.",
          vn: "Mùa thấp điểm ít việc nên ít tiền.",
          kh: "រដូវមិនសូវមានការងារ លុយតិច។",
          mm: "အလုပ်ပါးချိန်ဆို ပိုက်ဆံမရဘူး။",
          uz: "Mavsum bo'lmasa ish kam, pul kam.",
        }),
      },
      date: "2025.12.15",
    },
    {
      id: 4,
      name: "HK Metal",
      industry: "Manufacturing",
      location: l({
        kr: "시흥시 정왕동",
        vn: "Siheung",
        kh: "Siheung",
        mm: "Siheung",
        uz: "Siheung",
      }),
      ratingTotal: 4.0,
      ratingComp: 4.0,
      ratingDorm: 3.5,
      tags: ["goodPay"],
      dormInfo: {
        type: "apartment",
        cost: 150000,
        people: 3,
        lunch: true,
      },
      review: {
        title: l({
          kr: "평범한 공장입니다",
          vn: "Xưởng bình thường",
          kh: "រោងចក្រធម្មតា",
          mm: "သာမန်စက်ရုံပါ",
          uz: "Oddiy zavod",
        }),
        pros: l({
          kr: "상여금 400% 있습니다. 밥 맛있어요.",
          vn: "Thưởng 400%. Cơm ngon.",
          kh: "ប្រាក់រង្វាន់ ៤០០%។ បាយឆ្ងាញ់។",
          mm: "ဘောနပ်စ် ၄၀၀% ရှိတယ်။ ထမင်းကောင်းတယ်။",
          uz: "Bonus 400% bor. Ovqat mazali.",
        }),
        cons: l({
          kr: "기숙사에 사람이 좀 많아요. 화장실 전쟁.",
          vn: "KTX hơi đông. Tranh nhau nhà vệ sinh.",
          kh: "មនុស្សច្រើននៅកន្លែងស្នាក់នៅ។ ពិបាករឿងបន្ទប់ទឹក។",
          mm: "အဆောင်မှာ လူနည်းနည်းများတယ်။ အိမ်သာလုရတယ်။",
          uz: "Yotoqxonada odam ko'p. Tualet muammo.",
        }),
      },
      date: "2025.12.10",
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
type ViewState = "list" | "detail" | "write";

export default function CompanyReview({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const reviews = useMemo(() => getMockReviews(lang), [lang]);

  // 필터링 로직
  const filteredReviews = reviews.filter((r) => {
    // 1. 검색어 필터
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;

    // 2. 카테고리 필터
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

  const handleBack = () => {
    setView("list");
    setSelectedReview(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden font-sans bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {view !== "list" ? (
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
        {view === "list" && (
          <button className="p-2 text-indigo-600 rounded-full bg-indigo-50">
            <Filter size={20} />
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
        {/* 1. LIST VIEW */}
        {view === "list" && (
          <div className="p-4 space-y-4">
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

            {/* Reviews List */}
            <div className="space-y-3">
              {filteredReviews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleReviewClick(item)}
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
                      <span
                        className={`font-bold ${
                          item.ratingComp >= 4
                            ? "text-green-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.ratingComp}
                      </span>
                    </div>
                    <div className="w-[1px] bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] mb-0.5">{t.dormRating}</span>
                      <span
                        className={`font-bold ${
                          item.ratingDorm >= 4
                            ? "text-green-600"
                            : item.ratingDorm <= 2
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
              ))}
            </div>
          </div>
        )}

        {/* 2. DETAIL VIEW */}
        {view === "detail" && selectedReview && (
          <div className="pb-24">
            {/* Header Info */}
            <div className="p-5 pb-8 bg-white border-b border-gray-100">
              <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded mb-2">
                {selectedReview.industry}
              </div>
              <h2 className="mb-1 text-2xl font-black text-gray-900">
                {selectedReview.name}
              </h2>
              <div className="flex items-center gap-1 mb-6 text-sm text-gray-500">
                <MapPin size={14} /> {selectedReview.location}
              </div>

              {/* Big Score Card */}
              <div className="flex items-center justify-between p-5 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl shadow-indigo-200">
                <div>
                  <div className="mb-1 text-xs font-bold text-indigo-100">
                    {t.totalRating}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black">
                      {selectedReview.ratingTotal}
                    </span>
                    <div className="flex flex-col text-xs text-indigo-100">
                      <StarRating score={selectedReview.ratingTotal} />
                      <span>{t.verified}</span>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-white/20"></div>
                <div className="flex flex-col gap-1 text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-indigo-100">
                    {t.compRating}{" "}
                    <span className="text-sm font-bold text-white">
                      {selectedReview.ratingComp}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs text-indigo-100">
                    {t.dormRating}{" "}
                    <span className="text-sm font-bold text-white">
                      {selectedReview.ratingDorm}
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
                      {t.dormType}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {t.dormTags[selectedReview.dormInfo.type]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                      {t.cost}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {selectedReview.dormInfo.cost === 0
                        ? "Free"
                        : `${selectedReview.dormInfo.cost / 10000}0,000`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                      {t.people}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-800">
                      <BedDouble size={14} /> {selectedReview.dormInfo.people}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400">
                      {t.food}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gray-800">
                      <Utensils size={14} />{" "}
                      {selectedReview.dormInfo.lunch ? "OK" : "NO"}
                    </span>
                  </div>
                </div>
                {/* Fake Image */}
                <div className="flex items-center justify-center w-full h-32 gap-1 mt-4 text-xs border rounded-lg bg-slate-100 text-slate-400 border-slate-200">
                  <Camera size={16} /> Dormitory Image (No Data)
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
                  "{selectedReview.review.title}"
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ThumbsUp size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-blue-600">
                      {t.pros}
                    </span>
                  </div>
                  <p className="p-3 text-sm leading-relaxed text-gray-600 rounded-lg bg-blue-50/50">
                    {selectedReview.review.pros}
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
                    {selectedReview.review.cons}
                  </p>
                </div>
                <div className="pt-2 text-xs text-right text-gray-400 border-t border-gray-100">
                  Written on {selectedReview.date}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. WRITE VIEW (Mock) */}
        {view === "write" && (
          <div className="flex flex-col w-full h-full duration-300 bg-white animate-in slide-in-from-bottom">
            <header className="flex items-center justify-between px-4 border-b border-gray-100 h-14 shrink-0">
              <button onClick={handleBack} className="text-sm text-gray-600">
                Cancel
              </button>
              <span className="font-bold text-gray-900">{t.write}</span>
              <button
                onClick={handleBack}
                className="text-sm font-bold text-indigo-600"
              >
                Save
              </button>
            </header>
            <div className="flex flex-col items-center justify-center h-full gap-4 p-5 text-gray-400">
              <div className="flex items-center justify-center w-20 h-20 mb-2 bg-gray-100 rounded-full">
                <PenLine size={32} />
              </div>
              <p className="text-sm text-center">
                회사를 검색하고
                <br />
                리뷰를 작성하는 기능이 추가될 예정입니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAB (Write Button) */}
      {view === "list" && (
        <button
          onClick={() => setView("write")}
          className="absolute bottom-6 right-5 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 z-30"
        >
          <PenLine size={20} />
          <span className="text-sm font-bold">{t.write}</span>
        </button>
      )}
    </div>
  );
}
