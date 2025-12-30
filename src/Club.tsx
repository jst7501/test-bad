import { useState, useMemo } from "react";
import {
  Users,
  MapPin,
  Calendar,
  Plus,
  Search,
  ChevronLeft,
  Heart,
  Share2,
} from "lucide-react";

// =========================================================
// [Translation] UI 번역 데이터
// =========================================================
const UI_DICT: any = {
  kr: {
    title: "소모임",
    placeholder: "관심사나 동네를 검색해보세요",
    all: "전체",
    sports: "운동/스포츠",
    study: "공부/언어",
    food: "맛집/카페",
    travel: "여행/나들이",
    hobby: "취미/게임",
    members: "명 참여중",
    location: "활동 지역",
    schedule: "정기 모임",
    join: "가입하기",
    joined: "가입완료",
    create: "모임 개설",
    leader: "모임장",
    descTitle: "모임 소개",
    upcoming: "다가오는 일정",
  },
  vn: {
    title: "Câu lạc bộ",
    placeholder: "Tìm kiếm sở thích hoặc khu vực",
    all: "Tất cả",
    sports: "Thể thao",
    study: "Học tập",
    food: "Ẩm thực",
    travel: "Du lịch",
    hobby: "Sở thích",
    members: "thành viên",
    location: "Khu vực",
    schedule: "Lịch họp",
    join: "Tham gia",
    joined: "Đã tham gia",
    create: "Tạo nhóm",
    leader: "Trưởng nhóm",
    descTitle: "Giới thiệu",
    upcoming: "Lịch sắp tới",
  },
  kh: {
    title: "ក្លឹប",
    placeholder: "ស្វែងរកចំណង់ចំណូលចិត្ត",
    all: "ទាំងអស់",
    sports: "កីឡា",
    study: "ការសិក្សា",
    food: "អាហារ",
    travel: "ការធ្វើដំណើរ",
    hobby: "ចំណង់ចំណូលចិត្ត",
    members: "សមាជិក",
    location: "ទីតាំង",
    schedule: "កាលវិភាគ",
    join: "ចូលរួម",
    joined: "បានចូលរួម",
    create: "បង្កើត",
    leader: "មេក្រុម",
    descTitle: "ការណែនាំ",
    upcoming: "កាលវិភាគ",
  },
  mm: {
    title: "အသင်းအဖွဲ့",
    placeholder: "ဝါသနာ သို့မဟုတ် ဒေသ ရှာဖွေပါ",
    all: "အားလုံး",
    sports: "အားကစား",
    study: "ပညာရေး",
    food: "အစားအသောက်",
    travel: "ခရီးသွား",
    hobby: "ဝါသနာ",
    members: "ဦး ဝင်ရောက်",
    location: "တည်နေရာ",
    schedule: "အချိန်ဇယား",
    join: "ဝင်မည်",
    joined: "ဝင်ပြီးပြီ",
    create: "အဖွဲ့ဖွဲ့မည်",
    leader: "ခေါင်းဆောင်",
    descTitle: "မိတ်ဆက်",
    upcoming: "လာမည့်အစီအစဉ်",
  },
  uz: {
    title: "Klub",
    placeholder: "Qiziqish yoki hududni qidiring",
    all: "Barchasi",
    sports: "Sport",
    study: "O'qish",
    food: "Ovqat",
    travel: "Sayohat",
    hobby: "Xobbi",
    members: "a'zo",
    location: "Hudud",
    schedule: "Jadval",
    join: "Qo'shilish",
    joined: "A'zo bo'ldi",
    create: "Yaratish",
    leader: "Lider",
    descTitle: "Tavsif",
    upcoming: "Kelgusi rejalar",
  },
};

