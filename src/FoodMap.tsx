import { useState, useMemo } from "react";
import {
  Utensils,
  MapPin,
  Star,
  Search,
  ChevronLeft,
  Heart,
  Navigation,
  Clock,
  Phone,
} from "lucide-react";

// UI 번역
const UI_DICT: any = {
  kr: {
    title: "주변 맛집",
    search: "음식점 검색",
    filter: {
      all: "전체",
      KR: "한식",
      VN: "베트남",
      UZ: "우즈벡",
      ASIA: "아시안",
    },
    open: "영업중",
    closed: "마감",
    menu: "대표메뉴",
    review: "리뷰",
  },
  vn: {
    title: "Quán ngon",
    search: "Tìm nhà hàng",
    filter: {
      all: "Tất cả",
      KR: "Hàn Quốc",
      VN: "Việt Nam",
      UZ: "Uzbek",
      ASIA: "Châu Á",
    },
    open: "Mở cửa",
    closed: "Đóng cửa",
    menu: "Thực đơn",
    review: "Đánh giá",
  },
  kh: {
    title: "맛집ក្បែរនេះ",
    search: "ស្វែងរក",
    filter: {
      all: "ទាំងអស់",
      KR: "កូរ៉េ",
      VN: "វៀតណាម",
      UZ: "អ៊ូសបេគីស្ថាន",
      ASIA: "អាស៊ី",
    },
    open: "បើក",
    closed: "បិទ",
    menu: "ម៉ឺនុយ",
    review: "ការវាយតម្លៃ",
  },
  mm: {
    title: "စားသောက်ဆိုင်",
    search: "ရှာဖွေပါ",
    filter: {
      all: "အားလုံး",
      KR: "ကိုရီးယား",
      VN: "ဗီယက်နမ်",
      UZ: "ဥဇဘက်",
      ASIA: "အာရှ",
    },
    open: "ဖွင့်",
    closed: "ပိတ်",
    menu: "မီနူး",
    review: "သုံးသပ်ချက်",
  },
  uz: {
    title: "Restoranlar",
    search: "Qidirish",
    filter: {
      all: "Barchasi",
      KR: "Koreys",
      VN: "Vetnam",
      UZ: "O'zbek",
      ASIA: "Osiyo",
    },
    open: "Ochiq",
    closed: "Yopiq",
    menu: "Menyu",
    review: "Sharhlar",
  },
};

// 목업 데이터
const getMockRestaurants = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];
  return [
    {
      id: 1,
      name: l({
        kr: "고향 쌀국수",
        vn: "Phở Quê Hương",
        kh: "Phở Hometown",
        mm: "Phở Hometown",
        uz: "Phở Hometown",
      }),
      category: "VN",
      rating: 4.8,
      reviews: 120,
      dist: 300,
      open: true,
      time: "10:00 ~ 22:00",
      imgColor: "bg-emerald-100 text-emerald-600",
      desc: l({
        kr: "진한 국물의 현지식 쌀국수",
        vn: "Phở bò tái chín chuẩn vị",
        kh: "គុយទាវរសជាតិដើម",
        mm: "ဗီယက်နမ်ခေါက်ဆွဲ",
        uz: "Haqiqiy Vetnam sho'rva",
      }),
      menu: [
        { name: "Phở Bò", price: 9000 },
        { name: "Bánh Mì", price: 7000 },
      ],
    },
    {
      id: 2,
      name: l({
        kr: "사마르칸트 시티",
        vn: "Samarkand City",
        kh: "Samarkand City",
        mm: "Samarkand City",
        uz: "Samarkand City",
      }),
      category: "UZ",
      rating: 4.5,
      reviews: 85,
      dist: 500,
      open: true,
      time: "11:00 ~ 23:00",
      imgColor: "bg-blue-100 text-blue-600",
      desc: l({
        kr: "양고기 샤실릭 전문점",
        vn: "Thịt cừu nướng Shashlik",
        kh: "សាច់ចៀមអាំង",
        mm: "သိုးသားကင်",
        uz: "Eng zo'r Shashlik",
      }),
      menu: [
        { name: "Shashlik", price: 8000 },
        { name: "Samsa", price: 4000 },
      ],
    },
    {
      id: 3,
      name: l({
        kr: "대박 한식뷔페",
        vn: "Buffet Hàn Quốc",
        kh: "ប៊ូហ្វេកូរ៉េ",
        mm: "ကိုရီးယား ဘူဖေး",
        uz: "Koreys shved stoli",
      }),
      category: "KR",
      rating: 4.2,
      reviews: 200,
      dist: 150,
      open: false,
      time: "11:00 ~ 15:00",
      imgColor: "bg-red-100 text-red-600",
      desc: l({
        kr: "7,000원에 무제한 삼겹살/반찬",
        vn: "7,000 won ăn thoải mái",
        kh: "៧,០០០ វ៉ុន ញ៉ាំមួយឆ្អែត",
        mm: "၇,၀၀၀ ဝမ် အဝစား",
        uz: "7,000 von cheksiz ovqat",
      }),
      menu: [{ name: "Buffet", price: 7000 }],
    },
    {
      id: 4,
      name: l({
        kr: "방콕 야시장",
        vn: "Bangkok Night Market",
        kh: "Bangkok Market",
        mm: "Bangkok Market",
        uz: "Bangkok Market",
      }),
      category: "ASIA",
      rating: 4.6,
      reviews: 55,
      dist: 1200,
      open: true,
      time: "17:00 ~ 02:00",
      imgColor: "bg-orange-100 text-orange-600",
      desc: l({
        kr: "똠양꿍과 팟타이 맛집",
        vn: "Tom Yum & Pad Thai",
        kh: "Tom Yum & Pad Thai",
        mm: "Tom Yum & Pad Thai",
        uz: "Tom Yum & Pad Thai",
      }),
      menu: [
        { name: "Pad Thai", price: 11000 },
        { name: "Tom Yum", price: 15000 },
      ],
    },
  ];
};

