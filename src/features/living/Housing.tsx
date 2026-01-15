import { useState, useMemo } from "react";
import {
  Home,
  MapPin,
  Search,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  ChevronLeft,
  CheckCircle2,
  BedDouble,
  Maximize,
} from "lucide-react";

// =========================================================
// [Translation] UI 번역 데이터
// =========================================================
const UI_DICT: any = {
  kr: {
    title: "방 구하기",
    placeholder: "지역, 지하철역 검색",
    deposit: "보증금",
    rent: "월세",
    maintenance: "관리비",
    options: "옵션",
    desc: "상세 설명",
    contact: "문의하기",
    call: "전화하기",
    chat: "채팅",
    filter: "필터",
    listTitle: "추천 매물",
    types: { one: "원룸", two: "투룸", officetel: "오피스텔" },
    tags: {
      foreign: "외국인 환영",
      short: "단기 가능",
      full: "풀옵션",
      noDeposit: "무보증",
    },
    won: "만원",
  },
  vn: {
    title: "Tìm phòng",
    placeholder: "Tìm khu vực, ga tàu",
    deposit: "Tiền cọc",
    rent: "Tiền thuê",
    maintenance: "Phí quản lý",
    options: "Tiện ích",
    desc: "Mô tả",
    contact: "Liên hệ",
    call: "Gọi điện",
    chat: "Chat",
    filter: "Lọc",
    listTitle: "Phòng đề xuất",
    types: { one: "One-room", two: "Two-room", officetel: "Officetel" },
    tags: {
      foreign: "Chào đón người nước ngoài",
      short: "Ngắn hạn",
      full: "Full nội thất",
      noDeposit: "Không cọc",
    },
    won: "man",
  },
  kh: {
    title: "ស្វែងរកបន្ទប់",
    placeholder: "ស្វែងរកតំបន់",
    deposit: "ប្រាក់កក់",
    rent: "ឈ្នួលប្រចាំខែ",
    maintenance: "ថ្លៃគ្រប់គ្រង",
    options: "ជម្រើស",
    desc: "ការពិពណ៌នា",
    contact: "ទាក់ទង",
    call: "ហៅ",
    chat: "ជជែក",
    filter: "តម្រង",
    listTitle: "បន្ទប់ដែលបានណែនាំ",
    types: { one: "បន្ទប់មួយ", two: "បន្ទប់ពីរ", officetel: "Officetel" },
    tags: {
      foreign: "ស្វាគមន៍ជនបរទេស",
      short: "រយៈពេលខ្លី",
      full: "គ្រឿងសង្ហារឹមពេញ",
      noDeposit: "គ្មានប្រាក់កក់",
    },
    won: "ម៉ឺន",
  },
  mm: {
    title: "အခန်းငှားရန်",
    placeholder: "နေရာ ရှာဖွေပါ",
    deposit: "စပေါ်ငွေ",
    rent: "လခ",
    maintenance: "အုပ်ချုပ်မှုစရိတ်",
    options: "အပြင်အဆင်",
    desc: "အသေးစိတ်",
    contact: "ဆက်သွယ်ရန်",
    call: "ဖုန်းခေါ်",
    chat: "ချက်တင်",
    filter: "စစ်ထုတ်မည်",
    listTitle: "အကြံပြုထားသောအခန်းများ",
    types: { one: "One-room", two: "Two-room", officetel: "Officetel" },
    tags: {
      foreign: "နိုင်ငံခြားသားကြိုဆို",
      short: "ကာလတို",
      full: "ပရိဘောဂစုံ",
      noDeposit: "စပေါ်ငွေမလို",
    },
    won: "သောင်း",
  },
  uz: {
    title: "Uy topish",
    placeholder: "Hududni qidirish",
    deposit: "Depozit",
    rent: "Ijara haq",
    maintenance: "Xizmat haq",
    options: "Qulayliklar",
    desc: "Tavsif",
    contact: "Bog'lanish",
    call: "Tel",
    chat: "Chat",
    filter: "Filtr",
    listTitle: "Tavsiya etilgan",
    types: { one: "Bir xonali", two: "Ikki xonali", officetel: "Ofistel" },
    tags: {
      foreign: "Chet elliklar",
      short: "Qisqa muddat",
      full: "Jihozlangan",
      noDeposit: "Depozitsiz",
    },
    won: "man",
  },
};