// =========================================================
// [Data] 소모임 목업 데이터
// =========================================================
const getMockClubs = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];

  return [
    {
      id: 1,
      title: l({
        kr: "FC 글로벌 (주말 축구)",
        vn: "FC Global (Bóng đá)",
        kh: "FC Global (បាល់ទាត់)",
        mm: "FC Global (ဘောလုံး)",
        uz: "FC Global (Futbol)",
      }),
      category: "sports",
      location: l({
        kr: "화성 종합운동장",
        vn: "Sân vận động Hwaseong",
        kh: "Hwaseong Stadium",
        mm: "Hwaseong အားကစားကွင်း",
        uz: "Hwaseong stadioni",
      }),
      members: 42,
      maxMembers: 50,
      image: "bg-blue-600",
      desc: l({
        kr: "매주 일요일 아침 7시에 모여서 축구합니다. 초보자 환영합니다! 끝나고 밥도 같이 먹어요.",
        vn: "Đá bóng vào 7h sáng chủ nhật hàng tuần. Người mới cũng được chào đón!",
        kh: "លេងបាល់ទាត់រៀងរាល់ព្រឹកថ្ងៃអាទិត្យ ម៉ោង ៧។ អ្នកចាប់ផ្តើមថ្មីត្រូវបានស្វាគមន៍!",
        mm: "တနင်္ဂနွေနေ့တိုင်း မနက် ၇ နာရီ ဘောလုံးကန်ပါတယ်။ လူသစ်များ ကြိုဆိုပါတယ်။",
        uz: "Har yakshanba soat 7:00 da futbol o'ynaymiz. Yangilar ham kelishi mumkin!",
      }),
      leader: "Sonny",
      schedule: l({
        kr: "매주 일요일 07:00",
        vn: "Chủ nhật 07:00",
        kh: "អាទិត្យ 07:00",
        mm: "တနင်္ဂနွေ 07:00",
        uz: "Yakshanba 07:00",
      }),
      tags: ["#Football", "#Soccer", "#Friendly"],
    },
    {
      id: 2,
      title: l({
        kr: "토픽(TOPIK) 스터디",
        vn: "Học TOPIK",
        kh: "សិក្សា TOPIK",
        mm: "TOPIK လေ့လာရေး",
        uz: "TOPIK o'rganish",
      }),
      category: "study",
      location: l({
        kr: "동탄 도서관",
        vn: "Thư viện Dongtan",
        kh: "Dongtan Library",
        mm: "Dongtan စာကြည့်တိုက်",
        uz: "Dongtan kutubxonasi",
      }),
      members: 8,
      maxMembers: 10,
      image: "bg-emerald-500",
      desc: l({
        kr: "토픽 3급, 4급 준비하는 모임입니다. 주말에 같이 공부하고 서로 도와줘요.",
        vn: "Nhóm chuẩn bị thi TOPIK 3, 4. Cùng học vào cuối tuần.",
        kh: "ក្រុមត្រៀមប្រឡង TOPIK កម្រិត ៣ និង ៤។ រៀនជាមួយគ្នានៅចុងសប្តាហ៍។",
        mm: "TOPIK level 3, 4 ဖြေမယ့်အဖွဲ့ပါ။ စနေတနင်္ဂနွေ အတူတူစာလုပ်မယ်။",
        uz: "TOPIK 3-4 daraja uchun tayyorlov guruhi. Dam olish kunlari birga o'qiymiz.",
      }),
      leader: "Teacher Kim",
      schedule: l({
        kr: "매주 토요일 14:00",
        vn: "Thứ 7 14:00",
        kh: "សៅរ៍ 14:00",
        mm: "စနေ 14:00",
        uz: "Shanba 14:00",
      }),
      tags: ["#Korean", "#Study", "#Exam"],
    },
    {
      id: 3,
      title: l({
        kr: "맛있는 녀석들 (맛집 탐방)",
        vn: "Hội ăn uống",
        kh: "អ្នកចូលចិត្តញ៉ាំ",
        mm: "အစားအသောက်အဖွဲ့",
        uz: "Mazali taomlar",
      }),
      category: "food",
      location: l({
        kr: "오산역 광장",
        vn: "Ga Osan",
        kh: "Osan Station",
        mm: "Osan ဘူတာ",
        uz: "Osan stansiyasi",
      }),
      members: 15,
      maxMembers: 20,
      image: "bg-orange-400",
      desc: l({
        kr: "한 달에 한 번 한국의 맛집을 찾아 떠납니다. 이번 달은 삼겹살!",
        vn: "Mỗi tháng một lần đi ăn ngon. Tháng này là thịt nướng!",
        kh: "ទៅញ៉ាំអាហារឆ្ងាញ់ៗម្តងក្នុងមួយខែ។ ខែនេះសាច់ជ្រូកអាំង!",
        mm: "တစ်လတစ်ခါ စားကောင်းသောက်ဖွယ် ရှာဖွေထွက်ပါမယ်။ ဒီလ ဝက်သားကင်!",
        uz: "Oyiga bir marta mazali ovqatlar yeymiz. Bu oy Samgyeopsal!",
      }),
      leader: "Foodie",
      schedule: l({
        kr: "월 1회 (협의)",
        vn: "1 lần/tháng",
        kh: "១ ដង/ខែ",
        mm: "တစ်လတစ်ကြိမ်",
        uz: "Oyiga 1 marta",
      }),
      tags: ["#Food", "#Yummy", "#Tour"],
    },
    {
      id: 4,
      title: l({
        kr: "주말 등산 동호회",
        vn: "Leo núi cuối tuần",
        kh: "ឡើងភ្នំចុងសប្តាហ៍",
        mm: "တောင်တက်အသင်း",
        uz: "Tog'ga chiqish",
      }),
      category: "travel",
      location: l({
        kr: "수원 광교산",
        vn: "Núi Gwanggyo",
        kh: "Gwanggyo Mountain",
        mm: "Gwanggyo တောင်",
        uz: "Gwanggyo tog'i",
      }),
      members: 22,
      maxMembers: 100,
      image: "bg-green-600",
      desc: l({
        kr: "건강을 위해 등산해요. 정상에서 먹는 김밥이 최고입니다.",
        vn: "Leo núi vì sức khỏe. Kimbap ăn trên đỉnh núi là tuyệt nhất.",
        kh: "ឡើងភ្នំដើម្បីសុខភាព។ គីមបាប់នៅលើកំពូលភ្នំឆ្ងាញ់បំផុត។",
        mm: "ကျန်းမာရေးအတွက် တောင်တက်မယ်။ တောင်ထိပ်မှာစားတဲ့ ကင်밥က အကောင်းဆုံးပဲ။",
        uz: "Sog'liq uchun tog'ga chiqamiz. Cho'qqida kimbap yeymiz.",
      }),
      leader: "Mountain",
      schedule: l({
        kr: "격주 일요일 09:00",
        vn: "CN cách tuần",
        kh: "អាទិត្យរំលងសប្តាហ៍",
        mm: "တစ်ပတ်ခြား တနင်္ဂနွေ",
        uz: "Ikki haftada 1 yakshanba",
      }),
      tags: ["#Hiking", "#Nature", "#Health"],
    },
    {
      id: 5,
      title: l({
        kr: "기타 배우기 (초보)",
        vn: "Học Guitar",
        kh: "រៀនហ្គីតា",
        mm: "ဂစ်တာသင်တန်း",
        uz: "Gitara o'rganish",
      }),
      category: "hobby",
      location: l({
        kr: "향남 기숙사",
        vn: "KTX Hyangnam",
        kh: "Hyangnam Dorm",
        mm: "Hyangnam အဆောင်",
        uz: "Hyangnam yotoqxona",
      }),
      members: 5,
      maxMembers: 6,
      image: "bg-purple-500",
      desc: l({
        kr: "기타 치고 싶은 사람 모여라! 기타는 각자 가져와야 합니다.",
        vn: "Ai muốn chơi guitar thì bơi vào đây! Tự mang đàn nhé.",
        kh: "អ្នកចង់លេងហ្គីតា មកជុំគ្នា! ត្រូវមានហ្គីតាផ្ទាល់ខ្លួន។",
        mm: "ဂစ်တာတီးချင်သူများ လာကြပါ။ ကိုယ်ပိုင်ဂစ်တာ ယူလာရမည်။",
        uz: "Gitara chalishni xohlovchilar kelsin! Gitara o'zingiz bilan bo'lishi kerak.",
      }),
      leader: "Singer",
      schedule: l({
        kr: "매주 평일 저녁",
        vn: "Tối ngày thường",
        kh: "រៀងរាល់ល្ងាច",
        mm: "ကြားရက် ညတိုင်း",
        uz: "Hafta ichi kechqurun",
      }),
      tags: ["#Music", "#Guitar", "#Band"],
    },
  ];
};

