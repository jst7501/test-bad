
// 2025년 이후 공휴일 확장을 위해 동적 구조가 좋지만, 일단 데이터 분리
export const HOLIDAYS: { [key: string]: string } = {
    "2025-01-01": "신정",
    "2025-01-27": "설날",
    "2025-01-28": "설날",
    "2025-01-29": "설날",
    "2025-01-30": "대체공휴일",
    "2025-03-01": "삼일절",
    "2025-03-03": "대체공휴일",
    "2025-05-05": "어린이날",
    "2025-05-06": "대체공휴일",
    "2025-06-06": "현충일",
    "2025-08-15": "광복절",
    "2025-10-03": "개천절",
    "2025-10-05": "추석",
    "2025-10-06": "추석",
    "2025-10-07": "추석",
    "2025-10-08": "대체공휴일",
    "2025-10-09": "한글날",
    "2025-12-25": "성탄절",
    "2026-01-01": "신정",
    // ... 추가 공휴일 데이터
};

// 4대보험 요율 (2025년 기준 예시 - 나중에 여기서 숫자만 바꾸면 됨)
export const TAX_RATES_DETAILED: { [key: string]: number } = {
    national: 0.045,    // 국민연금 (근로자 부담분)
    health: 0.03545,    // 건강보험
    care: 0.1295,       // 장기요양 (건강보험료의 약 12.95%)
    employment: 0.009,  // 고용보험
    freelance: 0.033,   // 3.3%

};


export const CURRENCY_MAP: any = {
    kr: { code: "KRW", name: "Korea", symbol: "₩" },
    vn: { code: "VND", name: "Vietnam", symbol: "₫" },
    kh: { code: "KHR", name: "Cambodia", symbol: "៛" },
    mm: { code: "MMK", name: "Myanmar", symbol: "Ks" },
    uz: { code: "UZS", name: "Uzbekistan", symbol: "so'm" },
};

