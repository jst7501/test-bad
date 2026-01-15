import { useState } from "react";
import { Calculator, BookOpen, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, DollarSign, Calendar as CalendarIcon } from "lucide-react";

interface DGIProps {
  lang: string;
}

export default function DepartureGuarantee({ lang }: DGIProps) {
  const [activeTab, setActiveTab] = useState<"calc" | "guide">("calc");

  // Calculator State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avgWage, setAvgWage] = useState(""); // 3개월 평균 (퇴직금용)
  const [contractWage, setContractWage] = useState(""); // 통상임금 (보험용)
  const [result, setResult] = useState<{
    legalSeverance: number;
    insuranceAmt: number;
    gap: number;
    serviceDays: number;
  } | null>(null);

  const t = (key: string) => {
    const dict: any = {
      kr: {
        title: "출국만기보험 계산기 & 가이드",
        tabCalc: "예상 수령액 계산",
        tabGuide: "신청 절차 안내",
        // Calc
        startDate: "입사일",
        endDate: "출국(퇴사) 예정일",
        avgWage: "최근 3개월 월 평균 실수령액 (원)",
        contractWage: "근로계약서상 월 통상임금 (원)",
        calcBtn: "계산하기",
        resTitle: "계산 결과 (예상)",
        resLegal: "법정 퇴직금 총액",
        resIns: "삼성화재 보험 지급액",
        resGap: "사업주 차액 지급금",
        resDesc: "법정 퇴직금이 보험금보다 많을 경우, 차액은 사업주가 직접 지급해야 합니다.",
        // Guide Headers
        guideStep: "신청 절차",
        guideMethod: "수령 방법 및 서류",
        guideAirport: "공항 수령 안내",
        guideContact: "문의처",
        // Guide Content - Steps
        step1: "고용센터 신고: 출국 예정일 1개월 이전까지 '출국 예정 신고서' 제출",
        step2: "보험금 신청: 출국 예정일 최소 7일 전까지 삼성화재에 신청",
        step3: "서류 접수: 팩스로 구비 서류 제출 (Fax: 0505-161-1421)",
        step4: "지급: 법무부 출국 정보 확인 후 계좌 입금",
        // Guide Content - Method 1
        m1Title: "국내 계좌 수령",
        m1Desc1: "본인/가족의 현지 계좌와 연결된 **송금 전용계좌** 이용 권장",
        m1Desc2: "필요서류: 신청서, 여권사본, 등록증사본, 통장사본, 출국예정사실확인서",
        m1Bank: "송금전용은행: 국민, 신한, KEB하나, 우리",
        // Guide Content - Method 2
        m2Title: "해외(현지) 계좌 수령",
        m2Desc1: "본인 명의의 해외 계좌로 직접 송금",
        m2Desc2: "필요서류: 신청서(SWIFT CODE 필수), 여권사본, 현지통장사본",
        // Guide Content - Method 3
        m3Title: "공항 환전소 수령",
        m3Desc1: "출국 당일 공항 내 환전소(은행)에서 현금 수령",
        m3Desc2: "**인천공항**: KEB하나, 우리, 국민 / **김해공항**: 부산은행",
        m3Desc3: "수령 가능 시간: 07:30 ~ 21:00 (은행별 상이)",
        m3Desc4: "주의: 출국 4시간 전 공항 도착 필수",
        // Contact
        contactTitle: "삼성화재 외국인근로자보험 전용 콜센터",
        contactLocal: "국내문의",
        contactOverseas: "해외문의",
        contactHours: "상담시간: 평일 09:00 ~ 18:00",
      },
      vn: {
        title: "Bảo hiểm mãn hạn xuất cảnh",
        tabCalc: "Tính toán",
        tabGuide: "Hướng dẫn",
        startDate: "Ngày vào làm",
        endDate: "Ngày xuất cảnh (nghỉ việc)",
        avgWage: "Lương thực nhận TB 3 tháng (Won)",
        contractWage: "Lương hợp đồng (Won)",
        calcBtn: "Tính toán",
        resTitle: "Kết quả dự tính",
        resLegal: "Tổng tiền trợ cấp thôi việc",
        resIns: "Tiền bảo hiểm Samsung",
        resGap: "Chủ lao động trả thêm",
        resDesc: "Nếu tiền trợ cấp lớn hơn tiền bảo hiểm, chủ lao động phải trả phần chênh lệch.",
        guideStep: "Quy trình đăng ký",
        guideMethod: "Phương thức nhận & Hồ sơ",
        guideAirport: "Nhận tại sân bay",
        guideContact: "Liên hệ",
        step1: "Báo cáo TT Việc làm: Nộp 'Đơn báo cáo dự kiến xuất cảnh' trước 1 tháng.",
        step2: "Đăng ký bảo hiểm: Đăng ký với Samsung Fire & Marine trước ít nhất 7 ngày.",
        step3: "Nộp hồ sơ: Gửi hồ sơ qua Fax (0505-161-1421).",
        step4: "Chi trả: Chuyển khoản sau khi Bộ Tư pháp xác nhận thông tin xuất cảnh.",
        m1Title: "Nhận qua tài khoản tại Hàn Quốc",
        m1Desc1: "Khuyến khích dùng **tài khoản chuyển tiền chuyên dụng** liên kết với TK quê nhà.",
        m1Desc2: "Hồ sơ: Đơn đăng ký, Hộ chiếu, Thẻ cư trú, Sổ ngân hàng, Giấy xác nhận xuất cảnh.",
        m1Bank: "Ngân hàng chuyên dụng: Kookmin, Shinhan, KEB Hana, Woori.",
        m2Title: "Nhận qua tài khoản nước ngoài",
        m2Desc1: "Chuyển trực tiếp vào tài khoản đứng tên bản thân ở nước ngoài.",
        m2Desc2: "Hồ sơ: Đơn đăng ký (ghi rõ SWIFT CODE), Hộ chiếu, Sổ ngân hàng nước ngoài.",
        m3Title: "Nhận tại quầy đổi tiền sân bay",
        m3Desc1: "Nhận tiền mặt tại quầy đổi tiền (ngân hàng) trong sân bay vào ngày xuất cảnh.",
        m3Desc2: "**Sân bay Incheon**: KEB Hana, Woori, Kookmin / **Gimhae**: Busan Bank.",
        m3Desc3: "Giờ nhận: 07:30 ~ 21:00 (tùy ngân hàng).",
        m3Desc4: "Lưu ý: Phải đến sân bay trước giờ bay 4 tiếng.",
        contactTitle: "Trung tâm tư vấn Bảo hiểm Samsung",
        contactLocal: "Trong nước",
        contactOverseas: "Nước ngoài",
        contactHours: "Giờ làm việc: Thứ 2-6, 09:00 ~ 18:00",
      },
      kh: {
        title: "ការធានារ៉ាប់រងការចាកចេញ",
        tabCalc: "គណនា",
        tabGuide: "ការណែនាំ",
        startDate: "ថ្ងៃចូលធ្វើការ",
        endDate: "ថ្ងៃចាកចេញ (ឈប់ធ្វើការ)",
        avgWage: "ប្រាក់ខែជាមធ្យម ៣ ខែចុងក្រោយ (វ៉ុន)",
        contractWage: "ប្រាក់ខែក្នុងកិច្ចសន្យា (វ៉ុន)",
        calcBtn: "គណនា",
        resTitle: "លទ្ធផលគណនា",
        resLegal: "ប្រាក់បំណាច់សរុប",
        resIns: "ប្រាក់ធានារ៉ាប់រង Samsung",
        resGap: "ប្រាក់ដែលនិយោជកត្រូវបង់បន្ថែម",
        resDesc: "ប្រសិនបើប្រាក់បំណាច់ធំជាងប្រាក់ធានារ៉ាប់រង និយោជកត្រូវបង់ប្រាក់ខុសគ្នានោះ។",
        guideStep: "នីតិវិធីនៃការដាក់ពាក្យ",
        guideMethod: "វិធីសាស្រ្តទទួល & ឯកសារ",
        guideAirport: "ការទទួលនៅព្រលានយន្តហោះ",
        guideContact: "ទំនាក់ទំនង",
        step1: "រាយការណ៍មជ្ឈមណ្ឌលការងារ៖ ដាក់ពាក្យ 'របាយការណ៍គ្រោងចាកចេញ' ១ ខែមុន។",
        step2: "ដាក់ពាក្យធានារ៉ាប់រង៖ ដាក់ពាក្យទៅ Samsung Fire & Marine យ៉ាងតិច ៧ ថ្ងៃមុន។",
        step3: "ដាក់ឯកសារ៖ ផ្ញើឯកសារតាម Fax (0505-161-1421)។",
        step4: "ការទូទាត់៖ ផ្ទេរប្រាក់បន្ទាប់ពីក្រសួងយុត្តិធម៌បញ្ជាក់ពីការចាកចេញ។",
        m1Title: "ទទួលតាមគណនីក្នុងស្រុក (កូរ៉េ)",
        m1Desc1: "ណែនាំឱ្យប្រើ **គណនីផ្ទេរប្រាក់ពិសេស** ដែលភ្ជាប់ជាមួយគណនីនៅស្រុកកំណើត។",
        m1Desc2: "ឯកសារ៖ ពាក្យស្នើសុំ, លិខិតឆ្លងដែន, ប័ណ្ណស្នាក់នៅ, សៀវភៅធនាគារ, លិខិតបញ្ជាក់ការចាកចេញ។",
        m1Bank: "ធនាគារ៖ Kookmin, Shinhan, KEB Hana, Woori។",
        m2Title: "ទទួលតាមគណនីបរទេស",
        m2Desc1: "ផ្ទេរផ្ទាល់ទៅគណនីឈ្មោះផ្ទាល់ខ្លួននៅបរទេស។",
        m2Desc2: "ឯកសារ៖ ពាក្យស្នើសុំ (ត្រូវមាន SWIFT CODE), លិខិតឆ្លងដែន, សៀវភៅធនាគារបរទេស។",
        m3Title: "ទទួលនៅកន្លែងប្តូរប្រាក់ព្រលានយន្តហោះ",
        m3Desc1: "ទទួលសាច់ប្រាក់នៅកន្លែងប្តូរប្រាក់ (ធនាគារ) ក្នុងព្រលានយន្តហោះនៅថ្ងៃចាកចេញ។",
        m3Desc2: "**Incheon**: KEB Hana, Woori, Kookmin / **Gimhae**: Busan Bank។",
        m3Desc3: "ម៉ោងទទួល៖ 07:30 ~ 21:00 (អាស្រ័យលើធនាគារ)។",
        m3Desc4: "ចំណាំ៖ ត្រូវទៅដល់ព្រលានយន្តហោះ ៤ ម៉ោងមុន។",
        contactTitle: "មជ្ឈមណ្ឌលប្រឹក្សាធានារ៉ាប់រង Samsung",
        contactLocal: "ក្នុងស្រុក",
        contactOverseas: "ក្រៅប្រទេស",
        contactHours: "ម៉ោងធ្វើការ៖ ច័ន្ទ-សុក្រ 09:00 ~ 18:00",
      },
      mm: {
        title: "ထွက်ခွာမှု အာမခံ",
        tabCalc: "တွက်ချက်ရန်",
        tabGuide: "လမ်းညွှန်",
        startDate: "အလုပ်ဝင်ရက်",
        endDate: "ထွက်ခွာမည့်ရက် (အနားယူရက်)",
        avgWage: "လွန်ခဲ့သော ၃ လ၏ ပျမ်းမျှလစာ (ဝမ်)",
        contractWage: "စာချုပ်ပါ လစာ (ဝမ်)",
        calcBtn: "တွက်ချက်မည်",
        resTitle: "တွက်ချက်မှုရလဒ်",
        resLegal: "ဥပဒေအရ နစ်နာကြေးစုစုပေါင်း",
        resIns: "Samsung အာမခံပေးငွေ",
        resGap: "အလုပ်ရှင်ပေးရမည့် ကွာဟငွေ",
        resDesc: "နစ်နာကြေးက အာမခံငွေထက်များပါက ကွာဟငွေကို အလုပ်ရှင်က ပေးရမည်။",
        guideStep: "လျှောက်ထားမှုအဆင့်ဆင့်",
        guideMethod: "ထုတ်ယူနည်းနှင့် စာရွက်စာတမ်း",
        guideAirport: "လေဆိပ်တွင် ထုတ်ယူခြင်း",
        guideContact: "ဆက်သွယ်ရန်",
        step1: "အလုပ်အကိုင်စင်တာသို့ တိုင်ကြားခြင်း: ထွက်ခွာမည့်ရက် ၁ လအလိုတွင် 'ထွက်ခွာမည့်အစီရင်ခံစာ' တင်ပြရမည်။",
        step2: "အာမခံလျှောက်ထားခြင်း: ထွက်ခွာမည့်ရက် အနည်းဆုံး ၇ ရက်အလိုတွင် Samsung Fire & Marine သို့ လျှောက်ထားပါ။",
        step3: "စာရွက်စာတမ်းတင်ပြခြင်း: Fax (0505-161-1421) ဖြင့် စာရွက်စာတမ်းများ ပေးပို့ပါ။",
        step4: "ထုတ်ပေးခြင်း: တရားရေးဝန်ကြီးဌာနမှ ထွက်ခွာကြောင်း အတည်ပြုပြီးနောက် ငွေလွှဲပေးမည်။",
        m1Title: "ပြည်တွင်း (ကိုရီးယား) ဘဏ်စာရင်းဖြင့် လက်ခံခြင်း",
        m1Desc1: "မိခင်နိုင်ငံရှိ ဘဏ်စာရင်းနှင့် ချိတ်ဆက်ထားသော **ငွေလွှဲအထူးစာရင်း** ကို အသုံးပြုရန် အကြံပြုပါသည်။",
        m1Desc2: "လိုအပ်သောစာရွက်စာတမ်းများ: လျှောက်လွှာ၊ နိုင်ငံကူးလက်မှတ်မိတ္တူ၊ နိုင်ငံခြားသားမှတ်ပုံတင်မိတ္တူ၊ ဘဏ်စာအုပ်မိတ္တူ၊ ထွက်ခွာမည့်အကြောင်း ထောက်ခံစာ။",
        m1Bank: "ငွေလွှဲဘဏ်များ: Kookmin, Shinhan, KEB Hana, Woori။",
        m2Title: "ပြည်ပ (မိခင်နိုင်ငံ) ဘဏ်စာရင်းဖြင့် လက်ခံခြင်း",
        m2Desc1: "ပြည်ပရှိ ကိုယ်ပိုင်အမည်ပေါက် ဘဏ်စာရင်းသို့ တိုက်ရိုက်လွှဲပြောင်းခြင်း။",
        m2Desc2: "လိုအပ်သောစာရွက်စာတမ်းများ: လျှောက်လွှာ (SWIFT CODE မဖြစ်မနေပါရမည်)၊ နိုင်ငံကူးလက်မှတ်မိတ္တူ၊ ပြည်ပဘဏ်စာအုပ်မိတ္တူ။",
        m3Title: "လေဆိပ် ငွေလဲကောင်တာတွင် ထုတ်ယူခြင်း",
        m3Desc1: "ထွက်ခွာမည့်နေ့တွင် လေဆိပ်ရှိ ငွေလဲကောင်တာ (ဘဏ်) တွင် ငွေသားထုတ်ယူခြင်း။",
        m3Desc2: "**Incheon**: KEB Hana, Woori, Kookmin / **Gimhae**: Busan Bank။",
        m3Desc3: "ထုတ်ယူနိုင်သည့်အချိန်: 07:30 ~ 21:00 (ဘဏ်အလိုက် ကွာခြားနိုင်သည်)။",
        m3Desc4: "သတိပြုရန်: ထွက်ခွာချိန် ၄ နာရီကြိုတင်၍ လေဆိပ်သို့ ရောက်ရှိရပါမည်။",
        contactTitle: "Samsung အာမခံ ဆက်သွယ်ရေးစင်တာ",
        contactLocal: "ပြည်တွင်း",
        contactOverseas: "ပြည်ပ",
        contactHours: "အချိန်: တနင်္လာ-သောကြာ ၀၉:၀၀ ~ ၁၈:၀၀",
      },
      uz: {
        title: "Chib ketish kafolati sug'urtasi",
        tabCalc: "Hisoblash",
        tabGuide: "Qo'llanma",
        startDate: "Ish boshlash sanasi",
        endDate: "Ketish sanasi (Ishdan bo'shash)",
        avgWage: "So'nggi 3 oylik o'rtacha maosh (Von)",
        contractWage: "Shartnoma maoshi (Von)",
        calcBtn: "Hisoblash",
        resTitle: "Natija",
        resLegal: "Jami ishdan bo'shash puli",
        resIns: "Samsung sug'urta to'lovi",
        resGap: "Ish beruvchi to'laydigan farq",
        resDesc: "Agar ishdan bo'shash puli sug'urtadan ko'p bo'lsa, farqni ish beruvchi to'laydi.",
        guideStep: "Ariza berish tartibi",
        guideMethod: "Olish usuli va Hujjatlar",
        guideAirport: "Aeroportda olish",
        guideContact: "Bog'lanish",
        step1: "Bandlik markaziga xabar berish: Ketishdan 1 oy oldin 'Ketish to'g'risida hisobot' topshirish.",
        step2: "Sug'urta ariza berish: Ketishdan kamida 7 kun oldin Samsung Fire & Marine ga murojaat qiling.",
        step3: "Hujjatlarni topshirish: Fax (0505-161-1421) orqali yuboring.",
        step4: "To'lov: Adliya vazirligi chiqishni tasdiqlagandan so'ng hisobga o'tkaziladi.",
        m1Title: "Koreya bank hisobi orqali olish",
        m1Desc1: "O'z vataningizdagi hisob bilan bog'langan **maxsus o'tkazma hisobi** dan foydalanish tavsiya etiladi.",
        m1Desc2: "Hujjatlar: Ariza, Pasport nusxasi, ID karta nusxasi, Bank daftarchasi, Ketishni tasdiqlovchi hujjat.",
        m1Bank: "Banklar: Kookmin, Shinhan, KEB Hana, Woori.",
        m2Title: "Xorijiy bank hisobi orqali olish",
        m2Desc1: "Xorijdagi o'z nomingizdagi hisobga to'g'ridan-to'g'ri o'tkazish.",
        m2Desc2: "Hujjatlar: Ariza (SWIFT CODE shart), Pasport nusxasi, Xorijiy bank daftarchasi.",
        m3Title: "Aeroport valyuta ayirboshlash shoxobchasida olish",
        m3Desc1: "Ketish kuni aeroportdagi bank shoxobchasida naqd pul olish.",
        m3Desc2: "**Incheon**: KEB Hana, Woori, Kookmin / **Gimhae**: Busan Bank.",
        m3Desc3: "Olish vaqti: 07:30 ~ 21:00 (Bankka qarab farq qilishi mumkin).",
        m3Desc4: "Eslatma: Parvozdan 4 soat oldin aeroportga kelish shart.",
        contactTitle: "Samsung Sug'urta Aloqa Markazi",
        contactLocal: "Ichki qo'ng'iroq",
        contactOverseas: "Xorijdan",
        contactHours: "Ish vaqti: Dushanba-Juma 09:00 ~ 18:00",
      },
    };
    return dict[lang]?.[key] || dict["kr"][key];
  };

  const handleCalc = () => {
    if (!startDate || !endDate || !avgWage || !contractWage) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const serviceDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (serviceDays < 365) {
      alert("근무 기간이 1년 미만인 경우 퇴직금이 발생하지 않습니다.");
      return;
    }

    const wage =  parseInt(avgWage.replace(/,/g, ""));
    const cWage = parseInt(contractWage.replace(/,/g, ""));

    // 1. 법정 퇴직금: (1일 평균임금 * 30일) * (재직일수 / 365)
    // 간단히: (3개월 월 평균 급여) * (재직일수 / 365) 로 근사 계산
    const legalSeverance = Math.floor(wage * (serviceDays / 365));

    // 2. 출국만기보험 적립액: 통상임금의 8.3% * 근무 개월 수
    // 근무 개월 수 = serviceDays / 30 (약식)
    const insuranceAmt = Math.floor(cWage * 0.083 * (serviceDays / 30.4)); // 30.4 is avg days in month

    // 3. 차액
    const gap = Math.max(0, legalSeverance - insuranceAmt);

    setResult({ legalSeverance, insuranceAmt, gap, serviceDays });
  };

  const formatNum = (n: number) => n.toLocaleString();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-5 rounded-b-3xl shadow-sm z-10 sticky top-0">
        <h2 className="text-xl font-black text-gray-800 mb-4">{t("title")}</h2>
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setActiveTab("calc")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "calc"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Calculator size={16} />
            {t("tabCalc")}
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "guide"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <BookOpen size={16} />
            {t("tabGuide")}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "calc" ? (
          <div className="space-y-6">
            {/* Inputs */}
            <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">{t("startDate")}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">{t("endDate")}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">{t("avgWage")}</label>
                <div className="relative">
                   <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={avgWage}
                    onChange={(e) => setAvgWage(e.target.value)}
                    placeholder="2500000"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">{t("contractWage")}</label>
                <div className="relative">
                   <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input
                    type="text"
                    value={contractWage}
                    onChange={(e) => setContractWage(e.target.value)}
                    placeholder="2100000"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 font-bold"
                  />
                </div>
              </div>
              <button
                onClick={handleCalc}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
              >
                {t("calcBtn")}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-600 px-5 py-4 text-white">
                  <h3 className="font-bold flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    {t("resTitle")}
                  </h3>
                  <div className="text-emerald-100 text-xs mt-1">
                    재직기간: {result.serviceDays}일 (약 {Math.floor(result.serviceDays / 365)}년 {Math.floor((result.serviceDays % 365) / 30)}개월)
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-end pb-3 border-b border-gray-100">
                    <span className="text-gray-500 font-medium text-sm">{t("resLegal")}</span>
                    <span className="text-xl font-black text-gray-800">{formatNum(result.legalSeverance)} 원</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-sm">└ {t("resIns")}</span>
                    <span className="text-lg font-bold text-blue-600">{formatNum(result.insuranceAmt)} 원</span>
                  </div>
                   <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-sm">└ {t("resGap")}</span>
                    <span className="text-lg font-bold text-red-500">{formatNum(result.gap)} 원</span>
                  </div>
                  
                  {result.gap > 0 && (
                    <div className="bg-red-50 p-3 rounded-xl flex gap-2 items-start text-red-600 text-xs font-medium leading-relaxed">
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        {t("resDesc")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 pb-10">
            {/* Guide Steps */}
            <GuideSection title={t("guideStep")}>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed marker:font-bold marker:text-emerald-600">
                <li>{t("step1")}</li>
                <li>{t("step2")}</li>
                <li>{t("step3")}</li>
                <li>{t("step4")}</li>
              </ol>
            </GuideSection>

            {/* Methods Table-like Card */}
            <GuideSection title={t("guideMethod")}>
              <div className="space-y-4">
                {/* Method 1: Domestic */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                    {t("m1Title")}
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-8 list-disc">
                    <li dangerouslySetInnerHTML={{ __html: t("m1Desc1").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    <li dangerouslySetInnerHTML={{ __html: t("m1Desc2").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    <li dangerouslySetInnerHTML={{ __html: t("m1Bank").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </ul>
                </div>
                 {/* Method 2: Overseas */}
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                    {t("m2Title")}
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-8 list-disc">
                    <li dangerouslySetInnerHTML={{ __html: t("m2Desc1").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     <li dangerouslySetInnerHTML={{ __html: t("m2Desc2").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </ul>
                </div>
                {/* Method 3: Airport */}
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                    {t("m3Title")}
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-8 list-disc">
                     <li dangerouslySetInnerHTML={{ __html: t("m3Desc1").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     <li dangerouslySetInnerHTML={{ __html: t("m3Desc2").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     <li dangerouslySetInnerHTML={{ __html: t("m3Desc3").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     <li dangerouslySetInnerHTML={{ __html: t("m3Desc4").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </ul>
                </div>
              </div>
            </GuideSection>

            {/* Contact */}
            <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg">
                <h3 className="font-bold text-lg mb-2">{t("contactTitle")}</h3>
                <p className="text-blue-100 text-sm mb-4">Samsung Fire & Marine Insurance Call Center</p>
                <div className="flex items-center gap-4">
                    <div>
                        <div className="text-xs opacity-70">{t("contactLocal")}</div>
                        <div className="text-2xl font-black">1600-0266</div>
                    </div>
                     <div className="w-px h-8 bg-blue-400"></div>
                     <div>
                        <div className="text-xs opacity-70">{t("contactOverseas")}</div>
                        <div className="text-xl font-bold">82-2-2261-8400</div>
                    </div>
                </div>
                <div className="mt-3 text-xs opacity-60">
                    {t("contactHours")}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GuideSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
                <span className="font-bold text-gray-800">{title}</span>
                {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            {open && <div className="p-5 border-t border-gray-100">{children}</div>}
        </div>
    )
}
