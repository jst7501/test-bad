import { useState } from "react";
import {
  FileText,
  ChevronLeft,
  CheckCircle2,
  Copy,
  PenTool,
  Briefcase,
  Home,
  Siren,
  Printer,
} from "lucide-react";

const UI_DICT: any = {
  kr: {
    title: "서류 자판기",
    subtitle: "한국어 서류, 30초 만에 완성하세요.",
    step1: "서류 선택",
    step2: "정보 입력",
    step3: "완성",
    copy: "복사하기",
    download: "PDF 저장",
    inputName: "이름",
    inputDate: "날짜",
    inputReason: "사유/내용",
    next: "다음",
    categories: { work: "회사/노동", house: "주거/생활", law: "법률/신고" },
  },
  vn: {
    title: "Máy tạo văn bản",
    subtitle: "Tạo văn bản tiếng Hàn trong 30s.",
    step1: "Chọn mẫu",
    step2: "Nhập tin",
    step3: "Hoàn tất",
    copy: "Sao chép",
    download: "Lưu PDF",
    inputName: "Họ tên",
    inputDate: "Ngày",
    inputReason: "Lý do/Nội dung",
    next: "Tiếp theo",
    categories: { work: "Công việc", house: "Nhà ở", law: "Pháp luật" },
  },
  kh: {
    title: "អ្នកបង្កើតឯកសារ",
    subtitle: "បង្កើតឯកសារកូរ៉េក្នុង 30 វិនាទី",
    step1: "ជ្រើសរើស",
    step2: "បញ្ចូលព័ត៌មាន",
    step3: "រួចរាល់",
    copy: "ចម្លង",
    download: "រក្សាទុក PDF",
    inputName: "ឈ្មោះ",
    inputDate: "កាលបរិច្ឆេទ",
    inputReason: "មូលហេតុ",
    next: "បន្ទាប់",
    categories: { work: "ការងារ", house: "ការរស់នៅ", law: "ច្បាប់" },
  },
  mm: {
    title: "စာရွက်စာတမ်း ဖန်တီးသူ",
    subtitle: "ကိုရီးယားစာရွက်စာတမ်း ၃၀ စက္ကန့်အတွင်း",
    step1: "ရွေးချယ်",
    step2: "အချက်အလက်ထည့်",
    step3: "ပြီးပြီ",
    copy: "ကူးယူမည်",
    download: "PDF သိမ်းမည်",
    inputName: "အမည်",
    inputDate: "ရက်စွဲ",
    inputReason: "အကြောင်းရင်း",
    next: "ရှေ့ဆက်",
    categories: { work: "အလုပ်", house: "နေထိုင်မှု", law: "ဥပဒေ" },
  },
  uz: {
    title: "Hujjat Yaratuvchi",
    subtitle: "30 soniyada koreyscha hujjat.",
    step1: "Tanlash",
    step2: "Kiritish",
    step3: "Tayyor",
    copy: "Nusxalash",
    download: "PDF Saqlash",
    inputName: "Ism",
    inputDate: "Sana",
    inputReason: "Sabab",
    next: "Keyingi",
    categories: { work: "Ish", house: "Uy", law: "Qonun" },
  },
};

