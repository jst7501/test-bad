import { useState } from "react";
import { Search, Calendar, MapPin, ExternalLink, GraduationCap, Clock, Users } from "lucide-react";

interface KiipHelperProps {
  lang: string;
}

// [Data] Course Data Parsed from User Input
const COURSES = [
  {
    agency: "(사)다모임한사랑복지 (숙련기능인력반)",
    address: "경기도 평택시 송탄로 394 4층",
    region: "평택",
    class: "2026-1 3단계(특별반)",
    level: "한국어중급1",
    period: "01.24 ~ 05.02",
    reqPeriod: "01.06 ~ 01.31",
    status: "신청마감",
    capacity: "0 / 15",
  },
  {
    agency: "(사)다모임한사랑복지",
    address: "경기도 평택시 송탄로 394 4층",
    region: "평택",
    class: "2026-1 3단계(주말반)",
    level: "한국어중급1",
    period: "01.24 ~ 04.25",
    reqPeriod: "01.06 ~ 01.30",
    status: "신청마감",
    capacity: "1 / 19",
  },
  {
    agency: "경희대학교국제캠퍼스 (숙련기능인력반)",
    address: "경기도 용인시 기흥구 덕영대로 1732",
    region: "용인",
    class: "숙련인력특별반 주말반(일)",
    level: "한국어중급1",
    period: "01.18 ~ 04.19",
    reqPeriod: "01.06 ~ 01.28",
    status: "신청마감",
    capacity: "0 / 25",
  },
  {
    agency: "공도다문화센터 (숙련기능인력반)",
    address: "경기도 안성시 공도읍 장수길 43",
    region: "안성",
    class: "2026-1 3단계(특별반)",
    level: "한국어중급1",
    period: "01.18 ~ 04.12",
    reqPeriod: "01.06 ~ 01.14",
    status: "신청마감",
    capacity: "0 / 23",
  },
  {
    agency: "국제대학교",
    address: "경기도 평택시 장안웃길 56",
    region: "평택",
    class: "2026-1 3단계(주말반)",
    level: "한국어중급1",
    period: "01.17 ~ 04.25",
    reqPeriod: "01.06 ~ 01.30",
    status: "신청마감",
    capacity: "1 / 24",
  },
  {
    agency: "국제사이버대학교",
    address: "경기도 수원시 팔달구 경수대로 490",
    region: "수원",
    class: "일요일3단계",
    level: "한국어중급1",
    period: "01.18 ~ 04.19",
    reqPeriod: "01.06 ~ 01.15",
    status: "신청마감",
    capacity: "0 / 20",
  },
  {
    agency: "까리따스 이주민 초월센터",
    address: "경기도 광주시 초월읍 진새골길 17 2층",
    region: "광주",
    class: "주말반(토)",
    level: "한국어중급1",
    period: "01.31 ~ 04.25",
    reqPeriod: "01.06 ~ 02.10",
    status: "신청마감",
    capacity: "3 / 19",
  },
  {
    agency: "까리따스 이주민 화성센터",
    address: "경기도 화성시 향남읍 3.1만세로 1134",
    region: "화성",
    class: "토)2026-1차시 3단계",
    level: "한국어중급1",
    period: "01.17 ~ 04.11",
    reqPeriod: "01.06 ~ 01.23",
    status: "신청마감",
    capacity: "3 / 12",
  },
  {
    agency: "너른골외국인교육센터 (숙련기능인력반)",
    address: "경기도 광주시 곤지암읍 평촌길 24",
    region: "광주",
    class: "숙련인력특별반 주말반(토)",
    level: "한국어중급1",
    period: "01.17 ~ 04.11",
    reqPeriod: "01.06 ~ 01.27",
    status: "신청마감",
    capacity: "0 / 24",
  },
  {
    agency: "동탄숲이주민센터",
    address: "경기도 화성시 동탄오산로 86-10",
    region: "화성",
    class: "평일)2026-1차시 3단계",
    level: "한국어중급1",
    period: "01.19 ~ 04.15",
    reqPeriod: "01.06 ~ 01.22",
    status: "대기가능",
    capacity: "0 / 15",
  },
  {
    agency: "따이랑",
    address: "경기도 이천시 증신로153번길 38",
    region: "이천",
    class: "주말반(토일)",
    level: "한국어중급1",
    period: "01.17 ~ 04.19",
    reqPeriod: "01.06 ~ 01.27",
    status: "대기가능",
    capacity: "0 / 18",
  },
  {
    agency: "따이랑 (숙련기능인력반)",
    address: "경기도 이천시 증신로153번길 38",
    region: "이천",
    class: "숙련인력특별반 주말반(토)",
    level: "한국어중급1",
    period: "01.17 ~ 04.25",
    reqPeriod: "01.06 ~ 01.27",
    status: "신청마감",
    capacity: "0 / 16",
  },
  {
    agency: "사단법인 그레이스가든",
    address: "경기도 화성시 남양읍 남양시장로25번길 58",
    region: "화성",
    class: "토)2026-1차 3단계",
    level: "한국어중급1",
    period: "01.17 ~ 04.18",
    reqPeriod: "01.06 ~ 01.24",
    status: "신청마감",
    capacity: "0 / 20",
  },
  {
    agency: "사단법인 더큰이웃아시아",
    address: "경기도 화성시 떡전골로 104-7",
    region: "화성",
    class: "평일)2026-1차시 3단계",
    level: "한국어중급1",
    period: "02.03 ~ 04.23",
    reqPeriod: "01.06 ~ 01.30",
    status: "대기가능",
    capacity: "1 / 19",
  },
  {
    agency: "사단법인 더큰이웃아시아",
    address: "경기도 화성시 떡전골로 104-7",
    region: "화성",
    class: "토)2026-1차시 3단계",
    level: "한국어중급1",
    period: "01.31 ~ 04.25",
    reqPeriod: "01.06 ~ 01.30",
    status: "신청마감",
    capacity: "1 / 14",
  },
  {
    agency: "사단법인 이천다사랑다문화센터",
    address: "경기도 이천시 서희로71번길 14",
    region: "이천",
    class: "주말반(토일)",
    level: "한국어중급1",
    period: "01.17 ~ 04.18",
    reqPeriod: "01.06 ~ 01.27",
    status: "대기가능",
    capacity: "0 / 18",
  },
  {
    agency: "사단법인 함께하는 이웃",
    address: "경기도 광주시 중앙로 95-1 4층",
    region: "광주",
    class: "주간반(화목)",
    level: "한국어중급1",
    period: "01.20 ~ 04.16",
    reqPeriod: "01.06 ~ 01.30",
    status: "신청가능",
    capacity: "3 / 22",
  },
  {
    agency: "서평택다이룸센터",
    address: "경기도 평택시 포승읍 여술1길 70",
    region: "평택",
    class: "2026-1 3단계(주말반)",
    level: "한국어중급1",
    period: "01.24 ~ 04.18",
    reqPeriod: "01.06 ~ 01.08",
    status: "신청마감",
    capacity: "3 / 19",
  },
  {
    agency: "서평택다이룸센터 (숙련기능인력반)",
    address: "경기도 평택시 포승읍 여술1길 70",
    region: "평택",
    class: "2026-1 3단계(특별반)",
    level: "한국어중급1",
    period: "01.24 ~ 04.18",
    reqPeriod: "01.07 ~ 01.12",
    status: "신청마감",
    capacity: "0 / 22",
  },
  {
    agency: "세움외국인센터 (숙련기능인력반)",
    address: "경기도 광주시 경안안길 43-3",
    region: "광주",
    class: "숙련인력특별반 야간반(화수목)",
    level: "한국어중급1",
    period: "01.20 ~ 04.14",
    reqPeriod: "01.06 ~ 01.31",
    status: "신청마감",
    capacity: "0 / 15",
  },
  {
    agency: "안성시가족센터",
    address: "경기도 안성시 아양2로 37",
    region: "안성",
    class: "2026-1 3단계(주간반)",
    level: "한국어중급1",
    period: "01.19 ~ 04.22",
    reqPeriod: "01.06 ~ 02.02",
    status: "대기가능",
    capacity: "3 / 20",
  },
  {
    agency: "어울림비전센터 (숙련기능인력반)",
    address: "경기도 이천시 장호원읍 장여로55번길 40",
    region: "이천",
    class: "숙련인력특별반 주말반(일)",
    level: "한국어중급1",
    period: "01.18 ~ 04.26",
    reqPeriod: "01.06 ~ 01.28",
    status: "신청마감",
    capacity: "0 / 22",
  },
  {
    agency: "여주시외국인복지센터 (숙련기능인력반)",
    address: "경기도 여주시 여흥로109번길 15",
    region: "여주",
    class: "숙련인력특별반 주말반(토)",
    level: "한국어중급1",
    period: "01.17 ~ 04.25",
    reqPeriod: "01.06 ~ 01.27",
    status: "신청마감",
    capacity: "0 / 25",
  },
  {
    agency: "용인예술과학대학교",
    address: "경기도 용인시 처인구 동부로 61",
    region: "용인",
    class: "주말반(토)",
    level: "한국어중급1",
    period: "01.24 ~ 04.25",
    reqPeriod: "01.06 ~ 02.03",
    status: "신청마감",
    capacity: "3 / 17",
  },
  {
    agency: "평택대학교 다문화교육원",
    address: "경기도 평택시 서동대로 3825",
    region: "평택",
    class: "2026-1 3단계(주간반)",
    level: "한국어중급1",
    period: "01.21 ~ 04.24",
    reqPeriod: "01.06 ~ 01.30",
    status: "신청가능",
    capacity: "3 / 22",
  },
  {
    agency: "평택시가족센터",
    address: "경기도 평택시 서정로 295",
    region: "평택",
    class: "2026-1 3단계(주간반)",
    level: "한국어중급1",
    period: "02.05 ~ 04.23",
    reqPeriod: "01.06 ~ 02.13",
    status: "대기가능",
    capacity: "1 / 19",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-8 (17시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-10 (19시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-6 (15시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-5 (13시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-1 (09시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-4 (13시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-3 (11시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "한국이민재단 (온라인)",
    address: "온라인 (Zoom)",
    region: "온라인",
    class: "3단계-7 (15시)",
    level: "한국어중급1",
    period: "02.09 ~ 04.29",
    reqPeriod: "01.26 ~ 02.03",
    status: "신청시작전",
    capacity: "1 / 12",
  },
  {
    agency: "합정종합사회복지관 (숙련기능인력반)",
    address: "경기도 평택시 평택로 22",
    region: "평택",
    class: "2026-1 3단계(특별반)",
    level: "한국어중급1",
    period: "01.17 ~ 04.18",
    reqPeriod: "01.06 ~ 01.13",
    status: "신청마감",
    capacity: "0 / 23",
  },
  {
    agency: "향상교회",
    address: "경기도 용인시 기흥구 언동로 140",
    region: "용인",
    class: "주말반(토)",
    level: "한국어중급1",
    period: "01.24 ~ 04.25",
    reqPeriod: "01.06 ~ 02.03",
    status: "신청마감",
    capacity: "3 / 17",
  },
  {
    agency: "화성시외국인복지센터 (숙련기능인력반)",
    address: "경기도 화성시 향남읍 발안공단로 92-23",
    region: "화성",
    class: "토)숙련기능양성 3단계",
    level: "한국어중급1",
    period: "01.17 ~ 04.18",
    reqPeriod: "01.06 ~ 01.16",
    status: "신청마감",
    capacity: "0 / 20",
  },
  {
    agency: "화성시외국인복지센터",
    address: "경기도 화성시 향남읍 발안공단로 92-23",
    region: "화성",
    class: "평일)2026-1차시 3단계",
    level: "한국어중급1",
    period: "01.20 ~ 04.16",
    reqPeriod: "01.06 ~ 01.28",
    status: "신청마감",
    capacity: "2 / 18",
  },
  {
    agency: "화성시외국인복지센터",
    address: "경기도 화성시 향남읍 발안공단로 92-23",
    region: "화성",
    class: "섭리일)2026-1차시 3단계",
    level: "한국어중급1",
    period: "01.18 ~ 04.26",
    reqPeriod: "01.07 ~ 01.19",
    status: "신청마감",
    capacity: "2 / 18",
  },
];

// Helper: Calculate D-Day
const getDday = (targetDate: string) => {
  const target = new Date(targetDate);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "D-Day";
  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
};

export default function KiipHelper({}: KiipHelperProps) {
  const [search, setSearch] = useState("");

  const t = (key: string) => {
    const dict: any = {
      kr: {
        title: "사회통합프로그램 (KIIP) 도우미",
        desc: "KIIP 일정 확인 및 과정 검색",
        ddayTitle: "다음 시험 일정",
        exam1: "2026년 2차 사전평가",
        exam2: "2026년 2차 종합평가",
        searchPh: "지역 또는 기관명 검색 (예: 평택, 화성)",
        listTitle: "개설 과정 리스트 (3단계)",
        linkBtn: "사회통합정보망(Soci-Net) 바로가기",
        statusDict: {
           "신청가능": "bg-green-100 text-green-700",
           "대기가능": "bg-yellow-100 text-yellow-700",
           "신청마감": "bg-gray-100 text-gray-500",
           "신청시작전": "bg-blue-100 text-blue-700",
        }
      },
      // 다른 언어는 한국어로 fallback (User request: "모든 응답은 한국어로")
    };
    return dict["kr"][key] || key;
  };

  const filteredCourses = COURSES.filter(
    (c) =>
      c.agency.includes(search) ||
      c.address.includes(search) ||
      c.region.includes(search) ||
      c.class.includes(search)
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-5 bg-white shadow-sm rounded-b-3xl z-10 sticky top-0">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black text-indigo-900">{t("title")}</h2>
            <GraduationCap size={24} className="text-indigo-600" />
        </div>
        <p className="text-xs text-gray-500 mb-4">{t("desc")}</p>
        
        {/* D-Day Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {/* Exam 1 */}
            <div className="min-w-[140px] bg-indigo-600 rounded-xl p-3 text-white shadow-lg shadow-indigo-200">
                <span className="text-[10px] opacity-80 block mb-1">2026.02.15 (토)</span>
                <h3 className="text-sm font-bold leading-tight mb-2">{t("exam1")}</h3>
                <div className="text-2xl font-black">{getDday("2026-02-15")}</div>
            </div>
             {/* Exam 2 */}
             <div className="min-w-[140px] bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <span className="text-[10px] text-gray-400 block mb-1">2026.03.01 (일)</span>
                <h3 className="text-sm font-bold leading-tight mb-2 text-gray-800">{t("exam2")}</h3>
                <div className="text-2xl font-black text-indigo-600">{getDday("2026-03-01")}</div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* External Link */}
        <a 
            href="https://www.socinet.go.kr/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-indigo-100 rounded-xl shadow-sm text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition"
        >
            <ExternalLink size={16} />
            {t("linkBtn")}
        </a>

        {/* Search & List */}
        <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar size={16} />
                {t("listTitle")} 
                <span className="text-xs font-normal text-gray-400">({filteredCourses.length})</span>
            </h3>
            
            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("searchPh")}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transotion bg-white"
                />
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredCourses.map((course, idx) => {
                  let statusColor = "bg-gray-100 text-gray-500";
                  if (course.status === "신청가능") statusColor = "bg-green-100 text-green-700 ring-1 ring-green-200";
                  if (course.status === "대기가능") statusColor = "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
                  if (course.status === "신청시작전") statusColor = "bg-blue-50 text-blue-600 ring-1 ring-blue-100";
                  
                  return (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:border-indigo-300 transition">
                        {/* Header: Region & Status */}
                        <div className="flex justify-between items-center px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                           <div className="flex items-center gap-2">
                             <span className="text-xl font-black text-gray-800 tracking-tight">{course.region}</span>
                             <span className="text-[10px] text-gray-400 font-medium px-1.5 py-0.5 rounded-md bg-white border border-gray-200">{course.level}</span>
                           </div>
                           <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${statusColor}`}>
                                {course.status}
                           </span>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 text-base mb-1 leading-snug group-hover:text-indigo-700 transition">
                            {course.agency}
                          </h4>
                          <div className="text-xs text-gray-500 mb-3 font-medium bg-slate-50 inline-block px-2 py-1 rounded">
                             {course.class}
                          </div>

                          <div className="space-y-2">
                             {/* Capacity & Dates */}
                             <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                                   <Users size={14} className="text-indigo-400" />
                                   <span>정원: {course.capacity}</span>
                                </div>
                                 <div className="flex items-center gap-1.5 text-gray-500">
                                   <Clock size={14} className="text-gray-400" />
                                   <span>신청: {course.reqPeriod}</span>
                                </div>
                             </div>
                             
                             {/* Address (Small) */}
                             <div className="flex items-start gap-1.5 text-[11px] text-gray-400 pt-2 border-t border-gray-50">
                                <MapPin size={12} className="shrink-0 mt-0.5" />
                                <span className="truncate">{course.address}</span>
                            </div>
                          </div>
                        </div>
                    </div>
                  );
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
