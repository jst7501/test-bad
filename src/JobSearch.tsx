import { useState, useMemo } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  ChevronLeft,
  Building,
  CheckCircle2,
  Utensils,
} from "lucide-react";

const UI_DICT: any = {
  kr: {
    title: "이직 정보",
    placeholder: "지역, 업종 검색",
    salary: "월급",
    hourly: "시급",
    visa: "비자",
    dorm: "기숙사",
    apply: "지원하기",
    detail: "상세보기",
    filters: {
      all: "전체",
      manu: "제조업",
      agri: "농축산",
      const: "건설",
      serv: "서비스",
    },
    tags: {
      E9: "E-9 가능",
      H2: "H-2 가능",
      F4: "F-4 환영",
      Dorm: "기숙사 제공",
      Food: "식사 제공",
    },
  },
  vn: {
    title: "Tìm việc làm",
    placeholder: "Khu vực, Ngành nghề",
    salary: "Lương tháng",
    hourly: "Lương giờ",
    visa: "Visa",
    dorm: "KTX",
    apply: "Ứng tuyển",
    detail: "Chi tiết",
    filters: {
      all: "Tất cả",
      manu: "Sản xuất",
      agri: "Nông nghiệp",
      const: "Xây dựng",
      serv: "Dịch vụ",
    },
    tags: {
      E9: "Chấp nhận E-9",
      H2: "Chấp nhận H-2",
      F4: "Chấp nhận F-4",
      Dorm: "Có KTX",
      Food: "Bao ăn",
    },
  },
  kh: {
    title: "រកការងារ",
    placeholder: "ស្វែងរក",
    salary: "ប្រាក់ខែ",
    hourly: "ម៉ោង",
    visa: "ទិដ្ឋាការ",
    dorm: "កន្លែងស្នាក់នៅ",
    apply: "ដាក់ពាក្យ",
    detail: "លម្អិត",
    filters: {
      all: "ទាំងអស់",
      manu: "រោងចក្រ",
      agri: "កសិកម្ម",
      const: "សំណង់",
      serv: "សេវាកម្ម",
    },
    tags: {
      E9: "E-9 OK",
      H2: "H-2 OK",
      F4: "F-4 OK",
      Dorm: "មានកន្លែងស្នាក់នៅ",
      Food: "មានអាហារ",
    },
  },
  mm: {
    title: "အလုပ်ရှာဖွေရန်",
    placeholder: "ရှာဖွေပါ",
    salary: "လစာ",
    hourly: "နာရီစား",
    visa: "ဗီဇာ",
    dorm: "အဆောင်",
    apply: "လျှောက်ထားမည်",
    detail: "အသေးစိတ်",
    filters: {
      all: "အားလုံး",
      manu: "စက်ရုံ",
      agri: "စိုက်ပျိုးရေး",
      const: "ဆောက်လုပ်ရေး",
      serv: "ဝန်ဆောင်မှု",
    },
    tags: {
      E9: "E-9 ရသည်",
      H2: "H-2 ရသည်",
      F4: "F-4 ရသည်",
      Dorm: "အဆောင်ရှိ",
      Food: "ထမင်းကျွေး",
    },
  },
  uz: {
    title: "Ish izlash",
    placeholder: "Qidirish",
    salary: "Oylik",
    hourly: "Soatlik",
    visa: "Viza",
    dorm: "Yotoqxona",
    apply: "Topshirish",
    detail: "Batafsil",
    filters: {
      all: "Barchasi",
      manu: "Ishlab chiqarish",
      agri: "Qishloq xo'jaligi",
      const: "Qurilish",
      serv: "Xizmat",
    },
    tags: {
      E9: "E-9 OK",
      H2: "H-2 OK",
      F4: "F-4 OK",
      Dorm: "Yotoqxona bor",
      Food: "Ovqat bor",
    },
  },
};

