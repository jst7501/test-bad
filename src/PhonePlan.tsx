import { useState, useMemo } from "react";
import {
  Smartphone,
  Wifi,
  ChevronLeft,
  Phone,
  Search,
  Signal,
  MapPin,
  Star,
} from "lucide-react";

// =========================================================
// [Translation] UI 번역
// =========================================================
const UI_DICT: any = {
  kr: {
    title: "알뜰폰 요금제",
    bannerTitle: "우리동네 핸드폰 성지! (외국인 환영)",
    bannerDesc: "여권 개통 OK / 선불 유심 즉시 개통 / 최신폰 할인",
    visit: "매장 방문하기",
    all: "전체",
    prepaid: "선불(유심)",
    postpaid: "후불(월요금)",
    data: "데이터",
    voice: "통화",
    msg: "문자",
    apply: "가입 신청",
    consult: "상담하기",
    network: "통신망",
    price: "월 요금",
    won: "원",
    unlimited: "무제한",
    exhausted: "소진 시",
    free: "기본제공",
    details: "상세 스펙",
    review: "후기",
  },
  vn: {
    title: "Gói cước di động",
    bannerTitle: "Cửa hàng điện thoại Global! (Chào đón người nước ngoài)",
    bannerDesc: "Mở bằng hộ chiếu OK / SIM trả trước / Giảm giá máy mới",
    visit: "Ghé thăm cửa hàng",
    all: "Tất cả",
    prepaid: "Trả trước",
    postpaid: "Trả sau",
    data: "Data",
    voice: "Gọi",
    msg: "SMS",
    apply: "Đăng ký",
    consult: "Tư vấn",
    network: "Mạng",
    price: "Giá/tháng",
    won: "won",
    unlimited: "Không giới hạn",
    exhausted: "Hết data tốc độ",
    free: "Miễn phí",
    details: "Chi tiết",
    review: "Đánh giá",
  },
  kh: {
    title: "គម្រោងទូរស័ព្ទ",
    bannerTitle: "ហាងទូរស័ព្ទ Global! (ស្វាគមន៍ជនបរទេស)",
    bannerDesc: "លិខិតឆ្លងដែន OK / SIM បង់ប្រាក់ជាមុន / បញ្ចុះតម្លៃ",
    visit: "ទស្សនាហាង",
    all: "ទាំងអស់",
    prepaid: "បង់មុន",
    postpaid: "បង់ក្រោយ",
    data: "អ៊ីនធឺណិត",
    voice: "ហៅ",
    msg: "សារ",
    apply: "ចុះឈ្មោះ",
    consult: "ប្រឹក្សា",
    network: "បណ្តាញ",
    price: "តម្លៃ/ខែ",
    won: "វ៉ុន",
    unlimited: "មិនកំណត់",
    exhausted: "ល្បឿនបន្ទាប់",
    free: "ឥតគិតថ្លៃ",
    details: "លម្អិត",
    review: "ការវាយតម្លៃ",
  },
  mm: {
    title: "ဖုန်းဘေလ်အစီအစဉ်",
    bannerTitle: "Global ဖုန်းဆိုင်! (နိုင်ငံခြားသား ကြိုဆိုပါသည်)",
    bannerDesc: "ပတ်စ်ပို့ဖြင့်ရသည် / ကြိုပေးဆင်းကဒ် / ဖုန်းအသစ်လျှော့စျေး",
    visit: "ဆိုင်သို့သွားရန်",
    all: "အားလုံး",
    prepaid: "ကြိုပေး (Prepaid)",
    postpaid: "လပေး (Postpaid)",
    data: "ဒေတာ",
    voice: "ဖုန်းခေါ်",
    msg: "စာတို",
    apply: "လျှောက်ထားမည်",
    consult: "ဆွေးနွေးမည်",
    network: "ကွန်ရက်",
    price: "လစဉ်ကြေး",
    won: "ဝမ်",
    unlimited: "အကန့်အသတ်မရှိ",
    exhausted: "ကုန်ပြီးနောက်",
    free: "အခမဲ့",
    details: "အသေးစိတ်",
    review: "သုံးသပ်ချက်",
  },
  uz: {
    title: "Mobil Tariflar",
    bannerTitle: "Global Telefon Do'koni! (Chet elliklar uchun)",
    bannerDesc: "Pasport bilan OK / Oldindan to'lov SIM / Chegirmalar",
    visit: "Do'konga borish",
    all: "Barchasi",
    prepaid: "Prepaid (Oldindan)",
    postpaid: "Postpaid (Oylik)",
    data: "Internet",
    voice: "Qo'ng'iroq",
    msg: "SMS",
    apply: "Ulanish",
    consult: "Maslahat",
    network: "Tarmoq",
    price: "Oylik to'lov",
    won: "von",
    unlimited: "Cheksiz",
    exhausted: "Tugaganda",
    free: "Bepul",
    details: "Tafsilotlar",
    review: "Sharhlar",
  },
};