// =========================================================
// [Data] 부동산 목업 데이터 생성기
// =========================================================
const getMockHouses = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];

  // 공통 옵션 아이콘 매핑은 컴포넌트 내부에서 처리
  const RAW_DATA = [
    {
      id: 1,
      type: "one",
      deposit: 300,
      rent: 35,
      maintenance: 5,
      location: l({
        kr: "화성시 반송동",
        vn: "Hwaseong Bansong-dong",
        kh: "Hwaseong Bansong-dong",
        mm: "Hwaseong Bansong-dong",
        uz: "Hwaseong Bansong-dong",
      }),
      title: l({
        kr: "삼성 셔틀 정류장 도보 3분, 풀옵션 원룸",
        vn: "Cách xe bus Samsung 3 phút, One-room full đồ",
        kh: "3 នាទីពីចំណតរថយន្ត Samsung បន្ទប់មួយ",
        mm: "Samsung ယာဉ်ရပ်နားစခန်း ၃ မိနစ်အကွာ",
        uz: "Samsung bekatiga 3 daqiqa, hamma sharoit bor",
      }),
      desc: l({
        kr: "채광 좋고 조용한 원룸입니다. 편의점 가깝고 버스 정류장 바로 앞이에요.",
        vn: "Phòng thoáng, yên tĩnh. Gần cửa hàng tiện lợi.",
        kh: "បន្ទប់ស្ងាត់ល្អ មានពន្លឺ។ ជិតម៉ាត។",
        mm: "အလင်းရောင်ကောင်းပြီး တိတ်ဆိတ်သည်။ စတိုးဆိုင်နီးသည်။",
        uz: "Yorug' va tinch xona. Do'kon yaqin.",
      }),
      tags: ["full", "foreign"],
      options: ["Bed", "Fridge", "Washer", "AC", "Gas"],
      size: "23m²",
      floor: "3F",
    },
    {
      id: 2,
      type: "one",
      deposit: 50,
      rent: 42,
      maintenance: 0,
      location: l({
        kr: "평택시 고덕면",
        vn: "Pyeongtaek Godeok",
        kh: "Pyeongtaek Godeok",
        mm: "Pyeongtaek Godeok",
        uz: "Pyeongtaek Godeok",
      }),
      title: l({
        kr: "무보증 단기 가능, 깔끔한 신축",
        vn: "Không cọc, cho thuê ngắn hạn, nhà mới",
        kh: "គ្មានប្រាក់កក់ ជួលរយៈពេលខ្លីបាន",
        mm: "စပေါ်ငွေမလို ကာလတိုငှားနိုင်",
        uz: "Depozitsiz, qisqa muddatga, yangi uy",
      }),
      desc: l({
        kr: "보증금 부담 없는 월세방입니다. 3개월 계약 가능합니다.",
        vn: "Không áp lực tiền cọc. Hợp đồng 3 tháng ok.",
        kh: "មិនបាច់បារម្ភប្រាក់កក់។ កិច្ចសន្យា ៣ ខែ។",
        mm: "စပေါ်ငွေအတွက် စိတ်ပူစရာမလို။ ၃ လစာချုပ် ရသည်။",
        uz: "Depozit muammosi yo'q. 3 oylik shartnoma mumkin.",
      }),
      tags: ["noDeposit", "short", "full"],
      options: ["TV", "Fridge", "Washer", "AC", "Microwave"],
      size: "20m²",
      floor: "2F",
    },
    {
      id: 3,
      type: "two",
      deposit: 1000,
      rent: 60,
      maintenance: 7,
      location: l({
        kr: "오산시 궐동",
        vn: "Osan Gwoldong",
        kh: "Osan Gwoldong",
        mm: "Osan Gwoldong",
        uz: "Osan Gwoldong",
      }),
      title: l({
        kr: "친구랑 같이 살기 좋은 투룸",
        vn: "Two-room rộng rãi, ở ghép thoải mái",
        kh: "បន្ទប់ពីរ សាកសមរស់នៅជាមួយមិត្តភក្តិ",
        mm: "သူငယ်ချင်းနဲ့နေဖို့ကောင်းတဲ့ အခန်းနှစ်ခန်းတွဲ",
        uz: "Do'st bilan yashash uchun qulay 2 xonali",
      }),
      desc: l({
        kr: "방 2개 거실 1개 구조입니다. 기숙사 나오시는 분들 추천해요.",
        vn: "2 phòng ngủ, 1 phòng khách. Thích hợp cho người rời KTX.",
        kh: "បន្ទប់គេង ២ បន្ទប់ទទួលភ្ញៀវ ១។",
        mm: "အိပ်ခန်း ၂ ခန်း ဧည့်ခန်း ၁ ခန်း။",
        uz: "2 xona, 1 mehmonxona. Yotoqxonadan chiqqanlarga tavsiya.",
      }),
      tags: ["foreign"],
      options: ["Stove", "Washer", "AC", "Closet"],
      size: "45m²",
      floor: "4F",
    },
    {
      id: 4,
      type: "officetel",
      deposit: 500,
      rent: 55,
      maintenance: 10,
      location: l({
        kr: "동탄역 인근",
        vn: "Gần ga Dongtan",
        kh: "Near Dongtan St.",
        mm: "Dongtan ဘူတာနီး",
        uz: "Dongtan stansiyasi yonida",
      }),
      title: l({
        kr: "보안 철저 오피스텔, 주차 가능",
        vn: "Officetel an ninh tốt, có chỗ đậu xe",
        kh: "Officetel សុវត្ថិភាពខ្ពស់ មានចំណត",
        mm: "လုံခြုံရေးကောင်းသော အိုဖစ်တဲလ်",
        uz: "Xavfsiz ofistel, parkovka bor",
      }),
      desc: l({
        kr: "경비실 있고 1층에 편의점 있습니다. 깨끗해요.",
        vn: "Có bảo vệ, cửa hàng tiện lợi tầng 1.",
        kh: "មានសន្តិសុខ និងម៉ាតនៅជាន់ផ្ទាល់ដី។",
        mm: "လုံခြုံရေးရှိ၊ အောက်ထပ်မှာ စတိုးဆိုင်ရှိ။",
        uz: "Qorovul bor, 1-qavatda do'kon bor.",
      }),
      tags: ["full", "foreign"],
      options: ["Elevator", "Fridge", "Washer", "AC", "Induction"],
      size: "28m²",
      floor: "12F",
    },
    {
      id: 5,
      type: "one",
      deposit: 100,
      rent: 30,
      maintenance: 3,
      location: l({
        kr: "안산시 원곡동",
        vn: "Ansan Wongok",
        kh: "Ansan Wongok",
        mm: "Ansan Wongok",
        uz: "Ansan Wongok",
      }),
      title: l({
        kr: "가성비 최고, 시장 근처",
        vn: "Giá rẻ, gần chợ",
        kh: "តម្លៃល្អ ជិតផ្សារ",
        mm: "ဈေးသက်သာ၊ ဈေးနီး",
        uz: "Arzon, bozor yonida",
      }),
      desc: l({
        kr: "연식은 좀 있지만 관리가 잘 되어 있습니다. 외국인 식당 많아요.",
        vn: "Nhà hơi cũ nhưng quản lý tốt. Nhiều quán ăn nước ngoài.",
        kh: "ផ្ទះចាស់បន្តិច តែកក់ក្តៅ។",
        mm: "အိမ်ဟောင်းပေမယ့် သန့်ရှင်းတယ်။",
        uz: "Eskiuy lekin toza. Chet el taomlari ko'p.",
      }),
      tags: ["short", "foreign"],
      options: ["Gas", "Fridge", "Washer"],
      size: "18m²",
      floor: "1F",
    },
    {
      id: 6,
      type: "one",
      deposit: 200,
      rent: 38,
      maintenance: 5,
      location: l({
        kr: "수원시 인계동",
        vn: "Suwon Ingye-dong",
        kh: "Suwon Ingye-dong",
        mm: "Suwon Ingye-dong",
        uz: "Suwon Ingye-dong",
      }),
      title: l({
        kr: "분리형 원룸, 베란다 있음",
        vn: "Phòng bếp riêng, có ban công",
        kh: "បន្ទប់ដាច់ដោយឡែក មានយ៉រ",
        mm: "မီးဖိုချောင်သီးသန့်၊ ဝရန်တာပါ",
        uz: "Oshxona alohida, balkon bor",
      }),
      desc: l({
        kr: "주방이랑 방이랑 분리되어 있어서 냄새 안 나요.",
        vn: "Bếp tách biệt nên không ám mùi.",
        kh: "ផ្ទះបាយដាច់ដោយឡែក គ្មានក្លិន។",
        mm: "အနံ့မနံအောင် မီးဖိုချောင်ခွဲထားတယ်။",
        uz: "Oshxona alohida, hid chiqmaydi.",
      }),
      tags: ["full"],
      options: ["Veranda", "Fridge", "Washer", "AC"],
      size: "26m²",
      floor: "3F",
    },
    {
      id: 7,
      type: "two",
      deposit: 2000,
      rent: 50,
      maintenance: 5,
      location: l({
        kr: "평택시 서정동",
        vn: "Pyeongtaek Seojeong",
        kh: "Pyeongtaek Seojeong",
        mm: "Pyeongtaek Seojeong",
        uz: "Pyeongtaek Seojeong",
      }),
      title: l({
        kr: "넓은 투룸, 전세 대출 가능",
        vn: "Two-room rộng, hỗ trợ vay Jeonse",
        kh: "បន្ទប់ពីរធំទូលាយ",
        mm: "ကျယ်ဝန်းသော အခန်းနှစ်ခန်းတွဲ",
        uz: "Katta 2 xonali uy",
      }),
      desc: l({
        kr: "거실이 넓어서 3명이서 살아도 됩니다.",
        vn: "Phòng khách rộng, ở 3 người thoải mái.",
        kh: "បន្ទប់ទទួលភ្ញៀវធំ អាចរស់នៅ ៣ នាក់។",
        mm: "ဧည့်ခန်းကျယ်လို့ ၃ ယောက်နေလို့ရတယ်။",
        uz: "Zal katta, 3 kishi yashasa bo'ladi.",
      }),
      tags: ["foreign"],
      options: ["Parking", "CCTV"],
      size: "50m²",
      floor: "2F",
    },
    {
      id: 8,
      type: "one",
      deposit: 300,
      rent: 45,
      maintenance: 5,
      location: l({
        kr: "화성시 향남읍",
        vn: "Hwaseong Hyangnam",
        kh: "Hwaseong Hyangnam",
        mm: "Hwaseong Hyangnam",
        uz: "Hwaseong Hyangnam",
      }),
      title: l({
        kr: "향남 제약단지 인근, 통근버스 라인",
        vn: "Gần khu dược Hyangnam, tuyến xe bus",
        kh: "ជិតតំបន់ឱសថ Hyangnam",
        mm: "Hyangnam ဆေးဝါးဇုန်အနီး",
        uz: "Hyangnam farmatsevtika zonasi yonida",
      }),
      desc: l({
        kr: "회사 다니기 정말 좋은 위치입니다. 조용해요.",
        vn: "Vị trí tốt để đi làm. Yên tĩnh.",
        kh: "ទីតាំងល្អសម្រាប់ការងារ។ ស្ងប់ស្ងាត់។",
        mm: "အလုပ်သွားရလွယ်ကူပြီး တိတ်ဆိတ်သည်။",
        uz: "Ishga qatnash uchun qulay joy.",
      }),
      tags: ["full", "foreign"],
      options: ["Desk", "Closet", "Bed", "AC"],
      size: "24m²",
      floor: "4F",
    },
  ];

  return RAW_DATA.map((item: any) => ({
    ...item,
    // 태그 등의 텍스트 처리는 렌더링 시점에 수행
  }));
};

