import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Heart,
  MessageCircle,
  ChevronLeft,
  MoreVertical,
  Send,
  Camera,
  User,
} from "lucide-react";

// =========================================================
// [Translation] 5개국어 UI 사전
// =========================================================
const UI_DICT: any = {
  kr: {
    location: "반송동",
    write: "글쓰기",
    chat: "채팅하기",
    reserved: "예약중",
    sold: "거래완료",
    manner: "매너온도",
    priceOffer: "가격 제안 불가",
    inputPlace: "메시지 보내기",
    transPromise: "거래 약속",
    category: "카테고리",
    view: "조회",
    won: "원",
    free: "나눔",
  },
  vn: {
    location: "Bansong-dong",
    write: "Đăng tin",
    chat: "Chat ngay",
    reserved: "Đã đặt",
    sold: "Đã bán",
    manner: "Nhiệt độ",
    priceOffer: "K.mặc cả",
    inputPlace: "Nhập tin nhắn",
    transPromise: "Hẹn gặp",
    category: "Danh mục",
    view: "Xem",
    won: "₩",
    free: "Tặng",
  },
  kh: {
    location: "Bansong-dong",
    write: "សរសេរ",
    chat: "ជជែក",
    reserved: "កក់ទុក",
    sold: "លក់ហើយ",
    manner: "កំដៅ",
    priceOffer: "តម្លៃថេរ",
    inputPlace: "ផ្ញើសារ",
    transPromise: "ការណាត់ជួប",
    category: "ប្រភេទ",
    view: "មើល",
    won: "₩",
    free: "ឥតគិតថ្លៃ",
  },
  mm: {
    location: "Bansong-dong",
    write: "စာရေးမယ်",
    chat: "စကားပြောမယ်",
    reserved: "ဘိုကင်",
    sold: "ရောင်းပြီး",
    manner: "အမှတ်",
    priceOffer: "ဈေးမလျှော့ပါ",
    inputPlace: "စာပို့မယ်",
    transPromise: "ချိန်းဆိုမှု",
    category: "အမျိုးအစား",
    view: "ကြည့်ရှု",
    won: "₩",
    free: "အလကား",
  },
  uz: {
    location: "Bansong-dong",
    write: "Yozish",
    chat: "Chat",
    reserved: "Band",
    sold: "Sotildi",
    manner: "Reyting",
    priceOffer: "Narx oxiri",
    inputPlace: "Xabar yozish",
    transPromise: "Uchrashuv",
    category: "Kategoriya",
    view: "Ko'rish",
    won: "₩",
    free: "Tekin",
  },
};