// =========================================================
// [Data] 요금제 목업 데이터
// =========================================================
const getMockPlans = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];
  const t = UI_DICT[lang] || UI_DICT["kr"];

  const RAW_DATA = [
    // [Prepaid] 선불 요금제
    {
      id: 1,
      name: "Prepaid Data 15GB+",
      provider: "Woori Mobile",
      network: "KT",
      type: "prepaid",
      dataMain: "15GB",
      dataSub: "3Mbps", // 소진 시 속도
      voice: "100min",
      sms: "100",
      price: 36000,
      badge: "BEST",
      color: "bg-pink-100 text-pink-700",
      desc: l({
        kr: "가성비 최고의 선불 요금제",
        vn: "Gói trả trước giá tốt nhất",
        kh: "គម្រោងបង់ប្រាក់ជាមុនល្អបំផុត",
        mm: "တန်ဖိုးအရှိဆုံး ကြိုပေးအစီအစဉ်",
        uz: "Eng yaxshi prepaid tarif",
      }),
    },
    {
      id: 2,
      name: "Prepaid Unlimited 11GB",
      provider: "Chingu Tongsin",
      network: "LG U+",
      type: "prepaid",
      dataMain: "11GB",
      dataSub: "Daily 2GB+3Mbps",
      voice: t.unlimited,
      sms: t.unlimited,
      price: 55000,
      badge: "HOT",
      color: "bg-red-100 text-red-700",
      desc: l({
        kr: "데이터/통화 완전 무제한",
        vn: "Data/Cuộc gọi không giới hạn",
        kh: "អ៊ីនធឺណិត/ការហៅទូរស័ព្ទមិនកំណត់",
        mm: "ဒေတာ/ဖုန်း အကန့်အသတ်မရှိ",
        uz: "Cheksiz internet va qo'ng'iroq",
      }),
    },
    {
      id: 3,
      name: "Prepaid Lite 300MB",
      provider: "Korea Sim",
      network: "SKT",
      type: "prepaid",
      dataMain: "300MB",
      dataSub: "X",
      voice: "Wait",
      sms: "50",
      price: 4400,
      badge: "CHEAP",
      color: "bg-gray-100 text-gray-700",
      desc: l({
        kr: "본인인증용 저렴한 요금제",
        vn: "Gói rẻ để xác thực danh tính",
        kh: "គម្រោងតម្លៃថោកសម្រាប់ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ",
        mm: "အတည်ပြုရန်အတွက် ဈေးသက်သာသော အစီအစဉ်",
        uz: "Identifikatsiya uchun arzon tarif",
      }),
    },

    // [Postpaid] 후불 요금제
    {
      id: 4,
      name: "Postpaid 7GB+1Mbps",
      provider: "K-Mobile",
      network: "KT",
      type: "postpaid",
      dataMain: "7GB",
      dataSub: "1Mbps",
      voice: t.unlimited,
      sms: t.unlimited,
      price: 17500,
      badge: "PROMO",
      color: "bg-blue-100 text-blue-700",
      discount: "7 months",
      desc: l({
        kr: "7개월간 파격 할인 이벤트",
        vn: "Khuyến mãi giảm giá 7 tháng",
        kh: "ការបញ្ចុះតម្លៃពិសេសរយៈពេល ៧ ខែ",
        mm: "၇ လကြာ အထူးလျှော့ဈေး",
        uz: "7 oy davomida chegirma",
      }),
    },
    {
      id: 5,
      name: "Postpaid 15GB+3Mbps",
      provider: "Global Cell",
      network: "LG U+",
      type: "postpaid",
      dataMain: "15GB",
      dataSub: "3Mbps",
      voice: "100min",
      sms: "100",
      price: 28900,
      badge: "RECOMMEND",
      color: "bg-purple-100 text-purple-700",
      desc: l({
        kr: "약정 없이 쓰는 데이터 무제한",
        vn: "Data không giới hạn, không hợp đồng",
        kh: "អ៊ីនធឺណិតមិនកំណត់ គ្មានកិច្ចសន្យា",
        mm: "စာချုပ်မရှိဘဲ ဒေတာအကန့်အသတ်မရှိ",
        uz: "Shartnomasiz cheksiz internet",
      }),
    },
    {
      id: 6,
      name: "Postpaid 100GB (5G)",
      provider: "SK 7 Mobile",
      network: "SKT",
      type: "postpaid",
      dataMain: "100GB",
      dataSub: "5Mbps",
      voice: t.unlimited,
      sms: t.unlimited,
      price: 42000,
      badge: "5G",
      color: "bg-orange-100 text-orange-700",
      desc: l({
        kr: "빠른 5G 데이터 대용량",
        vn: "Dung lượng lớn 5G tốc độ cao",
        kh: "ទិន្នន័យ 5G ល្បឿនលឿន",
        mm: "မြန်ဆန်သော 5G ဒေတာ အများကြီး",
        uz: "Tezkor 5G katta trafik",
      }),
    },
    {
      id: 7,
      name: "Postpaid Saver 1.5GB",
      provider: "Hello Mobile",
      network: "LG U+",
      type: "postpaid",
      dataMain: "1.5GB",
      dataSub: "X",
      voice: "150min",
      sms: "50",
      price: 6600,
      badge: "SAVE",
      color: "bg-green-100 text-green-700",
      desc: l({
        kr: "와이파이 주로 쓰시는 분",
        vn: "Dành cho người hay dùng Wifi",
        kh: "សម្រាប់អ្នកប្រើ Wi-Fi ច្រើន",
        mm: "WiFi အဓိကသုံးသူများအတွက်",
        uz: "Asosan Wi-Fi ishlatadiganlar uchun",
      }),
    },
  ];

  return RAW_DATA;
};