const getMockJobs = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];
  return [
    {
      id: 1,
      company: "S M Tech",
      industry: "manu",
      title: l({
        kr: "자동차 부품 조립/검사 (주야 2교대)",
        vn: "Lắp ráp/Kiểm tra linh kiện ô tô (2 ca)",
        kh: "ដំឡើងគ្រឿងបន្លាស់រថយន្ត",
        mm: "ကားအစိတ်အပိုင်း တပ်ဆင်ခြင်း",
        uz: "Avtomobil qismlarini yig'ish",
      }),
      loc: l({
        kr: "화성시 장안면",
        vn: "Hwaseong",
        kh: "Hwaseong",
        mm: "Hwaseong",
        uz: "Hwaseong",
      }),
      payType: "Monthly",
      pay: "320~400",
      visas: ["E9", "H2"],
      tags: ["Dorm", "Food"],
      desc: l({
        kr: "초보 가능, 잔업 특근 많음. 월급 밀린 적 없음.",
        vn: "Không cần kinh nghiệm, nhiều tăng ca. Trả lương đúng hạn.",
        kh: "មិនត្រូវការបទពិសោធន៍។",
        mm: "အတွေ့အကြုံမလိုပါ။",
        uz: "Tajriba shart emas. Oylik vaqtida.",
      }),
    },
    {
      id: 2,
      company: "Green Farm",
      industry: "agri",
      title: l({
        kr: "깻잎 농장 수확 작업",
        vn: "Thu hoạch lá vừng",
        kh: "ប្រមូលផលស្លឹកល្ង",
        mm: "နှမ်းရွက်ခူးခြင်း",
        uz: "Kunjut bargini yig'ish",
      }),
      loc: l({
        kr: "충남 금산군",
        vn: "Geumsan",
        kh: "Geumsan",
        mm: "Geumsan",
        uz: "Geumsan",
      }),
      payType: "Monthly",
      pay: "230~250",
      visas: ["E9"],
      tags: ["Dorm", "Food"],
      desc: l({
        kr: "숙식 제공, 가족 같은 분위기.",
        vn: "Bao ăn ở, môi trường gia đình.",
        kh: "ផ្តល់កន្លែងស្នាក់នៅនិងអាហារ។",
        mm: "နေစရာစားစရာပေးသည်။",
        uz: "Yotoq va ovqat bepul.",
      }),
    },
    {
      id: 3,
      company: "Best Food",
      industry: "manu",
      title: l({
        kr: "김치 공장 생산직",
        vn: "Sản xuất Kimchi",
        kh: "រោងចក្រ គីមឈី",
        mm: "ကင်မ်ချီစက်ရုံ",
        uz: "Kimchi zavodi",
      }),
      loc: l({
        kr: "평택시 청북읍",
        vn: "Pyeongtaek",
        kh: "Pyeongtaek",
        mm: "Pyeongtaek",
        uz: "Pyeongtaek",
      }),
      payType: "Monthly",
      pay: "280~300",
      visas: ["H2", "F4"],
      tags: ["Food"],
      desc: l({
        kr: "주간 고정, 여성 우대. 셔틀버스 운행.",
        vn: "Ca ngày cố định, ưu tiên nữ. Xe đưa đón.",
        kh: "វេនថ្ងៃថេរ។",
        mm: "နေ့ဆိုင်းသီးသန့်။",
        uz: "Faqat kunduzi ish.",
      }),
    },
    {
      id: 4,
      company: "Power Const",
      industry: "const",
      title: l({
        kr: "현장 정리 및 자재 운반",
        vn: "Dọn dẹp công trường",
        kh: "សម្អាតការដ្ឋាន",
        mm: "ဆောက်လုပ်ရေးလုပ်သား",
        uz: "Qurilish maydonini tozalash",
      }),
      loc: l({
        kr: "수원시 팔달구",
        vn: "Suwon",
        kh: "Suwon",
        mm: "Suwon",
        uz: "Suwon",
      }),
      payType: "Daily",
      pay: "16~18",
      visas: ["H2", "F4"],
      tags: ["Food"],
      desc: l({
        kr: "일당 당일 지급. 초보 가능.",
        vn: "Trả lương trong ngày. Không cần kinh nghiệm.",
        kh: "បើកលុយប្រចាំថ្ងៃ។",
        mm: "နေ့တွက် နေ့ရှင်း။",
        uz: "Kunlik to'lov.",
      }),
    },
  ];
};