// 서류 템플릿 데이터
const TEMPLATES = [
  {
    id: "resign",
    cat: "work",
    icon: <Briefcase size={24} />,
    title: {
      kr: "사직서",
      vn: "Đơn xin thôi việc",
      kh: "លិខិតលាឈប់",
      mm: "နှုတ်ထွက်စာ",
      uz: "Ishdan bo'shash arizasi",
    },
    desc: {
      kr: "회사를 그만둘 때 제출하세요.",
      vn: "Nộp khi nghỉ việc.",
      kh: "ដាក់ពាក្យឈប់ពីការងារ",
      mm: "အလုပ်ထွက်လိုသောအခါ",
      uz: "Ishdan ketishda topshiring.",
    },
    content: (name: string, date: string, reason: string) =>
      `사 직 서\n\n성명: ${name}\n퇴사 예정일: ${date}\n\n본인은 상기 예정일을 기하여 그만두고자 하오니 선처하여 주시기 바랍니다.\n\n[사유]\n${reason}\n\n위와 같이 사직서를 제출합니다.\n\n${new Date().getFullYear()}년 ${
        new Date().getMonth() + 1
      }월 ${new Date().getDate()}일\n신청인: ${name} (인)`,
  },
  {
    id: "salary_req",
    cat: "work",
    icon: <DollarSignIcon size={24} />,
    title: {
      kr: "체불임금 독촉장",
      vn: "Yêu cầu trả lương chậm",
      kh: "លិខិតទាមទារប្រាក់ខែ",
      mm: "လစာတောင်းခံစာ",
      uz: "Maosh talab qilish",
    },
    desc: {
      kr: "월급이 안 들어왔을 때 사장님께.",
      vn: "Gửi giám đốc khi chưa nhận lương.",
      kh: "ផ្ញើទៅថៅកែពេលមិនទាន់បើកប្រាក់ខែ",
      mm: "လစာမရသေးပါက",
      uz: "Maosh tushmaganda.",
    },
    content: (name: string, date: string) =>
      `[임금 지급 요청]\n\n수신: 대표이사님\n발신: ${name}\n\n안녕하십니까. ${name}입니다.\n다름이 아니오라 지난 ${date}에 지급되었어야 할 임금이 현재까지 입금되지 않았습니다.\n\n생활에 어려움이 있으니 빠른 시일 내에 지급 부탁드립니다.\n혹시 착오가 있으시다면 확인 부탁드립니다.\n\n감사합니다.`,
  },
  {
    id: "repair",
    cat: "house",
    icon: <Home size={24} />,
    title: {
      kr: "수리 요청 문자",
      vn: "Yêu cầu sửa chữa",
      kh: "សំណើជួសជុល",
      mm: "ပြုပြင်ရန်တောင်းဆိုခြင်း",
      uz: "Ta'mirlash so'rovi",
    },
    desc: {
      kr: "보일러, 에어컨 등 고장 났을 때.",
      vn: "Hỏng hóc thiết bị trong nhà.",
      kh: "ពេលមានរបស់ខូច",
      mm: "ပစ္စည်းပျက်စီးသောအခါ",
      uz: "Buzilgan narsalarni tuzatish.",
    },
    content: (name: string, reason: string) =>
      `안녕하세요 집주인님.\n${name} (세입자) 입니다.\n\n다름이 아니라 집에 문제가 생겨 연락드립니다.\n\n[문제 내용]\n${reason}\n\n불편함이 커서 빠른 수리가 필요합니다.\n방문 가능하신 시간을 알려주시면 감사하겠습니다.`,
  },
  {
    id: "accident",
    cat: "law",
    icon: <Siren size={24} />,
    title: {
      kr: "산재 신청 요청",
      vn: "Yêu cầu bồi thường tai nạn",
      kh: "សំណើសំណងគ្រោះថ្នាក់",
      mm: "မတော်တဆမှုလျော်ကြေး",
      uz: "Baxtsiz hodisa kompensatsiyasi",
    },
    desc: {
      kr: "일하다 다쳤을 때 회사에 알림.",
      vn: "Thông báo khi bị tai nạn lao động.",
      kh: "ជូនដំណឹងពេលមានគ្រោះថ្នាក់ការងារ",
      mm: "လုပ်ငန်းခွင်ထိခိုက်မှု",
      uz: "Ishda jarohatlanganda.",
    },
    content: (name: string, date: string, reason: string) =>
      `[산재 처리 요청]\n\n성명: ${name}\n사고일시: ${date}\n\n상기 본인은 작업 중 부상을 입어 치료가 필요합니다.\n\n[사고 경위]\n${reason}\n\n이에 산업재해 보상보험 처리를 요청드립니다.\n협조 부탁드립니다.`,
  },
];