// =========================================================
// [Data] 5개국어 상품 데이터 생성기
// =========================================================
const getProducts = (lang: string) => {
  //   const t = UI_DICT[lang] || UI_DICT["kr"];

  // 공통 데이터 템플릿 (언어별 텍스트만 교체)
  const RAW_DATA = [
    {
      id: 1,
      title: {
        kr: "아이패드 에어 5세대 64GB S급",
        vn: "iPad Air 5 64GB Loại S",
        kh: "iPad Air 5 64GB Grade S",
        mm: "iPad Air 5 64GB Grade S",
        uz: "iPad Air 5 64GB S-klass",
      },
      desc: {
        kr: "기스 하나 없는 S급입니다. 박스 풀박스입니다.",
        vn: "Không một vết xước, full box.",
        kh: "គ្មានស្នាមឆ្កូត ប្រអប់ពេញ។",
        mm: "အစင်းရာမရှိပါ၊ ဘူးအပြည့်အစုံပါဝင်သည်။",
        uz: "Qirilgan joyi yo'q, karobkasi bor.",
      },
      cat: {
        kr: "디지털기기",
        vn: "Điện tử",
        kh: "Electronics",
        mm: "အီလက်ထရွန်းနစ်",
        uz: "Elektronika",
      },
      price: 620000,
      image: "bg-gray-200",
      likes: 12,
      chats: 3,
      seller: "CoolGuy",
      status: "sale",
      time: "10m",
    },
    {
      id: 2,
      title: {
        kr: "시디즈 T50 의자 팝니다",
        vn: "Bán ghế Sidiz T50",
        kh: "លក់កៅអី Sidiz T50",
        mm: "Sidiz T50 ကုလားထိုင်ရောင်းမည်",
        uz: "Sidiz T50 stul sotiladi",
      },
      desc: {
        kr: "기능 고장난 곳 없습니다. 가지러 오셔야 해요.",
        vn: "Hoạt động tốt. Bạn cần tự đến lấy.",
        kh: "ដំណើរការល្អ។ ត្រូវមកយកផ្ទាល់។",
        mm: "ကောင်းမွန်စွာအလုပ်လုပ်သည်။ လာယူရမည်။",
        uz: "Yaxshi ishlaydi. Olib ketish kerak.",
      },
      cat: {
        kr: "가구",
        vn: "Nội thất",
        kh: "Furniture",
        mm: "ပရိဘောဂ",
        uz: "Mebel",
      },
      price: 80000,
      image: "bg-blue-100",
      likes: 5,
      chats: 1,
      seller: "ChairKing",
      status: "sale",
      time: "2h",
    },
    {
      id: 3,
      title: {
        kr: "갤럭시 버즈2 프로 미개봉",
        vn: "Galaxy Buds2 Pro Mới",
        kh: "Galaxy Buds2 Pro ថ្មី",
        mm: "Galaxy Buds2 Pro အသစ်",
        uz: "Yangi Galaxy Buds2 Pro",
      },
      desc: {
        kr: "선물 받았는데 안 써서 팝니다.",
        vn: "Được tặng nhưng không dùng.",
        kh: "ទទួលបានជាកាដូ តែមិនប្រើ។",
        mm: "လက်ဆောင်ရထားသော်လည်း မသုံးဖြစ်ပါ။",
        uz: "Sovg'a qilingan, lekin ishlatilmagan.",
      },
      cat: {
        kr: "오디오",
        vn: "Âm thanh",
        kh: "Audio",
        mm: "အသံ",
        uz: "Audio",
      },
      price: 130000,
      image: "bg-purple-100",
      likes: 24,
      chats: 8,
      seller: "MusicLover",
      status: "reserved",
      time: "5h",
    },
    {
      id: 4,
      title: {
        kr: "쿠쿠 전기밥솥 6인용",
        vn: "Nồi cơm điện Cuckoo 6 người",
        kh: "ឆ្នាំងបាយ Cuckoo",
        mm: "Cuckoo ထမင်းပေါင်းအိုး",
        uz: "Cuckoo guruch pishirgich",
      },
      desc: {
        kr: "자취방 뺄 때 필요 없어서 내놓습니다.",
        vn: "Chuyển nhà nên bán.",
        kh: "រើផ្ទះ លក់ចេញ។",
        mm: "အိမ်ပြောင်းလို့ ရောင်းတာပါ။",
        uz: "Ko'chib o'tayotganda sotilyapti.",
      },
      cat: {
        kr: "가전",
        vn: "Gia dụng",
        kh: "Appliances",
        mm: "အိမ်သုံးပစ္စည်း",
        uz: "Maishiy texnika",
      },
      price: 45000,
      image: "bg-red-100",
      likes: 3,
      chats: 0,
      seller: "OneRoom",
      status: "sale",
      time: "1d",
    },
    {
      id: 5,
      title: {
        kr: "나이키 덩크 로우 270",
        vn: "Nike Dunk Low 270",
        kh: "Nike Dunk Low 270",
        mm: "Nike Dunk Low 270",
        uz: "Nike Dunk Low 270",
      },
      desc: {
        kr: "실착 5회 미만입니다. 박스 있어요.",
        vn: "Đi ít hơn 5 lần. Có hộp.",
        kh: "ពាក់តិចជាង ៥ ដង។ មានប្រអប់។",
        mm: "၅ ကြိမ်အောက်သာ စီးဖူးသည်။ ဘူးပါရှိသည်။",
        uz: "5 martadan kam kiyilgan. Karobkasi bor.",
      },
      cat: {
        kr: "패션",
        vn: "Thời trang",
        kh: "Fashion",
        mm: "ဖက်ရှင်",
        uz: "Moda",
      },
      price: 90000,
      image: "bg-stone-200",
      likes: 42,
      chats: 15,
      seller: "Sneaker",
      status: "sold",
      time: "1d",
    },
    {
      id: 6,
      title: {
        kr: "이케아 철제 선반",
        vn: "Kệ sắt IKEA",
        kh: "ធ្នើដែក IKEA",
        mm: "IKEA သံစင်",
        uz: "IKEA temir tokcha",
      },
      desc: {
        kr: "분해해뒀습니다. 나사 다 있어요.",
        vn: "Đã tháo rời. Đủ ốc vít.",
        kh: "បានរុះរើ។ មានវីសគ្រប់គ្រាន់។",
        mm: "ဖြုတ်ထားပါသည်။ ဝက်အူများအစုံပါသည်။",
        uz: "Qismlarga ajratilgan. Vintlari bor.",
      },
      cat: {
        kr: "가구",
        vn: "Nội thất",
        kh: "Furniture",
        mm: "ပရိဘောဂ",
        uz: "Mebel",
      },
      price: 15000,
      image: "bg-yellow-100",
      likes: 11,
      chats: 4,
      seller: "Minimal",
      status: "sale",
      time: "2d",
    },
    {
      id: 7,
      title: {
        kr: "아이폰 12 미니 화이트",
        vn: "iPhone 12 Mini Trắng",
        kh: "iPhone 12 Mini ពណ៌ស",
        mm: "iPhone 12 Mini အဖြူရောင်",
        uz: "iPhone 12 Mini Oq",
      },
      desc: {
        kr: "배터리 85%. 상태 좋습니다.",
        vn: "Pin 85%. Tình trạng tốt.",
        kh: "ថ្ម 85%. ស្ថានភាពល្អ។",
        mm: "ဘက်ထရီ 85%. အခြေအနေကောင်းသည်။",
        uz: "Batareya 85%. Holati yaxshi.",
      },
      cat: {
        kr: "디지털",
        vn: "Điện tử",
        kh: "Digital",
        mm: "ဒစ်ဂျစ်တယ်",
        uz: "Raqamli",
      },
      price: 350000,
      image: "bg-indigo-100",
      likes: 30,
      chats: 12,
      seller: "AppleFarm",
      status: "sale",
      time: "3d",
    },
    {
      id: 8,
      title: {
        kr: "자전거 팝니다",
        vn: "Bán xe đạp",
        kh: "លក់កង់",
        mm: "စက်ဘီးရောင်းမည်",
        uz: "Velosiped sotiladi",
      },
      desc: {
        kr: "브레이크 잘 듭니다.",
        vn: "Phanh hoạt động tốt.",
        kh: "ហ្វ្រាំងដំណើរការល្អ។",
        mm: "ဘရိတ်ကောင်းသည်။",
        uz: "Tormoz yaxshi ishlaydi.",
      },
      cat: {
        kr: "스포츠",
        vn: "Thể thao",
        kh: "Sports",
        mm: "အားကစား",
        uz: "Sport",
      },
      price: 80000,
      image: "bg-orange-100",
      likes: 7,
      chats: 1,
      seller: "Rider",
      status: "sale",
      time: "4d",
    },
    {
      id: 9,
      title: {
        kr: "이사 박스 구해요",
        vn: "Cần mua thùng carton",
        kh: "ត្រូវការប្រអប់រើផ្ទះ",
        mm: "အိမ်ပြောင်းရန် ဘူးလိုချင်သည်",
        uz: "Ko'chish uchun quti kerak",
      },
      desc: {
        kr: "우체국 5호 크기 원해요.",
        vn: "Cần cỡ số 5 bưu điện.",
        kh: "ចង់បានទំហំប្រៃសណីយ៍លេខ ៥។",
        mm: "စာတိုက်ဘူး နံပါတ် ၅ အရွယ်အစားလိုချင်သည်။",
        uz: "Pochta qutisi 5-o'lchamda kerak.",
      },
      cat: {
        kr: "삽니다",
        vn: "Cần mua",
        kh: "Buy",
        mm: "ဝယ်မည်",
        uz: "Sotib olish",
      },
      price: 0,
      image: "bg-slate-200",
      likes: 1,
      chats: 2,
      seller: "Mover",
      status: "sale",
      time: "5d",
    },
    {
      id: 10,
      title: {
        kr: "무료 나눔 (책상)",
        vn: "Tặng miễn phí (Bàn)",
        kh: "ចែកជូនឥតគិតថ្លៃ (តុ)",
        mm: "အခမဲ့ ပေးသည် (စားပွဲ)",
        uz: "Tekin beriladi (Stol)",
      },
      desc: {
        kr: "직접 가져가셔야 합니다.",
        vn: "Bạn phải tự đến lấy.",
        kh: "ត្រូវមកយកផ្ទាល់។",
        mm: "ကိုယ်တိုင်လာယူရမည်။",
        uz: "O'zingiz olib ketishingiz kerak.",
      },
      cat: { kr: "나눔", vn: "Tặng", kh: "Free", mm: "အလကား", uz: "Tekin" },
      price: 0,
      image: "bg-emerald-100",
      likes: 55,
      chats: 20,
      seller: "Angel",
      status: "sale",
      time: "1w",
    },
  ];

  return RAW_DATA.map((item: any) => ({
    ...item,
    title: item.title[lang] || item.title["kr"],
    desc: item.desc[lang] || item.desc["kr"],
    category: item.cat[lang] || item.cat["kr"],
  }));
};