export const DICT: { [key: string]: any } = {
    kr: {
        hourly: "시급",
        taxType: "세금",
        allowance: "수당/보너스",
        dormitory: "기숙사비",
        advance: "가불금",
        basicPay: "기본급",
        otPay: "잔업수당",
        juhyuPay: "주휴수당",
        taxDeduct: "세금공제",
        totalNet: "실수령액",
        save: "저장",
        close: "닫기",
        basicHour: "기본 8h",
        otHour: "잔업(1.5배)",
        guide: "짧게=8시간 / 길게=시간수정",
        funTitle: "내 월급으로 살 수 있는 것",
        tiers: ["알", "병아리", "닭", "황금닭"],
        items: {
            ramen: "라면",
            coffee: "커피",
            chicken: "치킨",
            flight: "비행기표",
            iphone: "아이폰",
        },
    },
    vn: {
        hourly: "Lương giờ",
        taxType: "Thuế",
        allowance: "Phụ cấp",
        dormitory: "Tiền phòng",
        advance: "Tạm ứng",
        basicPay: "Lương cơ bản",
        otPay: "Tiền tăng ca",
        juhyuPay: "Trợ cấp tuần",
        taxDeduct: "Trừ thuế",
        totalNet: "Thực nhận",
        save: "Lưu",
        close: "Đóng",
        basicHour: "Cơ bản 8h",
        otHour: "Tăng ca (1.5)",
        guide: "Chạm=8h / Giữ=Sửa",
        funTitle: "Bạn có thể mua gì?",
        tiers: ["Trứng", "Gà con", "Gà", "Gà vàng"],
        items: {
            ramen: "Mì gói",
            coffee: "Cà phê",
            chicken: "Gà rán",
            flight: "Vé máy bay",
            iphone: "iPhone",
        },
    },
    kh: {
        hourly: "ប្រាក់ម៉ោង",
        taxType: "ពន្ធ",
        allowance: "ប្រាក់ឧបត្ថម្ភ",
        dormitory: "ថ្លៃឈ្នួលផ្ទះ",
        advance: "បើកលុយមុន",
        basicPay: "ប្រាក់គោល",
        otPay: "ថែមម៉ោង",
        juhyuPay: "ប្រាក់ឈប់សម្រាក",
        taxDeduct: "កាត់ពន្ធ",
        totalNet: "ប្រាក់ទទួលបាន",
        save: "រក្សាទុក",
        close: "បិទ",
        basicHour: "ម៉ោងគោល",
        otHour: "ថែមម៉ោង",
        guide: "ចុចខ្លី=៨ម៉ោង / ចុចយូរ=កែប្រែ",
        funTitle: "តើអ្នកអាចទិញអ្វីបាន?",
        tiers: ["ពង", "កូនមាន់", "មាន់", "មាន់មាស"],
        items: {
            ramen: "មី",
            coffee: "កាហ្វេ",
            chicken: "មាន់បំពង",
            flight: "សំបុត្រយន្តហោះ",
            iphone: "iPhone",
        },
    },
    mm: {
        hourly: "တစ်နာရီလုပ်ခ",
        taxType: "အခွန်",
        allowance: "ထောက်ပံ့ကြေး",
        dormitory: "အဆောင်ခ",
        advance: "ကြိုထုတ်ငွေ",
        basicPay: "အခြေခံလစာ",
        otPay: "အချိန်ပိုကြေး",
        juhyuPay: "ရက်မှန်ကြေး",
        taxDeduct: "အခွန်ဖြတ်",
        totalNet: "စုစုပေါင်းရငွေ",
        save: "သိမ်းမည်",
        close: "ပိတ်မည်",
        basicHour: "ပုံမှန် ၈နာရီ",
        otHour: "အချိန်ပို",
        guide: "တချက်နှိပ်=၈နာရီ / ဖိနှိပ်=ပြင်မည်",
        funTitle: "ဘာတွေဝယ်လို့ရမလဲ",
        tiers: ["ဥ", "ကြက်ပေါက်", "ကြက်", "ရွှေကြက်"],
        items: {
            ramen: "ခေါက်ဆွဲ",
            coffee: "ကော်ဖီ",
            chicken: "ကြက်ကြော်",
            flight: "လေယာဉ်လက်မှတ်",
            iphone: "iPhone",
        },
    },
    uz: {
        hourly: "Soatlik haq",
        taxType: "Soliq",
        allowance: "Bonus",
        dormitory: "Yotoqxona",
        advance: "Avans",
        basicPay: "Asosiy oylik",
        otPay: "Qo'shimcha ish",
        juhyuPay: "Dam olish puli",
        taxDeduct: "Soliq ushlanmasi",
        totalNet: "Qo'lga tegadigan",
        save: "Saqlash",
        close: "Yopish",
        basicHour: "Asosiy 8s",
        otHour: "Qo'shimcha",
        guide: "Bosish=8s / Bosib turish=Tahrirlash",
        funTitle: "Nima sotib olsa bo'ladi?",
        tiers: ["Tuxum", "Jo'ja", "Tovuq", "Oltin Tovuq"],
        items: {
            ramen: "Ramen",
            coffee: "Qahva",
            chicken: "Tovuq",
            flight: "Chipta",
            iphone: "iPhone",
        },
    },
};
export const SEVERANCE_DICT: any = {
    kr: {
        title: "퇴직금 계산기",
        subTitle: "예상 퇴직금 확인",
        startDate: "입사일",
        endDate: "퇴사일",
        avgWage: "3개월 평균 월급",
        totalDays: "총 근무일수",
        result: "예상 퇴직금",
        info: "* 실제 지급액과 차이가 있을 수 있습니다.",
        setToday: "오늘",
        currency: "KRW",
        footerTip: "* 출국만기보험(삼성화재) 예상 수령액과 회사 지급 차액을 모두 포함한 대략적인 금액입니다."
    },
    vn: {
        title: "Tính Tiền Thôi Việc",
        subTitle: "Severance Calculator",
        startDate: "Ngày vào làm",
        endDate: "Ngày nghỉ việc",
        avgWage: "Lương trung bình 3 tháng",
        totalDays: "Tổng ngày làm việc",
        result: "Tổng tiền thôi việc",
        info: "* Đây là số tiền ước tính.",
        setToday: "Hôm nay",
        currency: "KRW",
        footerTip: "* Bao gồm tiền bảo hiểm mãn hạn xuất cảnh (Samsung) và phần chênh lệch công ty trả."
    },
    kh: {
        title: "ប្រាក់បំណាច់ឆ្នាំ",
        subTitle: "Severance Calculator",
        startDate: "ថ្ងៃចូលធ្វើការ",
        endDate: "ថ្ងៃឈប់ធ្វើការ",
        avgWage: "ប្រាក់ខែមធ្យម ៣ខែ",
        totalDays: "រយៈពេលធ្វើការ",
        result: "ប្រាក់បំណាច់សរុប",
        info: "* នេះជាចំនួនប៉ាន់ស្មាន។",
        setToday: "ថ្ងៃនេះ",
        currency: "KRW",
        footerTip: "* រួមបញ្ចូលទាំងប្រាក់ធានារ៉ាប់រង (Samsung) និងប្រាក់ដែលក្រុមហ៊ុនត្រូវទូទាត់បន្ថែម។"
    },
    mm: {
        title: "လုပ်သက်ဆုကြေး",
        subTitle: "Severance Calculator",
        startDate: "အလုပ်ဝင်ရက်",
        endDate: "အလုပ်ထွက်ရက်",
        avgWage: "၃လ ပျမ်းမျှလစာ",
        totalDays: "စုစုပေါင်း အလုပ်လုပ်ရက်",
        result: "လုပ်သက်ဆုကြေး စုစုပေါင်း",
        info: "* ခန့်မှန်းခြေ ပမာဏဖြစ်သည်။",
        setToday: "ယနေ့",
        currency: "KRW",
        footerTip: "* Samsung အာမခံ (နှစ်ပြန်ငွေ) နှင့် ကုမ္ပဏီမှ ပေးချေရမည့် ငွေပမာဏ အပါအဝင်ဖြစ်သည်။"
    },
    uz: {
        title: "Ishdan bo'shash puli",
        subTitle: "Severance Calculator",
        startDate: "Ishga kirgan sana",
        endDate: "Ishdan ketgan sana",
        avgWage: "3 oylik o'rtacha maosh",
        totalDays: "Umumiy ish kunlari",
        result: "Jami hisob",
        info: "* Bu taxminiy summadir.",
        setToday: "Bugun",
        currency: "KRW",
        footerTip: "* Samsung sug'urtasi va kompaniya to'laydigan farqni o'z ichiga olgan taxminiy summa."
    },
};

export const TAX_RATES = { fourMajor: 0.094, freelance: 0.033, none: 0.0 };

export const FUN_PRICES = {
    ramen: 1000,
    coffee: 4500,
    chicken: 20000,
    flight: 600000,
    iphone: 1500000,
};
export const ICONS = {
    ramen: "🍜",
    coffee: "☕",
    chicken: "🍗",
    flight: "✈️",
    iphone: "📱",
};
export const TIERS_MIN = [0, 2000000, 3000000, 4000000];
export const TIER_ICONS = ["🥚", "🐥", "🐓", "👑"];