// Helper Icon
function DollarSignIcon({ size }: { size: number }) {
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
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

// =========================================================
// [Main Component]
// =========================================================
export default function DocMaker({ lang }: { lang: string }) {
  const t = UI_DICT[lang] || UI_DICT["kr"];
  const l = (obj: any) => obj[lang] || obj["kr"];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // Input States
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSelect = (temp: any) => {
    setSelectedTemplate(temp);
    setStep(2);
    // 초기화
    setName("");
    setDate("");
    setReason("");
  };

  const handleGenerate = () => {
    if (!name || !date) return alert("Please fill in all fields");
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const generatedText = selectedTemplate
    ? selectedTemplate.content(name, date, reason)
    : "";

  return (
    <div className="relative flex flex-col w-full h-full font-sans bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {step === 1 ? (
          <div className="flex items-center gap-2 text-lg font-bold text-indigo-700">
            <FileText size={24} /> {t.title}
          </div>
        ) : (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {/* Step Indicator */}
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${
                step >= s ? "bg-indigo-600" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 pb-10 overflow-y-auto scrollbar-hide">
        {/* STEP 1: Select Template */}
        {step === 1 && (
          <div className="p-5 space-y-6">
            <div className="p-5 text-white bg-indigo-600 shadow-lg rounded-2xl shadow-indigo-200">
              <h2 className="mb-1 text-xl font-bold">{t.title}</h2>
              <p className="text-sm text-indigo-100 opacity-90">{t.subtitle}</p>
            </div>

            <div>
              <h3 className="px-1 mb-3 text-sm font-bold text-gray-500">
                {t.categories.work}
              </h3>
              <div className="space-y-3">
                {TEMPLATES.filter((x) => x.cat === "work").map((temp) => (
                  <TemplateCard
                    key={temp.id}
                    temp={temp}
                    onClick={() => handleSelect(temp)}
                    l={l}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="px-1 mb-3 text-sm font-bold text-gray-500">
                {t.categories.house} / {t.categories.law}
              </h3>
              <div className="space-y-3">
                {TEMPLATES.filter((x) => x.cat !== "work").map((temp) => (
                  <TemplateCard
                    key={temp.id}
                    temp={temp}
                    onClick={() => handleSelect(temp)}
                    l={l}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Input Info */}
        {step === 2 && selectedTemplate && (
          <div className="p-5">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-indigo-600 bg-indigo-100 rounded-full">
                {selectedTemplate.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {l(selectedTemplate.title)}
              </h2>
              <p className="text-sm text-gray-500">
                {l(selectedTemplate.desc)}
              </p>
            </div>

            <div className="p-5 space-y-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-500">
                  {t.inputName} (English/Korean)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-indigo-500"
                  placeholder="Kim Chul-soo"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-500">
                  {t.inputDate}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-500">
                  {t.inputReason}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-indigo-500"
                  placeholder="Write in your language or Korean..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Result */}
        {step === 3 && (
          <div className="flex flex-col h-full p-5">
            <div className="flex items-center justify-center gap-2 mb-4 font-bold text-green-600 animate-fade-in">
              <CheckCircle2 size={20} /> Success!
            </div>

            <div className="flex-1 p-6 font-serif text-sm leading-loose text-gray-800 whitespace-pre-wrap bg-white border border-gray-200 rounded-none shadow-sm">
              {generatedText}
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex items-center justify-center flex-1 gap-2 py-3 font-bold text-gray-700 transition bg-white border border-gray-200 rounded-xl active:scale-95">
                <Copy size={18} /> {t.copy}
              </button>
              <button className="flex items-center justify-center flex-1 gap-2 py-3 font-bold text-white transition bg-indigo-600 shadow-lg rounded-xl active:scale-95 shadow-indigo-200">
                <Printer size={18} /> {t.download}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action (Step 2 Only) */}
      {step === 2 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <button
            onClick={handleGenerate}
            disabled={!name || !date}
            className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition active:scale-[0.98] ${
              name && date
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
}

function TemplateCard({ temp, onClick, l }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition cursor-pointer"
    >
      <div className="flex items-center justify-center w-12 h-12 text-indigo-600 rounded-lg bg-indigo-50 shrink-0">
        {temp.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900">{l(temp.title)}</h4>
        <p className="text-xs text-gray-500 line-clamp-1">{l(temp.desc)}</p>
      </div>
      <div className="p-2 text-gray-400 rounded-full bg-gray-50">
        <PenTool size={16} />
      </div>
    </div>
  );
}