// =========================================================
// [Main Component]
// =========================================================
type ViewState = "list" | "detail";

export default function Housing({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const houses = useMemo(() => getMockHouses(lang), [lang]);

  // 필터링 로직
  const filteredHouses = houses.filter((h: any) => {
    if (filter === "all") return true;
    return h.type === filter;
  });

  const handleHouseClick = (house: any) => {
    setSelectedHouse(house);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedHouse(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-slate-50">
      {view === "list" && (
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex flex-col bg-white border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between px-4 h-14">
              <h1 className="flex items-center gap-2 text-xl font-black tracking-tight text-blue-600">
                <Home size={24} /> {t.title}
              </h1>
              <div className="p-2 text-gray-500 bg-gray-100 rounded-full">
                <Search size={20} />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
              {["all", "one", "two", "officetel"].map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    filter === key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {key === "all" ? "All" : t.types[key]}
                </button>
              ))}
            </div>
          </header>

          {/* List View */}
          <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto scrollbar-hide">
            <h2 className="px-1 text-sm font-bold text-gray-500">
              {t.listTitle}{" "}
              <span className="text-blue-600">{filteredHouses.length}</span>
            </h2>
            {filteredHouses.map((house: any) => (
              <div
                key={house.id}
                onClick={() => handleHouseClick(house)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.99] transition cursor-pointer flex"
              >
                {/* Image Placeholder */}
                <div className="relative w-28 h-28 bg-slate-200 shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <Home size={32} />
                  </div>
                  {/* Type Badge */}
                  <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">
                    {t.types[house.type]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 p-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="text-lg font-extrabold text-gray-900">
                        {house.deposit}/{house.rent}
                      </h3>
                      <span className="text-xs text-gray-500">{t.won}</span>
                    </div>
                    <div className="mb-1 text-xs text-gray-500 truncate">
                      {house.location}
                    </div>
                    <div className="text-xs text-gray-800 line-clamp-1">
                      {house.title}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 mt-2">
                    {house.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium"
                      >
                        {t.tags[tag]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail View */}
      {view === "detail" && selectedHouse && (
        <div className="flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
          {/* Detail Header Image */}
          <div className="relative h-60 bg-slate-200 shrink-0">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <span className="text-sm">Room Image Placeholder</span>
            </div>
            <button
              onClick={handleBack}
              className="absolute p-2 text-gray-800 rounded-full shadow-sm top-4 left-4 bg-white/80 backdrop-blur"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="absolute flex gap-2 top-4 right-4">
              <button className="p-2 text-gray-800 rounded-full shadow-sm bg-white/80 backdrop-blur">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-800 rounded-full shadow-sm bg-white/80 backdrop-blur">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Content Scroll */}
          <div className="flex-1 pb-24 overflow-y-auto">
            <div className="p-5">
              {/* Type & Price */}
              <div className="mb-6">
                <span className="inline-block px-2 py-1 mb-2 text-xs font-bold text-blue-600 rounded-md bg-blue-50">
                  {t.types[selectedHouse.type]}
                </span>
                <h2 className="flex items-baseline gap-1 mb-1 text-3xl font-black text-gray-900">
                  {selectedHouse.deposit} / {selectedHouse.rent}{" "}
                  <span className="text-lg font-medium text-gray-500">
                    {t.won}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
                  {t.maintenance}: {selectedHouse.maintenance}
                  {t.won}
                </p>
              </div>

              <div className="w-full h-[1px] bg-gray-100 my-4"></div>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                  <Maximize size={20} className="mb-1 text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">
                    {selectedHouse.size}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                  <BedDouble size={20} className="mb-1 text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">
                    {t.types[selectedHouse.type]}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold leading-none text-gray-700">
                    {selectedHouse.floor}
                  </div>
                  <span className="text-[10px] text-gray-400">Floor</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-gray-900">{t.desc}</h3>
                <p className="p-4 text-sm leading-relaxed text-gray-600 bg-gray-50 rounded-xl">
                  {selectedHouse.title}
                  <br />
                  <br />
                  {selectedHouse.desc}
                </p>
              </div>

              {/* Options */}
              <div className="mb-6">
                <h3 className="mb-3 font-bold text-gray-900">{t.options}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedHouse.options.map((opt: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600"
                    >
                      <CheckCircle2 size={12} className="text-blue-500" /> {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="mb-4">
                <h3 className="flex items-center gap-1 mb-3 font-bold text-gray-900">
                  <MapPin size={18} /> {t.location}
                </h3>
                <div className="flex items-center justify-center w-full h-40 text-sm border bg-slate-100 rounded-xl text-slate-400 border-slate-200">
                  Map View
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {selectedHouse.location}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 z-20 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition">
              <MessageSquare size={18} /> {t.chat}
            </button>
            <button className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-[0.98] transition">
              <Phone size={18} /> {t.call}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
