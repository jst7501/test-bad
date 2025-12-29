import { useState, useEffect } from "react";

// =========================================================
// 1. 설정 및 언어별 통화 매핑
// =========================================================
const LANG_TO_CURRENCY: any = {
  vn: { code: "vnd", name: "Vietnam", flag: "🇻🇳", unit: "₫" },
  kh: { code: "khr", name: "Cambodia", flag: "🇰🇭", unit: "៛" },
  mm: { code: "mmk", name: "Myanmar", flag: "🇲🇲", unit: "Ks" },
  uz: { code: "uzs", name: "Uzbekistan", flag: "🇺🇿", unit: "so'm" },
  kr: { code: "usd", name: "USA (Global)", flag: "🇺🇸", unit: "$" },
};

const DICT: any = {
  kr: {
    title: "송금 타이밍 분석",
    inputLabel: "보낼 금액 (KRW)",
    signalGood: "지금 보내세요! (상승세)",
    signalBad: "떨어지고 있어요 (하락세)",
    signalNormal: "평범해요 (보합세)",
    compare: "한 달 전보다",
    more: "이득",
    less: "손해",
    chartTitle: "최근 30일 실시간 추세",
    calcResult: "예상 수령액",
    loading: "환율 정보를 분석 중입니다...",
    per1000: "(1,000원당)",
  },
  vn: {
    title: "Thời điểm gửi tiền",
    inputLabel: "Số tiền gửi (KRW)",
    signalGood: "Gửi ngay! (Đang tăng)",
    signalBad: "Đang giảm",
    signalNormal: "Bình thường",
    compare: "So với tháng trước",
    more: "Lãi",
    less: "Lỗ",
    chartTitle: "Xu hướng thực tế 30 ngày",
    calcResult: "Số tiền nhận được",
    loading: "Đang tải dữ liệu...",
    per1000: "(mỗi 1.000 won)",
  },
  kh: {
    title: "ពេលវេលាផ្ញើប្រាក់",
    inputLabel: "ចំនួនប្រាក់ផ្ញើ (KRW)",
    signalGood: "ផ្ញើឥឡូវនេះ! (កើនឡើង)",
    signalBad: "កំពុងធ្លាក់ចុះ",
    signalNormal: "ធម្មតា",
    compare: "ធៀបនឹងខែមុន",
    more: "ចំណេញ",
    less: "ខាត",
    chartTitle: "និន្នាការជាក់ស្តែង 30 ថ្ងៃ",
    calcResult: "ទឹកប្រាក់ដែលទទួលបាន",
    loading: "កំពុងផ្ទុកទិន្នន័យ...",
    per1000: "(ក្នុង 1,000 វ៉ុន)",
  },
  mm: {
    title: "ငွေလွှဲချိန်",
    inputLabel: "လွှဲငွေပမာဏ (KRW)",
    signalGood: "အခုပို့ပါ! (တက်နေ)",
    signalBad: "ကျဆင်းနေသည်",
    signalNormal: "ပုံမှန်",
    compare: "ပြီးခဲ့တဲ့လထက်",
    more: "ပိုရတယ်",
    less: "လျော့နည်း",
    chartTitle: "ရက် ၃၀ ငွေလဲနှုန်း",
    calcResult: "ရရှိမည့်ငွေ",
    loading: "ဒေတာကို ဆွဲယူနေသည်...",
    per1000: "(ဝမ် ၁၀၀၀ နှုန်း)",
  },
  uz: {
    title: "Pul yuborish vaqti",
    inputLabel: "Yuboriladigan summa (KRW)",
    signalGood: "Hozir yuboring! (Oshmoqda)",
    signalBad: "Tushmoqda",
    signalNormal: "O'rtacha",
    compare: "O'tgan oyga nisbatan",
    more: "Foyda",
    less: "Zarar",
    chartTitle: "30 kunlik real kurs",
    calcResult: "Olinadigan summa",
    loading: "Yuklanmoqda...",
    per1000: "(1000 von uchun)",
  },
};