export default function FoodMap({ lang }: { lang: string }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const list = useMemo(() => getMockRestaurants(lang), [lang]);

  const filtered = list.filter(
    (i) => filter === "all" || i.category === filter
  );

  const goDetail = (item: any) => {
    setSelectedItem(item);
    setView("detail");
  };
  const goBack = () => {
    setView("list");
    setSelectedItem(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full font-sans bg-slate-50">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {view === "detail" ? (
          <button onClick={goBack}>
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-lg font-bold text-orange-600">
            <Utensils size={24} /> {t.title}
          </div>
        )}
        <div className="p-2 bg-gray-100 rounded-full">
          <Search size={20} className="text-gray-500" />
        </div>
      </header>

      {view === "list" && (
        <div className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
          <div className="sticky top-0 z-10 p-4 bg-slate-50/95">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {Object.keys(t.filter).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    filter === key
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-gray-200 text-gray-500"
                  }`}
                >
                  {t.filter[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => goDetail(item)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.99] transition cursor-pointer flex gap-4"
              >
                <div
                  className={`w-24 h-24 rounded-lg flex-shrink-0 ${item.imgColor} flex items-center justify-center font-bold text-2xl`}
                >
                  {item.category}
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-gray-900">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Star
                        size={12}
                        className="text-yellow-400 fill-yellow-400"
                      />{" "}
                      {item.rating} ({item.reviews}) · {item.dist}m
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {item.desc}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.open
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.open ? t.open : t.closed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "detail" && selectedItem && (
        <div className="flex-1 pb-20 overflow-y-auto bg-white">
          <div
            className={`h-48 w-full ${selectedItem.imgColor} flex items-center justify-center text-4xl font-bold opacity-80`}
          >
            {selectedItem.category} Food
          </div>
          <div className="relative p-5 -mt-6 bg-white rounded-t-3xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {selectedItem.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <MapPin size={14} /> {selectedItem.dist}m{" "}
                  <span className="text-gray-300">|</span>{" "}
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />{" "}
                  {selectedItem.rating}
                </div>
              </div>
              <button className="p-2 rounded-full bg-gray-50">
                <Heart size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex justify-around py-4 mb-6 border-t border-b border-gray-100">
              <div className="text-center">
                <Phone size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-500">Call</span>
              </div>
              <div className="text-center">
                <Navigation size={20} className="mx-auto mb-1 text-blue-600" />
                <span className="text-xs text-gray-500">Map</span>
              </div>
              <div className="text-center">
                <Clock size={20} className="mx-auto mb-1 text-gray-600" />
                <span className="text-xs text-gray-500">
                  {selectedItem.time}
                </span>
              </div>
            </div>

            <h3 className="mb-3 font-bold text-gray-900">{t.menu}</h3>
            <div className="mb-6 space-y-2">
              {selectedItem.menu.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between p-3 rounded-lg bg-gray-50"
                >
                  <span className="font-medium text-gray-700">{m.name}</span>
                  <span className="font-bold text-gray-900">
                    {m.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="mb-3 font-bold text-gray-900">{t.review}</h3>
            <div className="p-4 text-sm text-center text-gray-500 bg-gray-50 rounded-xl">
              아직 리뷰가 없습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
