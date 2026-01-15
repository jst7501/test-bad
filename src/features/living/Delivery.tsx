import { useState, useMemo } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  ChevronLeft,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  Beef,
  Carrot as CarrotIcon,
} from "lucide-react";

const UI_DICT: any = {
  kr: {
    title: "아시안 마트",
    search: "식자재 검색",
    categories: {
      all: "전체",
      meat: "정육/할랄",
      veg: "채소/과일",
      spice: "소스/향신료",
      instant: "라면/간편식",
    },
    add: "담기",
    total: "총 주문금액",
    checkout: "주문하기",
    cart: "장바구니",
    empty: "장바구니가 비었습니다.",
    deliver: "배달비",
    free: "무료",
  },
  vn: {
    title: "Siêu thị Asian",
    search: "Tìm kiếm",
    categories: {
      all: "Tất cả",
      meat: "Thịt/Halal",
      veg: "Rau/Quả",
      spice: "Gia vị",
      instant: "Mì gói",
    },
    add: "Thêm",
    total: "Tổng cộng",
    checkout: "Đặt hàng",
    cart: "Giỏ hàng",
    empty: "Giỏ hàng trống.",
    deliver: "Phí ship",
    free: "Miễn phí",
  },
  kh: {
    title: "អាស៊ីម៉ាត",
    search: "ស្វែងរក",
    categories: {
      all: "ទាំងអស់",
      meat: "សាច់",
      veg: "បន្លែ",
      spice: "គ្រឿងទេស",
      instant: "មី",
    },
    add: "បន្ថែម",
    total: "សរុប",
    checkout: "កម្មង់",
    cart: "កន្ត្រក",
    empty: "ទទេ",
    deliver: "ថ្លៃដឹក",
    free: "ឥតគិតថ្លៃ",
  },
  mm: {
    title: "အာရှမတ်",
    search: "ရှာဖွေပါ",
    categories: {
      all: "အားလုံး",
      meat: "အသား",
      veg: "ဟင်းသီးဟင်းရွက်",
      spice: "အမွှေးအကြိုင်",
      instant: "ခေါက်ဆွဲ",
    },
    add: "ထည့်မည်",
    total: "စုစုပေါင်း",
    checkout: "မှာယူမည်",
    cart: "ဈေးဝယ်လှည်း",
    empty: "ဘာမှမရှိပါ",
    deliver: "ပို့ခ",
    free: "အခမဲ့",
  },
  uz: {
    title: "Osiyo Market",
    search: "Qidirish",
    categories: {
      all: "Barchasi",
      meat: "Go'sht/Halol",
      veg: "Sabzavot",
      spice: "Ziravor",
      instant: "Ramen",
    },
    add: "Qo'shish",
    total: "Jami",
    checkout: "Buyurtma",
    cart: "Savat",
    empty: "Bo'sh",
    deliver: "Dostavka",
    free: "Bepul",
  },
};

const getProducts = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];
  return [
    {
      id: 1,
      cat: "meat",
      name: l({
        kr: "할랄 양고기 1kg",
        vn: "Thịt cừu Halal 1kg",
        uz: "Halol Qo'y go'shti 1kg",
      }),
      price: 18000,
      img: "bg-red-100",
      icon: <Beef />,
    },
    {
      id: 2,
      cat: "veg",
      name: l({ kr: "고수 (묶음)", vn: "Rau mùi", uz: "Kashnich" }),
      price: 2000,
      img: "bg-green-100",
      icon: <CarrotIcon />,
    },
    {
      id: 3,
      cat: "instant",
      name: l({
        kr: "하오하오 라면 (30개)",
        vn: "Mì Hao Hao (1 thùng)",
        uz: "Hao Hao Ramen",
      }),
      price: 15000,
      img: "bg-pink-100",
      icon: <UtensilsCrossed />,
    },
    {
      id: 4,
      cat: "spice",
      name: l({ kr: "피쉬소스 (느억맘)", vn: "Nước mắm", uz: "Baliq sousi" }),
      price: 4500,
      img: "bg-amber-100",
      icon: <ShoppingBag />,
    },
    {
      id: 5,
      cat: "meat",
      name: l({
        kr: "냉동 닭다리살 2kg",
        vn: "Đùi gà đông lạnh 2kg",
        uz: "Muzlatilgan tovuq 2kg",
      }),
      price: 12000,
      img: "bg-orange-100",
      icon: <Beef />,
    },
    {
      id: 6,
      cat: "veg",
      name: l({
        kr: "두리안 (냉동)",
        vn: "Sầu riêng (Đông lạnh)",
        uz: "Durian",
      }),
      price: 25000,
      img: "bg-yellow-100",
      icon: <CarrotIcon />,
    },
  ];
};

