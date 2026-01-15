import { Siren, Shield, Briefcase, HeartHandshake, Building2, PhoneCall } from "lucide-react";

interface HotlinesProps {
  lang: string;
}

export default function Hotlines({ lang }: HotlinesProps) {
  const t = (key: string) => {
    const dict: any = {
      kr: {
        title: "필수 비상연락망",
        visa: "외국인종합안내",
        visaDesc: "비자, 체류, 출입국 문의",
        fire: "화재/응급환자",
        fireDesc: "소방서, 구급차 (긴급)",
        police: "범죄 신고",
        policeDesc: "경찰서 (긴급)",
        labor: "노동부 상담",
        laborDesc: "임금체불, 부당해고",
        danuri: "다누리 콜센터",
        danuriDesc: "이주여성, 생활통역",
        embassy: "주한 대사관",
        embassyDesc: "자국 대사관 연락처",
      },
      vn: {
        title: "Danh bạ khẩn cấp",
        visa: "TT Hỗ trợ người nước ngoài",
        visaDesc: "Visa, cư trú, xuất nhập cảnh",
        fire: "Cứu hỏa / Cấp cứu",
        fireDesc: "Khẩn cấp (Y tế/Cháy)",
        police: "Báo cảnh sát",
        policeDesc: "Tội phạm, tai nạn",
        labor: "Bộ Lao động",
        laborDesc: "Chậm lương, sa thải sai",
        danuri: "Hỗ trợ Danuri",
        danuriDesc: "Đa văn hóa, thông dịch",
        embassy: "Đại sứ quán",
        embassyDesc: "ĐSQ Việt Nam tại Hàn Quốc",
      },
      kh: {
        title: "លេខទូរស័ព្ទបន្ទាន់",
        visa: "មជ្ឈមណ្ឌលអន្តោប្រវេសន៍",
        visaDesc: "Visa, ការស្នាក់នៅ",
        fire: "អគ្គីភ័យ/សង្គ្រោះបន្ទាន់",
        fireDesc: "ឡានពេទ្យ, ពន្លត់អគ្គីភ័យ",
        police: "ប៉ូលីស",
        policeDesc: "រាយការណ៍បទល្មើស",
        labor: "ក្រសួងការងារ",
        laborDesc: "ប្រាក់ខែ, ការងារ",
        danuri: "Danuri Call Center",
        danuriDesc: "ជំនួយស្ត្រី និងបកប្រែ",
        embassy: "ស្ថានទូត",
        embassyDesc: "ស្ថានទូតកម្ពុជាប្រចាំកូរ៉េ",
      },
      mm: {
        title: "အရေးပေါ် ဖုန်းနံပါတ်များ",
        visa: "လူဝင်မှုကြီးကြပ်ရေး",
        visaDesc: "ဗီဇာ, နေထိုင်ခွင့်",
        fire: "မီးသတ်/ဆေးရုံကား",
        fireDesc: "အရေးပေါ်",
        police: "ရဲစခန်း",
        policeDesc: "မှုခင်းတိုင်ကြားရန်",
        labor: "အလုပ်သမားဝန်ကြီးဌာန",
        laborDesc: "လစာ၊ အလုပ်ထုတ်ခံရမှု",
        danuri: "Danuri Call Center",
        danuriDesc: "ဘာသာပြန် အကူအညီ",
        embassy: "သံရုံး",
        embassyDesc: "မြန်မာသံရုံး",
      },
      uz: {
        title: "Favqulodda raqamlar",
        visa: "Immigratsiya markazi",
        visaDesc: "Viza, yashash, kirish-chiqish",
        fire: "O't o'chirish/Tez yordam",
        fireDesc: "Favqulodda holat",
        police: "Politsiya",
        policeDesc: "Jinoyat haqida xabar",
        labor: "Mehnat vazirligi",
        laborDesc: "Ish haqi, nohaq bo'shatish",
        danuri: "Danuri markazi",
        danuriDesc: "Tarjima yordami",
        embassy: "Elchixona",
        embassyDesc: "O'zbekiston elchixonasi",
      },
    };
    return dict[lang]?.[key] || dict["kr"][key];
  };

  const getEmbassyNumber = (lang: string) => {
    switch(lang) {
      case 'vn': return '02-720-5124'; // Vietnam
      case 'kh': return '02-3785-1041'; // Cambodia
      case 'mm': return '02-790-3814'; // Myanmar (Yongsan)
      case 'uz': return '02-574-6554'; // Uzbekistan
      default: return '02-2100-2114'; // MOFA General (Fallback)
    }
  };

  const HOTLINES = [
    { 
      number: "1345", 
      titleKey: "visa", 
      descKey: "visaDesc", 
      icon: Briefcase, 
      color: "bg-blue-50 text-blue-600 border-blue-100", 
      btnColor: "bg-blue-600 text-white" 
    },
    { 
      number: "119", 
      titleKey: "fire", 
      descKey: "fireDesc", 
      icon: Siren, 
      color: "bg-red-50 text-red-600 border-red-100", 
      btnColor: "bg-red-600 text-white" 
    },
    { 
      number: "112", 
      titleKey: "police", 
      descKey: "policeDesc", 
      icon: Shield, 
      color: "bg-red-50 text-red-600 border-red-100", 
      btnColor: "bg-red-600 text-white" 
    },
    { 
      number: "1350", 
      titleKey: "labor", 
      descKey: "laborDesc", 
      icon:  Building2,
      color: "bg-green-50 text-green-600 border-green-100", 
      btnColor: "bg-green-600 text-white" 
    },
    { 
        number: "1577-1366", 
        titleKey: "danuri", 
        descKey: "danuriDesc", 
        icon:  HeartHandshake,
        color: "bg-purple-50 text-purple-600 border-purple-100", 
        btnColor: "bg-purple-600 text-white" 
      },
    { 
      number: getEmbassyNumber(lang), 
      titleKey: "embassy", 
      descKey: "embassyDesc", 
      icon: Building2, 
      color: "bg-gray-50 text-gray-700 border-gray-200", 
      btnColor: "bg-gray-700 text-white" 
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-5 rounded-b-3xl shadow-sm z-10 sticky top-0">
        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <PhoneCall className="text-red-500" />
            {t("title")}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-4">
            {HOTLINES.map((item, idx) => (
                <a 
                    key={idx}
                    href={`tel:${item.number}`}
                    className={`flex items-center gap-4 p-4 rounded-2xl border shadow-sm active:scale-95 transition-all ${item.color} bg-white hover:shadow-md`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${item.color.split(' ')[0]}`}>
                        <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-lg font-black leading-tight mb-0.5">{t(item.titleKey)}</div>
                        <div className="text-xs opacity-80 truncate font-medium">{t(item.descKey)}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-black text-lg shadow-sm ${item.btnColor}`}>
                        {item.number.replace(/-/g, '.')}
                    </div>
                </a>
            ))}
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-xl text-xs text-orange-700 leading-relaxed border border-orange-100">
           💡 <strong>Tip:</strong> 위급 상황 시, 119나 112는 24시간 통역 서비스를 지원합니다. 한국어가 서툴러도 걱정하지 말고 전화하세요.
        </div>
      </div>
    </div>
  );
}
