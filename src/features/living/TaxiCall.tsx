import { useState, useEffect } from "react";
import { Send, MapPin, Navigation, AlertCircle, Map as MapIcon, LocateFixed } from "lucide-react";

interface TaxiCallProps {
  lang: string;
}

export default function TaxiCall({ lang }: TaxiCallProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(false);

  // [New] Auto-fetch location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoadingLoc(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // OpenStreetMap Nominatim API (Reverse Geocoding)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: {
                  "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8", // 한글 주소 요청
                },
              }
            );
            
            if (!response.ok) throw new Error("Addr Fetch Failed");
            
            const data = await response.json();
            const addr = data.address;
            
            // 주소 조합 (한국 식: 시/도 + 구/군 + 동/로)
            // Nominatim 응답 예: { city: "서울", borough: "강남구", quarter: "역삼동", road: "테헤란로" ... }
            const city = addr.city || addr.province || "";
            const district = addr.borough || addr.district || addr.county || "";
            const dong = addr.quarter || addr.neighbourhood || addr.village || "";
            const road = addr.road || "";
            
            // 심플하게 조합 (중복 제거 등은 간단히)
            const fullAddress = [city, district, road || dong].filter(Boolean).join(" ");
            
            setOrigin(fullAddress || `📍 현재 위치 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          } catch (e) {
            console.error("Geocoding Error:", e);
            // 실패 시 좌표로 표시
            setOrigin(`📍 현재 위치 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          } finally {
            setLoadingLoc(false);
          }
        },
        (err) => {
          console.error("Loc Error:", err);
          setLoadingLoc(false);
        }
      );
    }
  }, []);

  const t = (key: string) => {
    const dict: any = {
      kr: {
        title: "콜택시 호출 (회사)",
        origin: "출발지",
        dest: "도착지",
        originPh: "예: 현재 위치 (자동 입력됨)",
        destPh: "예: 목적지 (강남역)",
        btn: "택시 부르기",
        preview: "문자 미리보기",
        previewDesc: "콜택시 회사로 아래 내용의 문자가 전송됩니다.",
        nativePreview: "모국어 설명",
        nativeDesc: "출발지와 목적지가 적힌 문자를 콜택시 회사로 보냅니다.",
        errEmpty: "출발지와 도착지를 모두 입력해주세요.",
        mapPlaceholder: "지도에서 위치 확인 (준비중)",
        findingLoc: "현재 위치를 찾는 중...",
      },
      vn: {
        title: "Gọi Taxi (Tổng đài)",
        origin: "Điểm đón",
        dest: "Điểm đến",
        originPh: "Vị trí hiện tại",
        destPh: "Điểm đến",
        btn: "Gọi Taxi Ngay",
        preview: "Xem trước tin nhắn",
        previewDesc: "Tin nhắn sẽ được gửi đến công ty taxi.",
        nativePreview: "Dịch nghĩa",
        nativeDesc: "Gửi tin nhắn có điểm đi và điểm đến cho công ty taxi.",
        errEmpty: "Vui lòng nhập đủ thông tin.",
        mapPlaceholder: "Bản đồ (Sắp ra mắt)",
        findingLoc: "Đang tìm vị trí...",
      },
      kh: {
        title: "ហៅតាក់ស៊ី (ក្រុមហ៊ុន)",
        origin: "កន្លែងទទួល",
        dest: "គោលដៅ",
        originPh: "ទីតាំងបច្ចុប្បន្ន",
        destPh: "គោលដៅ",
        btn: "ហៅតាក់ស៊ីភ្លាម",
        preview: "មើលសារជាមុន",
        previewDesc: "សារនឹងត្រូវបានផ្ញើទៅក្រុមហ៊ុនតាក់ស៊ី។",
        nativePreview: "ការបកប្រែ",
        nativeDesc: "ផ្ញើសារដែលមានកន្លែងចេញដំណើរ និងគោលដៅទៅក្រុមហ៊ុនតាក់ស៊ី។",
        errEmpty: "សូមបញ្ចូលព័ត៌មានឱ្យបានគ្រប់គ្រាន់។",
        mapPlaceholder: "ផែនទី (នឹងមកដល់ឆាប់ៗ)",
        findingLoc: "កំពុងស្វែងរកទីតាំង...",
      },
      mm: {
        title: "တက္ကစီခေါ်မည် (ကုမ္ပဏီ)",
        origin: "စတင်မည့်နေရာ",
        dest: "သွားမည့်နေရာ",
        originPh: "လက်ရှိတည်နေရာ",
        destPh: "သွားလိုသောနေရာ",
        btn: "တက္ကစီခေါ်ရန်",
        preview: "စာတိုနမူနာ",
        previewDesc: "တက္ကစီကုမ္ပဏီထံသို့ စာတိုပေးပို့မည်။",
        nativePreview: "ဘာသာပြန်",
        nativeDesc: "စတင်မည့်နေရာနှင့် သွားမည့်နေရာပါရှိသော စာတိုကို တက္ကစီကုမ္ပဏီသို့ ပေးပို့မည်။",
        errEmpty: "ကျေးဇူးပြု၍ အချက်အလက်များ ပြည့်စုံစွာဖြည့်ပါ။",
        mapPlaceholder: "မြေပုံ (မကြာမီလာမည်)",
        findingLoc: "တည်နေရာရှာဖွေနေသည်...",
      },
      uz: {
        title: "Taksi chaqirish (Kompaniya)",
        origin: "Ketish joyi",
        dest: "Manzil",
        originPh: "Hozirgi joy",
        destPh: "Boradigan joy",
        btn: "Taksi chaqirish",
        preview: "SMS ko'rinishi",
        previewDesc: "Taksi kompaniyasiga xabar yuboriladi.",
        nativePreview: "Tarjima",
        nativeDesc: "Ketish va borish joyi yozilgan SMS taksi kompaniyasiga yuboriladi.",
        errEmpty: "Iltimos, ma'lumotlarni to'liq kiriting.",
        mapPlaceholder: "Xarita (Tez orada)",
        findingLoc: "Joylashuv aniqlanmoqda...",
      },
    };
    return dict[lang]?.[key] || dict["kr"][key];
  };

  const getSmsBody = () => {
    return `[택시 호출 요청]\n출발: ${origin}\n도착: ${destination}\n\n(제 위치는 ${origin}입니다. 택시를 보내주세요.)`;
  };

  const handleSend = () => {
    if (!origin.trim() || !destination.trim()) {
      setError(t("errEmpty"));
      return;
    }
    setError("");
    
    // 콜택시 회사 번호 (가상)
    const phoneNumber = "010-0000-0000";
    const body = encodeURIComponent(getSmsBody());
    window.location.href = `sms:${phoneNumber}?body=${body}`;
  };

  const handleOriginChange = (val: string) => {
    setOrigin(val);
    // 사용자가 직접 수정하면 좌표 정보는 무효화 (필요시)
    // 여기서는 단순하게 유지: 텍스트가 변경되면 'Current Location' 문구가 깨지므로 자연스럽게 좌표 미포함됨.
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Map Placeholder */}
      <div className="h-48 bg-slate-200 relative flex items-center justify-center flex-col gap-2 overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
            backgroundSize: "20px 20px"
        }}></div>
        <div className="relative z-10 p-3 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-500 animate-pulse">
            <MapIcon size={32} />
        </div>
        <span className="text-xs font-bold text-slate-500 relative z-10">{t("mapPlaceholder")}</span>
        
        {/* Fake Location Marker */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-500 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>

      <div className="p-5 bg-white shadow-sm rounded-b-3xl z-30 -mt-4 relative">
        <h2 className="text-2xl font-black text-gray-800 mb-1">{t("title")}</h2>
        <p className="text-sm text-gray-500">
          {lang === "kr"
            ? "간편하게 문자로 택시를 호출하세요."
            : t("nativeDesc")}
        </p>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="space-y-6">
          {/* Inputs */}
          <div className="space-y-4">
            {/* Origin */}
            <div className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition relative ${loadingLoc ? "opacity-70" : ""}`}>
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-indigo-500" /> {t("origin")}
                  {lang !== "kr" && <span className="text-gray-300 font-normal ml-1">출발지</span>}
                </span>
              </label>
              <div className="flex items-center">
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => handleOriginChange(e.target.value)}
                    placeholder={loadingLoc ? t("findingLoc") : t("originPh")}
                    disabled={loadingLoc}
                    className="w-full text-lg font-medium text-gray-800 placeholder-gray-300 bg-transparent outline-none disabled:bg-transparent"
                  />
                  {loadingLoc && <LocateFixed size={20} className="text-indigo-500 animate-spin" />}
              </div>
            </div>

            {/* Destination */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                  <Navigation size={12} className="text-red-500" /> {t("dest")}
                   {lang !== "kr" && <span className="text-gray-300 font-normal ml-1">목적지</span>}
                </span>
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t("destPh")}
                className="w-full text-lg font-medium text-gray-800 placeholder-gray-300 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 rounded-xl text-sm font-medium animate-pulse">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Preview Card */}
          {(origin || destination) && (
            <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                   <span>💬 {t("preview")}</span>
                </h3>
                <p className="text-xs text-indigo-400 mt-0.5">{t("previewDesc")}</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm relative">
                 <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div> 
                 <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {getSmsBody()}
                 </p>
              </div>

               {lang !== "kr" && (
                <div className="mt-4 pt-4 border-t border-indigo-100">
                    <h4 className="text-xs font-bold text-indigo-700 mb-1">{t("nativePreview")}</h4>
                    <p className="text-sm text-indigo-900">
                      {t("nativeDesc")}
                    </p>
                </div>
               )}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleSend}
            className="w-full py-4 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-lg shadow-gray-200 active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-black"
          >
            <Send size={20} />
            {t("btn")}
          </button>
        </div>
      </div>
    </div>
  );
}