export default function JobSearch({ lang }: { lang: string }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const list = useMemo(() => getMockJobs(lang), [lang]);
  const filtered = list.filter(
    (i) => filter === "all" || i.industry === filter
  );

  const goDetail = (job: any) => {
    setSelectedJob(job);
    setView("detail");
  };
  const goBack = () => {
    setView("list");
    setSelectedJob(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full font-sans bg-slate-50">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
        {view === "detail" ? (
          <button onClick={goBack}>
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-lg font-bold text-indigo-700">
            <Briefcase size={24} /> {t.title}
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
              {Object.keys(t.filters).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    filter === key
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-200 text-gray-500"
                  }`}
                >
                  {t.filters[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => goDetail(item)}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 active:scale-[0.99] transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {t.filters[item.industry]}
                  </span>
                  <span className="text-xs font-bold text-indigo-600">
                    {item.company}
                  </span>
                </div>
                <h3 className="mb-3 text-base font-bold leading-tight text-gray-900">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {item.visas.map((v: string) => (
                    <span
                      key={v}
                      className="text-[10px] border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded font-bold"
                    >
                      {t.tags[v]}
                    </span>
                  ))}
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-bold"
                    >
                      {t.tags[tag]}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {item.loc}
                  </div>
                  <div className="text-lg font-black text-gray-900">
                    {item.payType === "Monthly" ? "" : "Day"} {item.pay}{" "}
                    <span className="text-xs font-normal text-gray-400">
                      만
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "detail" && selectedJob && (
        <div className="flex-1 pb-24 overflow-y-auto bg-white">
          <div className="p-6 pb-8 text-white bg-indigo-600">
            <div className="flex items-center gap-1 mb-2 text-xs font-bold opacity-80">
              <Building size={14} /> {selectedJob.company}
            </div>
            <h2 className="text-xl font-bold leading-snug">
              {selectedJob.title}
            </h2>
          </div>

          <div className="p-5 -mt-4 bg-white rounded-t-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="mb-1 text-xs font-bold text-gray-400">
                  {t.salary}
                </div>
                <div className="text-2xl font-black text-indigo-600">
                  {selectedJob.pay}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    만원
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-1 text-xs font-bold text-gray-400">
                  Visa Type
                </div>
                <div className="flex justify-end gap-1">
                  {selectedJob.visas.map((v: string) => (
                    <span
                      key={v}
                      className="px-2 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-100 bg-gray-50 rounded-xl">
                <h3 className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-900">
                  <CheckCircle2 size={16} /> {t.detail}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {selectedJob.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {selectedJob.tags.includes("Dorm") && (
                  <div className="p-3 text-center border border-indigo-100 rounded-lg bg-indigo-50">
                    <Building
                      size={20}
                      className="mx-auto mb-1 text-indigo-600"
                    />
                    <span className="text-xs font-bold text-indigo-700">
                      {t.tags.Dorm}
                    </span>
                  </div>
                )}
                {selectedJob.tags.includes("Food") && (
                  <div className="p-3 text-center border border-orange-100 rounded-lg bg-orange-50">
                    <Utensils
                      size={20}
                      className="mx-auto mb-1 text-orange-600"
                    />
                    <span className="text-xs font-bold text-orange-700">
                      {t.tags.Food}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 z-20 w-full p-4 bg-white border-t border-gray-100">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition active:scale-[0.98]">
              {t.apply}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