// ---------------------------------------------------------
// [Types]
// ---------------------------------------------------------
type ViewState = "list" | "detail" | "chat";

interface ChatMessage {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

// ---------------------------------------------------------
// [Main Component]
// ---------------------------------------------------------
export default function Carrot({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = useMemo(() => getProducts(lang), [lang]);
  const t = UI_DICT[lang] || UI_DICT["kr"];

  const goDetail = (product: any) => {
    setSelectedProduct(product);
    setView("detail");
  };

  const goChat = () => setView("chat");

  const goBack = () => {
    if (view === "chat") setView("detail");
    else if (view === "detail") {
      setView("list");
      setSelectedProduct(null);
    }
  };

  return (
    // relative와 h-full을 주어 내부의 absolute 요소들이
    // 메인 앱의 네비게이션(외부) 기준이 아닌 이 컨테이너 기준으로 배치되게 함
    <div className="relative w-full h-full overflow-hidden bg-white">
      {view === "list" && (
        <ProductList products={products} onProductClick={goDetail} t={t} />
      )}

      {view === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={goBack}
          onChat={goChat}
          t={t}
        />
      )}

      {view === "chat" && selectedProduct && (
        <ChatRoom product={selectedProduct} onBack={goBack} t={t} />
      )}
    </div>
  );
}

// ---------------------------------------------------------
// 1. 상품 목록 화면
// ---------------------------------------------------------
function ProductList({ products, onProductClick, t }: any) {
  return (
    <div className="w-full h-full pb-20 overflow-y-auto">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-lg font-bold text-gray-800">{t.location}</span>
          <span className="text-xs text-gray-500">▼</span>
        </div>
        <div className="flex gap-4 text-gray-800">
          <Search size={22} />
        </div>
      </header>

      {/* 리스트 */}
      <div className="divide-y divide-gray-100">
        {products.map((item: any) => (
          <div
            key={item.id}
            onClick={() => onProductClick(item)}
            className="flex gap-4 p-4 transition cursor-pointer active:bg-gray-50"
          >
            <div
              className={`w-28 h-28 rounded-lg flex-shrink-0 ${item.image} relative overflow-hidden bg-cover bg-center`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400 opacity-30">
                IMG
              </div>
              {item.status !== "sale" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-sm font-bold text-white">
                    {item.status === "reserved" ? t.reserved : t.sold}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 leading-snug mb-1">
                  {item.title}
                </h3>
                <div className="mb-1 text-xs text-gray-400">
                  {t.location} • {item.time}
                </div>
                <div className="flex items-center gap-1">
                  {item.status !== "sale" && (
                    <span className="text-[10px] bg-gray-700 text-white px-1.5 py-0.5 rounded-[4px] font-bold">
                      {item.status === "reserved" ? t.reserved : t.sold}
                    </span>
                  )}
                  <span className="text-sm font-bold text-gray-900">
                    {item.price === 0
                      ? t.free
                      : `${item.price.toLocaleString()}${t.won}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                {item.chats > 0 && (
                  <span className="flex items-center gap-0.5">
                    <MessageCircle size={13} /> {item.chats}
                  </span>
                )}
                {item.likes > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Heart size={13} /> {item.likes}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 글쓰기 버튼: fixed 대신 absolute 사용하고, 부모 relative 기준 배치 */}
      {/* 메인 탭바 위로 올라오도록 bottom-5 정도 띄움 */}
      <button className="absolute z-20 flex items-center gap-1 p-3 text-white transition bg-orange-500 rounded-full shadow-lg bottom-6 right-5 hover:bg-orange-600 active:scale-95">
        <span className="text-xl font-bold">+</span>
        <span className="pr-1 text-sm font-bold">{t.write}</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------
// 2. 상품 상세 화면
// ---------------------------------------------------------
function ProductDetail({ product, onBack, onChat, t }: any) {
  return (
    <div className="relative flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
      {/* 상세 내용 스크롤 영역 */}
      <div className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
        {/* 헤더 */}
        <div className="absolute top-0 z-20 flex items-center justify-between w-full p-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center text-gray-800 transition rounded-full shadow-sm w-9 h-9 bg-white/80 backdrop-blur active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button className="flex items-center justify-center text-gray-800 transition rounded-full shadow-sm w-9 h-9 bg-white/80 backdrop-blur active:scale-95">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* 이미지 */}
        <div
          className={`w-full aspect-square ${product.image} flex items-center justify-center text-gray-500 font-bold text-2xl opacity-40`}
        >
          IMG
        </div>

        {/* 판매자 정보 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-full">
              <User size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {product.seller}
              </div>
              <div className="text-xs text-gray-500">{t.location}</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-right text-teal-600">
              37.5°C 😊
            </div>
            <div className="text-[10px] text-gray-400 underline text-right">
              {t.manner}
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-4">
          <h1 className="mb-2 text-xl font-bold leading-snug text-gray-900">
            {product.title}
          </h1>
          <div className="mb-4 text-xs text-gray-400">
            {product.category} • {product.time}
          </div>
          <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
            {product.desc}
          </p>
          <div className="mt-6 text-xs text-gray-400">{t.view} 124</div>
        </div>
      </div>

      {/* 하단 액션바: absolute bottom-0 사용하여 컨테이너 바닥에 붙임 */}
      {/* 메인 탭바 위에 보여야 하므로 z-index 높임 */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-3 flex items-center gap-3 z-30 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <div className="px-1 text-gray-400">
          <Heart size={24} />
        </div>
        <div className="w-[1px] h-8 bg-gray-200"></div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">
            {product.price === 0
              ? t.free
              : `${product.price.toLocaleString()}${t.won}`}
          </div>
          <div className="text-[10px] text-gray-400 font-bold">
            {t.priceOffer}
          </div>
        </div>
        <button
          onClick={onChat}
          className="bg-orange-500 text-white px-4 py-2.5 rounded-lg font-bold text-sm active:bg-orange-600 transition"
        >
          {t.chat}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3. 채팅방 화면
// ---------------------------------------------------------
function ChatRoom({ product, onBack, t }: any) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "안녕하세요! 구매 가능할까요?",
      sender: "me",
      time: "14:30",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMsg]);
    setInput("");

    setTimeout(() => {
      const reply: ChatMessage = {
        id: Date.now() + 1,
        text: "Ok!",
        sender: "other",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
      {/* 헤더 */}
      <header className="z-10 flex items-center p-3 bg-white border-b border-gray-100 shrink-0">
        <button
          onClick={onBack}
          className="mr-3 text-gray-800 transition active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900">
            {product.seller}
          </div>
          <div className="text-xs text-gray-400">37.5°C</div>
        </div>
      </header>

      {/* 거래 물품 정보 */}
      <div className="flex gap-3 p-3 border-b border-gray-50 bg-gray-50/50 shrink-0">
        <div className={`w-10 h-10 rounded ${product.image} bg-cover`}></div>
        <div className="flex-1 overflow-hidden">
          <div className="text-xs font-bold text-gray-900 truncate">
            {product.title}
          </div>
          <div className="text-xs font-bold text-gray-600">
            {product.price === 0
              ? t.free
              : `${product.price.toLocaleString()}${t.won}`}
          </div>
        </div>
        <button className="self-center px-2 py-1 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded h-fit whitespace-nowrap">
          {t.transPromise}
        </button>
      </div>

      {/* 메시지 리스트 */}
      <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto bg-white scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                msg.sender === "me"
                  ? "bg-orange-500 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-gray-400 self-end ml-1 mr-1 mb-1">
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력창: absolute bottom-0 사용 */}
      <div className="absolute bottom-0 z-30 flex items-center w-full gap-2 p-3 bg-white border-t border-gray-100">
        <button className="p-1 text-gray-400">
          <Camera size={24} />
        </button>
        <div className="flex items-center flex-1 px-4 py-2 bg-gray-100 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full text-sm bg-transparent outline-none"
            placeholder={t.inputPlace}
          />
          <button
            onClick={handleSend}
            className={`ml-2 transition ${
              input.trim() ? "text-orange-500" : "text-gray-400"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