export default function Delivery({ lang }: { lang: string }) {
  const t = UI_DICT[lang] || UI_DICT["kr"];
  const products = useMemo(() => getProducts(lang), [lang]);

  const [cat, setCat] = useState("all");
  const [cart, setCart] = useState<Record<number, number>>({}); // id: qty
  const [viewCart, setViewCart] = useState(false);

  const filtered = products.filter((p) => cat === "all" || p.cat === cat);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  };

  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className="relative flex flex-col w-full h-full font-sans bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {viewCart ? (
          <button
            onClick={() => setViewCart(false)}
            className="flex items-center gap-1 font-bold text-gray-700"
          >
            <ChevronLeft size={24} /> {t.cart}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-lg font-bold text-emerald-600">
            <ShoppingBag size={24} /> {t.title}
          </div>
        )}

        {!viewCart && (
          <div className="relative" onClick={() => setViewCart(true)}>
            <div className="p-2 text-gray-600 bg-gray-100 rounded-full">
              <ShoppingCart size={22} />
            </div>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalQty}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 pb-24 overflow-y-auto scrollbar-hide">
        {viewCart ? (
          // Cart View
          <div className="p-5">
            {totalQty === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-400">
                <ShoppingCart size={48} className="opacity-20" />
                <p>{t.empty}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === Number(id));
                  if (!p) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg ${p.img} flex items-center justify-center text-gray-500`}
                        >
                          {p.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">
                            {p.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {(p.price * qty).toLocaleString()}원
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-1 rounded-lg bg-gray-50">
                        <button
                          onClick={() => removeFromCart(p.id)}
                          className="p-1 text-gray-500"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-4 text-sm font-bold text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(p.id)}
                          className="p-1 text-emerald-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="my-4 border-t border-gray-300 border-dashed"></div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Product Price</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{t.deliver}</span>
                    <span className="font-bold text-emerald-600">{t.free}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-xl font-black text-gray-900">
                    <span>{t.total}</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Product List View
          <>
            <div className="sticky top-0 z-10 p-4 bg-slate-50/95 backdrop-blur-sm">
              <div className="flex items-center gap-2 p-2 mb-3 bg-white border border-gray-200 shadow-sm rounded-xl">
                <Search size={18} className="ml-1 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.search}
                  className="flex-1 text-sm outline-none"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {Object.keys(t.categories).map((k) => (
                  <button
                    key={k}
                    onClick={() => setCat(k)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      cat === k
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-gray-200 text-gray-500"
                    }`}
                  >
                    {t.categories[k]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 px-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-48 active:scale-[0.98] transition"
                >
                  <div
                    className={`flex-1 ${p.img} rounded-xl mb-3 flex items-center justify-center text-gray-600`}
                  >
                    <div className="scale-150 opacity-50">{p.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-emerald-600">
                        {p.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full hover:bg-emerald-600 hover:text-white transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Checkout Button (Fixed Bottom) */}
      {viewCart && totalQty > 0 && (
        <div className="absolute bottom-0 z-30 w-full p-4 bg-white border-t border-gray-100">
          <button className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95 transition">
            <Truck size={20} /> {t.checkout} ({totalPrice.toLocaleString()}원)
          </button>
        </div>
      )}
    </div>
  );
}