// =========================================================
// [Main Component]
// =========================================================
type ViewState = "list" | "detail" | "create";

export default function Club({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const t = UI_DICT[lang] || UI_DICT["kr"];
  const clubs = useMemo(() => getMockClubs(lang), [lang]);

  const filteredClubs =
    selectedCategory === "all"
      ? clubs
      : clubs.filter((c: any) => c.category === selectedCategory);

  const handleClubClick = (club: any) => {
    setSelectedClub(club);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedClub(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-gray-50">
      {view === "list" && (
        <div className="flex flex-col w-full h-full">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-4 bg-white border-b border-gray-100 h-14 shrink-0">
            <h1 className="flex items-center gap-2 text-xl font-black tracking-tight text-indigo-600">
              <Users size={24} /> {t.title}
            </h1>
            <div className="p-2 text-gray-500 bg-gray-100 rounded-full">
              <Search size={20} />
            </div>
          </header>

          {/* Category Filter */}
          <div className="px-4 py-3 bg-white border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {["all", "sports", "study", "food", "travel", "hobby"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {t[cat]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">
            {filteredClubs.map((club: any) => (
              <div
                key={club.id}
                onClick={() => handleClubClick(club)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition cursor-pointer flex gap-4"
              >
                {/* Image Placeholder */}
                <div
                  className={`w-24 h-24 rounded-xl flex-shrink-0 ${club.image} flex items-center justify-center text-white font-bold text-2xl shadow-inner`}
                >
                  {club.title.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {t[club.category]}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {club.location}
                      </span>
                    </div>
                    <h3 className="mb-1 font-bold leading-tight text-gray-900 line-clamp-2">
                      {club.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Member Avatars (Visual Trick) */}
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[8px] text-gray-500"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-600">
                        +{club.members}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      {club.members}/{club.maxMembers} {t.members}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAB */}
          <button
            onClick={() => setView("create")}
            className="absolute bottom-6 right-5 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 z-20"
          >
            <Plus size={24} />
            <span className="pr-1 text-sm font-bold">{t.create}</span>
          </button>
        </div>
      )}

      {/* Detail View */}
      {view === "detail" && selectedClub && (
        <div className="flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
          <div className="relative h-60 shrink-0">
            <div className={`absolute inset-0 ${selectedClub.image}`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Header Actions */}
            <div className="absolute top-0 z-10 flex items-center justify-between w-full p-4 text-white">
              <button
                onClick={handleBack}
                className="p-2 rounded-full bg-black/20 backdrop-blur"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-3">
                <button className="p-2 rounded-full bg-black/20 backdrop-blur">
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-full bg-black/20 backdrop-blur">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Title Section */}
            <div className="absolute bottom-0 w-full p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-xs font-bold">
                  {t[selectedClub.category]}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium opacity-90">
                  <MapPin size={14} /> {selectedClub.location}
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                {selectedClub.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 pb-24 overflow-y-auto">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                <span className="mb-1 text-xs text-gray-400">{t.schedule}</span>
                <span className="text-sm font-bold text-center text-gray-800">
                  {selectedClub.schedule}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl">
                <span className="mb-1 text-xs text-gray-400">{t.leader}</span>
                <span className="text-sm font-bold text-gray-800">
                  {selectedClub.leader}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {t.descTitle}
              </h3>
              <p className="leading-relaxed text-gray-600 whitespace-pre-wrap">
                {selectedClub.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedClub.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-indigo-500 rounded-md bg-indigo-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Upcoming Event (Mockup) */}
            <div>
              <h3 className="flex items-center gap-2 mb-3 text-lg font-bold text-gray-900">
                <Calendar size={18} /> {t.upcoming}
              </h3>
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="flex flex-col items-center justify-center w-12 h-12 text-indigo-600 bg-indigo-100 rounded-lg shrink-0">
                  <span className="text-[10px] font-bold">SUN</span>
                  <span className="text-lg font-black">12</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">
                    정기 모임 (Regular Meeting)
                  </div>
                  <div className="text-xs text-gray-500">
                    07:00 AM • {selectedClub.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="absolute bottom-0 z-20 w-full p-4 bg-white border-t border-gray-100">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition active:scale-[0.98]">
              {t.join}
            </button>
          </div>
        </div>
      )}

      {/* Create View (Simple Mock) */}
      {view === "create" && (
        <div className="flex flex-col w-full h-full duration-300 bg-white animate-in slide-in-from-bottom">
          <header className="flex items-center justify-between px-4 border-b border-gray-100 h-14 shrink-0">
            <button onClick={handleBack} className="text-sm text-gray-600">
              Cancel
            </button>
            <span className="font-bold text-gray-900">{t.create}</span>
            <button
              onClick={handleBack}
              className="text-sm font-bold text-indigo-600"
            >
              Save
            </button>
          </header>
          <div className="flex flex-col items-center justify-center h-full gap-4 p-5 text-gray-400">
            <div className="flex items-center justify-center w-20 h-20 mb-2 bg-gray-100 rounded-full">
              <Plus size={32} />
            </div>
            <p className="text-sm">모임 개설 기능 준비중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