// =========================================================
// 날짜 유틸리티
// =========================================================
const formatDate = (date: Date) => date.toISOString().split("T")[0];
const getPastDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i * 7);
    dates.push(formatDate(d));
  }
  return dates;
};

// =========================================================
// 예쁜 차트 컴포넌트
// =========================================================
const PrettyAreaChart = ({
  data,
  color,
}: {
  data: number[];
  color: string;
}) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 80;
  const width = 300;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height * 0.7) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#gradient-${color})`} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height * 0.7) - 10;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="white"
            stroke={color}
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

// =========================================================
// 메인 컴포넌트
// =========================================================
export default function RemittanceAnalyzer({ lang }: { lang: string }) {
  const t = DICT[lang] || DICT["kr"];
  const currencyInfo = LANG_TO_CURRENCY[lang] || LANG_TO_CURRENCY["kr"];

  const [amount, setAmount] = useState(1000000);
  const [currentRate, setCurrentRate] = useState(0);
  const [historyData, setHistoryData] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const [signal, setSignal] = useState<"good" | "bad" | "normal">("normal");
  const [diffPer1000, setDiffPer1000] = useState(0); // 상단용 (1,000원 기준)

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setHistoryData([]);

      const dates = getPastDates();
      const targetCode = currencyInfo.code;

      try {
        const requests = dates.map((date) =>
          fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/krw.json`
          )
            .then((res) => res.json())
            .catch(() => null)
        );
        const latestRequest = fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json`
        ).then((res) => res.json());

        const responses = await Promise.all([...requests, latestRequest]);

        const prices: number[] = [];
        let updatedDate = "";

        responses.forEach((data, idx) => {
          if (data && data.krw && data.krw[targetCode]) {
            prices.push(data.krw[targetCode]);
            if (idx === responses.length - 1 && data.date)
              updatedDate = data.date;
          }
        });

        if (prices.length > 0) {
          const latestRate = prices[prices.length - 1];
          const startRate = prices[0]; // 한 달 전 데이터

          setCurrentRate(latestRate);
          setHistoryData(prices);
          setLastUpdated(updatedDate);

          // 상단 차트용: 1,000원 기준 차액
          const rateDiff = latestRate - startRate;
          setDiffPer1000(rateDiff * 1000);

          // 신호 판단
          const changePercent = ((latestRate - startRate) / startRate) * 100;
          if (changePercent > 0.5) setSignal("good");
          else if (changePercent < -0.5) setSignal("bad");
          else setSignal("normal");
        }
      } catch (error) {
        console.error("Fetch Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [lang]);

  // 계산기용: 입력한 금액 기준 차액 계산
  // (현재 환율 - 한달 전 환율) * 입력 금액
  const startRate = historyData.length > 0 ? historyData[0] : 0;
  const calcTotalDiff = Math.floor(amount * (currentRate - startRate));

  const getTheme = () => {
    if (signal === "good")
      return {
        text: "text-green-700",
        bg: "bg-gradient-to-br from-green-50 to-green-100",
        stroke: "#15803d",
        badge: "bg-green-500",
      };
    if (signal === "bad")
      return {
        text: "text-red-700",
        bg: "bg-gradient-to-br from-red-50 to-red-100",
        stroke: "#b91c1c",
        badge: "bg-red-500",
      };
    return {
      text: "text-blue-700",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      stroke: "#1d4ed8",
      badge: "bg-blue-500",
    };
  };
  const theme = getTheme();

  const formatCurrency = (val: number) => {
    const absVal = Math.abs(val);
    if (absVal < 10) return absVal.toFixed(2);
    return Math.floor(absVal).toLocaleString();
  };

  return (
    <div className="h-full p-4 pb-32 bg-white">
      {/* 1. 타이틀 */}
      <div className="flex items-center justify-between px-1 mb-4">
        <h2 className="text-xl font-extrabold text-gray-800">{t.title}</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
          <span className="text-xl">{currencyInfo.flag}</span>
          <span className="text-xs font-bold text-gray-600 uppercase">
            {currencyInfo.code}
          </span>
        </div>
      </div>

      {/* 2. 메인 분석 카드 (1,000원 기준 추세) */}
      <div
        className={`rounded-3xl p-6 shadow-lg mb-6 relative overflow-hidden transition-all duration-500 ${theme.bg}`}
      >
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-b-2 border-gray-800 rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-gray-500">
                {t.loading}
              </span>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="mb-1 text-xs font-bold text-gray-500 opacity-80">
                {t.chartTitle}
              </p>
              <h2
                className={`text-3xl font-black ${theme.text} tracking-tight`}
              >
                1 KRW ≈ {currentRate.toFixed(2)}{" "}
                <span className="text-lg">{currencyInfo.unit}</span>
              </h2>
            </div>
            <span
              className={`${theme.badge} text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm`}
            >
              {signal === "good" ? "Good" : signal === "bad" ? "Bad" : "Normal"}
            </span>
          </div>

          <p className={`text-sm font-bold mb-6 ${theme.text} opacity-90`}>
            {signal === "good"
              ? `🚀 ${t.signalGood}`
              : signal === "bad"
              ? `📉 ${t.signalBad}`
              : `⚖️ ${t.signalNormal}`}
          </p>

          <div className="w-full h-32 mb-4">
            {!loading && (
              <PrettyAreaChart data={historyData} color={theme.stroke} />
            )}
          </div>

          {/* 상단 비교 분석 멘트 (1,000원 기준) */}
          {!loading && (
            <div className="flex items-center justify-between p-3 text-xs font-bold text-gray-700 border shadow-sm bg-white/70 backdrop-blur-md rounded-xl border-white/50">
              <div className="flex flex-col">
                <span>📅 {t.compare}</span>
                <span className="text-[10px] text-gray-400">{t.per1000}</span>
              </div>
              <div className="text-right">
                <span
                  className={`text-base ${
                    diffPer1000 > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {diffPer1000 > 0 ? "+" : diffPer1000 < 0 ? "-" : ""}
                  {formatCurrency(diffPer1000)} {currencyInfo.unit}
                </span>
                <span className="ml-1 text-gray-500 block text-[10px]">
                  ({diffPer1000 >= 0 ? t.more : t.less})
                </span>
              </div>
            </div>
          )}

          <div className="text-[9px] text-gray-400 text-right mt-2">
            Source: fawazahmed0 API ({lastUpdated})
          </div>
        </div>
      </div>

      {/* 3. 송금 계산기 (입력 금액 기준) */}
      <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <label className="block mb-2 text-xs font-bold text-gray-500">
          {t.inputLabel}
        </label>

        <div className="relative mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 pl-4 pr-12 text-xl font-bold text-gray-800 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-800"
          />
          <span className="absolute text-sm font-bold text-gray-400 -translate-y-1/2 right-4 top-1/2">
            KRW
          </span>
        </div>

        <div className="flex gap-2 mb-6">
          {[1000000, 2000000, 3000000, 5000000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="flex-1 bg-white border border-gray-200 py-2 rounded-lg text-[10px] font-bold text-gray-500 hover:bg-gray-100 active:scale-95 transition"
            >
              {val / 10000}만
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 border-dashed">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">{t.calcResult}</span>
            <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
              {currencyInfo.flag} {currencyInfo.name}
            </span>
          </div>

          <div className="mb-2 text-right">
            <span className="text-3xl font-black text-gray-800">
              {Math.floor(amount * currentRate).toLocaleString()}
            </span>
            <span className="ml-1 text-lg font-bold text-gray-400">
              {currencyInfo.unit}
            </span>
          </div>

          {/* [NEW] 입력 금액 기준 차액 표시 (하단) */}
          {!loading && (
            <div className="flex items-center justify-between p-2 text-xs rounded-lg bg-gray-50">
              <span className="font-bold text-gray-500">{t.compare}</span>
              <span
                className={`font-bold ${
                  calcTotalDiff > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {calcTotalDiff > 0 ? "+" : ""}
                {Math.floor(calcTotalDiff).toLocaleString()} {currencyInfo.unit}
                <span className="ml-1 font-normal text-gray-400">
                  ({calcTotalDiff >= 0 ? t.more : t.less})
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