// =========================================================
// [Main Component]
// =========================================================
type ViewState = "list" | "detail";

export default function PhonePlan({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [filterType, setFilterType] = useState<"all" | "prepaid" | "postpaid">(
    "all"
  );

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const plans = useMemo(() => getMockPlans(lang), [lang]);

  const filteredPlans = plans.filter((p) => {
    if (filterType === "all") return true;
    return p.type === filterType;
  });

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedPlan(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-slate-50">
      {view === "list" && (
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
            <h1 className="flex items-center gap-2 text-xl font-black tracking-tight text-violet-700">
              <Smartphone size={24} /> {t.title}
            </h1>
            <div className="p-2 text-gray-500 bg-gray-100 rounded-full">
              <Search size={20} />
            </div>
          </header>

          <div className="flex-1 pb-24 overflow-y-auto scrollbar-hide">
            {/* 1. 상단 광고 배너 (핸드폰 가게) */}
            <div className="p-5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold mb-2 inline-block">
                    AD
                  </span>
                  <h2 className="mb-1 text-lg font-bold leading-tight">
                    {t.bannerTitle}
                  </h2>
                  <p className="text-xs text-white/80">{t.bannerDesc}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur">
                  <MapPin size={24} className="text-white" />
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-violet-700 font-bold py-2 rounded-lg text-xs hover:bg-gray-50 transition active:scale-[0.98]">
                {t.visit}
              </button>
            </div>

            {/* 2. 필터 탭 */}
            <div className="sticky top-0 z-10 flex gap-2 p-4 bg-slate-50/95 backdrop-blur">
              {[
                { id: "all", label: t.all },
                { id: "prepaid", label: t.prepaid },
                { id: "postpaid", label: t.postpaid },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    filterType === tab.id
                      ? "bg-violet-600 text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3. 요금제 리스트 */}
            <div className="px-4 space-y-4">
              {filteredPlans.map((plan: any) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanClick(plan)}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm active:scale-[0.99] transition cursor-pointer relative overflow-hidden"
                >
                  {/* 뱃지 */}
                  {plan.badge && (
                    <span
                      className={`absolute top-0 left-0 px-3 py-1 rounded-br-xl text-[10px] font-bold ${plan.color}`}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-start justify-between mt-2 mb-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1 text-xs font-bold text-gray-400">
                        <Signal size={12} /> {plan.network} · {plan.provider}
                      </div>
                      <h3 className="text-base font-bold text-gray-900">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-violet-600">
                        {plan.price.toLocaleString()}
                        {t.won}
                      </div>
                      {plan.discount && (
                        <div className="text-[10px] text-red-500 font-bold bg-red-50 px-1 rounded inline-block">
                          {plan.discount} DC
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 데이터 스펙 (핵심) */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full text-violet-600">
                        <Wifi size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold">
                          {t.data}
                        </div>
                        <div className="text-sm font-bold text-gray-800">
                          {plan.dataMain}
                          {plan.dataSub !== "X" && (
                            <span className="text-xs font-normal text-gray-500">
                              {" "}
                              + {plan.dataSub}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-200"></div>
                    <div className="text-center min-w-[60px]">
                      <div className="text-[10px] text-gray-400 font-bold">
                        {t.voice}
                      </div>
                      <div className="text-xs font-bold text-gray-700">
                        {plan.voice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail View */}
      {view === "detail" && selectedPlan && (
        <div className="flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
          {/* Nav */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white">
            <button
              onClick={handleBack}
              className="p-2 text-gray-700 bg-gray-100 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-bold text-gray-900">{t.details}</span>
            <div className="w-10"></div>
          </div>

          <div className="flex-1 pb-24 overflow-y-auto">
            <div className="px-5">
              {/* Header Info */}
              <div className="py-6 text-center border-b border-gray-100">
                <div className="inline-block px-3 py-1 mb-3 text-xs font-bold rounded-full bg-violet-50 text-violet-600">
                  {selectedPlan.network} Network
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  {selectedPlan.name}
                </h2>
                <p className="mb-6 text-sm text-gray-500">
                  {selectedPlan.provider}
                </p>
                <div className="text-3xl font-black text-violet-600">
                  {selectedPlan.price.toLocaleString()}
                  <span className="text-lg font-medium text-gray-400">
                    {t.won}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-violet-600">
                      <Wifi size={24} />
                    </div>
                    <span className="font-bold text-gray-700">{t.data}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {selectedPlan.dataMain}
                    </div>
                    {selectedPlan.dataSub !== "X" && (
                      <div className="text-xs text-gray-500">
                        {t.exhausted} {selectedPlan.dataSub} {t.unlimited}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-blue-600 bg-white rounded-lg">
                      <Phone size={24} />
                    </div>
                    <span className="font-bold text-gray-700">{t.voice}</span>
                  </div>
                  <div className="text-lg font-bold text-right text-gray-900">
                    {selectedPlan.voice}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 text-green-600 bg-white rounded-lg">
                      <MessageSquare size={24} />
                    </div>
                    <span className="font-bold text-gray-700">{t.msg}</span>
                  </div>
                  <div className="text-lg font-bold text-right text-gray-900">
                    {selectedPlan.sms}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-5 border bg-violet-50/50 rounded-2xl border-violet-100">
                <h3 className="flex items-center gap-2 mb-2 font-bold text-violet-800">
                  <Star size={16} fill="currentColor" /> Point
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {selectedPlan.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 z-20 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3.5 rounded-xl text-sm">
              {t.consult}
            </button>
            <button className="flex-[2] bg-violet-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-200 text-sm">
              {t.apply}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Icon helper
function MessageSquare({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}
