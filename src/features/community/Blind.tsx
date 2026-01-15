import { useState, useRef, useMemo } from "react";
import {
  Search,
  PenLine,
  ChevronLeft,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Eye,
  Send,
  MessageCircle,
  Camera,
} from "lucide-react";

// =========================================================
// [Translation] 5개국어 UI 사전
// =========================================================
const UI_DICT: any = {
  kr: {
    appTitle: "블라인드",
    write: "글쓰기",
    best: "토픽 베스트",
    all: "전체글",
    placeholder: "토픽을 검색해 보세요",
    likes: "추천",
    comments: "댓글",
    views: "조회",
    inputComment: "댓글을 남겨주세요.",
    postPlaceholder: "회사 생활에 대해 자유롭게 이야기 해보세요.",
    postTitle: "제목을 입력하세요.",
    register: "등록",
    company: "회사",
    visa: "비자",
  },
  vn: {
    appTitle: "Cộng đồng",
    write: "Viết bài",
    best: "Chủ đề HOT",
    all: "Tất cả",
    placeholder: "Tìm kiếm chủ đề",
    likes: "Thích",
    comments: "Bình luận",
    views: "Xem",
    inputComment: "Viết bình luận...",
    postPlaceholder: "Hãy chia sẻ câu chuyện công việc của bạn.",
    postTitle: "Nhập tiêu đề",
    register: "Đăng",
    company: "Cty",
    visa: "Visa",
  },
  kh: {
    appTitle: "សហគមន៍",
    write: "សរសេរ",
    best: "ពេញនិយម",
    all: "ទាំងអស់",
    placeholder: "ស្វែងរកប្រធានបទ",
    likes: "ចូលចិត្ត",
    comments: "មតិ",
    views: "មើល",
    inputComment: "សរសេរមតិ...",
    postPlaceholder: "ចែករំលែករឿងរ៉ាវការងាររបស់អ្នក។",
    postTitle: "បញ្ចូលចំណងជើង",
    register: "បង្ហោះ",
    company: "ក្រុមហ៊ុន",
    visa: "ទិដ្ឋាការ",
  },
  mm: {
    appTitle: "ကွန်မြူနတီ",
    write: "စာရေးမည်",
    best: "လူကြိုက်များ",
    all: "အားလုံး",
    placeholder: "ခေါင်းစဉ်ရှာရန်",
    likes: "ကြိုက်",
    comments: "မှတ်ချက်",
    views: "ကြည့်ရှု",
    inputComment: "မှတ်ချက်ရေးပါ...",
    postPlaceholder: "လုပ်ငန်းခွင်အကြောင်း ပြောပြပါ။",
    postTitle: "ခေါင်းစဉ်ထည့်ပါ",
    register: "တင်မည်",
    company: "ကုမ္ပဏီ",
    visa: "ဗီဇာ",
  },
  uz: {
    appTitle: "Hamjamiyat",
    write: "Yozish",
    best: "Eng zo'r",
    all: "Barchasi",
    placeholder: "Mavzuni qidirish",
    likes: "Tavsiya",
    comments: "Izohlar",
    views: "Ko'rish",
    inputComment: "Izoh qoldiring...",
    postPlaceholder: "Ishxonadagi gaplardan yozing.",
    postTitle: "Sarlavha kiriting",
    register: "Chop etish",
    company: "Kompaniya",
    visa: "Viza",
  },
};

// =========================================================
// [Data Generator] 5개국어 게시글 & 댓글 데이터
// =========================================================
const getMockPosts = (lang: string) => {
  const l = (obj: any) => obj[lang] || obj["kr"];

  const RAW_DATA = [
    {
      id: 1,
      topic: {
        kr: "비자/법률",
        vn: "Visa/Luật",
        kh: "ទិដ្ឋាការ/ច្បាប់",
        mm: "ဗီဇာ/ဥပဒေ",
        uz: "Viza/Qonun",
      },
      title: {
        kr: "E-7-4 점수 계산 좀 도와주세요 (급함)",
        vn: "Giúp mình tính điểm E-7-4 với (Gấp)",
        kh: "ជួយគណនាពិន្ទុ E-7-4 ផង (បន្ទាន់)",
        mm: "E-7-4 အမှတ်တွက်ပေးပါ (အရေးကြီး)",
        uz: "E-7-4 ballni hisoblashda yordam bering (Shoshilinch)",
      },
      content: {
        kr: "한국어 3급 땄고, 연봉 3200 정도입니다. 나이는 29살인데 점수가 될까요? 작년에 신청했다가 떨어져서 너무 불안하네요.",
        vn: "Mình có TOPIK 3, lương khoảng 32 triệu won. 29 tuổi thì có đủ điểm không? Năm ngoái trượt rồi nên lo quá.",
        kh: "ខ្ញុំមាន TOPIK 3 និងប្រាក់ខែប្រហែល 32 លានវ៉ុន។ អាយុ 29 ឆ្នាំ តើពិន្ទុគ្រប់គ្រាន់ទេ? ឆ្នាំមុនធ្លាក់ ភ័យណាស់។",
        mm: "TOPIK 3 ရပြီး လစာ သိန်း ၃၂၀ လောက်ရှိတယ်။ အသက် ၂၉ နှစ်ဆို အမှတ်မှီလား။ မနှစ်က ကျထားလို့ စိုးရိမ်နေတယ်။",
        uz: "TOPIK 3 oldim, yillik maoshim 32 mln von. Yoshim 29 da, ball yetadimi? O'tgan yili o'tolmagandim.",
      },
      author: "코리안드림",
      company: "Samsung Heavy",
      visa: "E-9",
      likes: 45,
      comments: 3,
      views: 1205,
      time: "10m",
      commentList: [
        {
          id: 101,
          author: "비자마스터",
          company: "Hyundai Motor",
          visa: "F-2-7",
          likes: 12,
          time: "5m",
          content: {
            kr: "뿌리산업 경력 있으면 무조건 됩니다.",
            vn: "Nếu làm ngành công nghiệp gốc thì chắc chắn được.",
            kh: "បើមានបទពិសោធន៍ឧស្សាហកម្មឫសគល់ គឺបានហើយ។",
            mm: "Root industry မှာ အတွေ့အကြုံရှိရင် သေချာပေါက်ရတယ်။",
            uz: "Agar asosiy sanoatda tajribangiz bo'lsa, aniq bo'ladi.",
          },
        },
        {
          id: 102,
          author: "지나가던사람",
          company: "LG Chem",
          visa: "E-7-4",
          likes: 5,
          time: "2m",
          content: {
            kr: "소득 점수가 조금 아슬아슬하네요.",
            vn: "Điểm thu nhập hơi thấp chút.",
            kh: "ពិន្ទុប្រាក់ចំណូលរាងខ្វះបន្តិច។",
            mm: "ဝင်ငွေအမှတ် နည်းနည်းလိုနေတယ်။",
            uz: "Daromad balli ozgina yetmayapti.",
          },
        },
        {
          id: 103,
          author: "화이팅",
          company: "Daewoo E&C",
          visa: "E-9",
          likes: 2,
          time: "1m",
          content: {
            kr: "저도 준비 중인데 같이 힘내요!",
            vn: "Mình cũng đang chuẩn bị, cố lên!",
            kh: "ខ្ញុំក៏កំពុងរៀបចំដែរ ស៊ូៗ!",
            mm: "ငါလည်း ပြင်ဆင်နေတယ်၊ အတူတူကြိုးစားကြမယ်!",
            uz: "Men ham tayyorlanyapman, omad!",
          },
        },
      ],
    },
    {
      id: 2,
      topic: {
        kr: "회사생활",
        vn: "Công việc",
        kh: "ការងារ",
        mm: "လုပ်ငန်းခွင်",
        uz: "Ish",
      },
      title: {
        kr: "우리 사장님 오늘 기분 안 좋음.. 조심해",
        vn: "Giám đốc nay khó ở.. Cẩn thận nha",
        kh: "ថៅកែថ្ងៃនេះមិនសូវស្រួលចិត្តទេ.. ប្រយ័ត្ន",
        mm: "သူဌေး ဒီနေ့ စိတ်မကြည်ဘူး.. သတိထား",
        uz: "Boshliq bugun kayfiyati yo'q.. Ehtiyot bo'ling",
      },
      content: {
        kr: "아침부터 소리지르고 난리 났다. 불량 났다고 엄청 화내심. 오늘 회식하자고 할까봐 겁난다.",
        vn: "Sáng ra đã quát tháo ầm ĩ vì hàng lỗi. Sợ ổng rủ đi nhậu quá.",
        kh: "ព្រឹកឡើងស្រែកឡូឡាព្រោះទំនិញខូច។ ខ្លាចគាត់ហៅទៅផឹកស៊ីថ្ងៃនេះណាស់។",
        mm: "မနက်ကတည်းက ပစ္စည်းမကောင်းလို့ အော်ဟစ်နေတယ်။ ဒီနေ့ည စားပွဲဝိုင်းခေါ်မှာ ကြောက်တယ်။",
        uz: "Ertalabdan brak chiqqani uchun baqir-chaqir qilyapti. Bugun o'tirishga chaqirsa kerak deb qo'rqyapman.",
      },
      author: "눈치백단",
      company: "Small Factory",
      visa: "H-2",
      likes: 88,
      comments: 2,
      views: 540,
      time: "1h",
      commentList: [
        {
          id: 201,
          author: "프로야근러",
          company: "Metal Tech",
          visa: "E-9",
          likes: 20,
          time: "30m",
          content: {
            kr: "ㅋㅋㅋ 우리 사장님도 그래요.",
            vn: "Kkk giám đốc bên này cũng thế.",
            kh: "ហាហា ថៅកែខ្ញុំក៏ចឹងដែរ។",
            mm: "ဟားဟား ငါတို့သူဌေးလည်း အတူတူပဲ။",
            uz: "Xaxaxa bizni boshliq ham shunaqa.",
          },
        },
        {
          id: 202,
          author: "집가고싶다",
          company: "Food Co.",
          visa: "F-4",
          likes: 8,
          time: "10m",
          content: {
            kr: "눈치껏 빨리 퇴근하는게 답입니다.",
            vn: "Tốt nhất là liệu đường mà về sớm.",
            kh: "ល្អបំផុតគឺរកលេសចេញទៅផ្ទះឲ្យលឿន។",
            mm: "အကောင်းဆုံးက စောစောပြန်တာပဲ။",
            uz: "Eng yaxshisi vaqtida uyga qochish.",
          },
        },
      ],
    },
    {
      id: 3,
      topic: {
        kr: "급여/송금",
        vn: "Lương/Tiền",
        kh: "ប្រាក់ខែ/ផ្ញើប្រាក់",
        mm: "လစာ/ငွေလွှဲ",
        uz: "Maosh/Yuborish",
      },
      title: {
        kr: "지금 환율 실화냐? 돈 언제 보내?",
        vn: "Tỷ giá kiểu gì vậy? Bao giờ mới gửi tiền được?",
        kh: "អត្រាប្តូរប្រាក់ម៉េចចឹង? ពេលណាទើបផ្ញើលុយបាន?",
        mm: "ငွေလဲနှုန်းက ဘယ်လိုဖြစ်နေတာလဲ? ဘယ်တော့ ပိုက်ဆံလွှဲရမလဲ?",
        uz: "Kurs nima bo'lyapti? Pulni qachon yuborgan ma'qul?",
      },
      content: {
        kr: "달러가 너무 올라서 고향 돈으로 바꾸면 남는게 없어.. 다들 기다리고 있어 아니면 그냥 보내?",
        vn: "Đô lên cao quá, đổi sang tiền Việt chẳng còn bao nhiêu.. Mọi người đang đợi hay cứ gửi đại?",
        kh: "ដុល្លារឡើងថ្លៃពេក ប្តូរទៅលុយខ្មែរអស់ហើយ.. តើអ្នកទាំងអស់គ្នារង់ចាំ ឬផ្ញើតែម្តង?",
        mm: "ဒေါ်လာဈေးတက်လို့ မြန်မာငွေလဲရင် ဘာမှမကျန်ဘူး.. စောင့်နေကြလား ဒါမှမဟုတ် ဒီတိုင်းလွှဲလိုက်မလား?",
        uz: "Dollar oshib ketdi, so'mga almashtirsa hech narsa qolmayapti.. Kutayapsizlarmi yoki yuboryapsizmi?",
      },
      author: "환율지킴이",
      company: "SK Partner",
      visa: "E-9",
      likes: 156,
      comments: 3,
      views: 3200,
      time: "2h",
      commentList: [
        {
          id: 301,
          author: "존버",
          company: "Farm",
          visa: "E-9",
          likes: 50,
          time: "1h",
          content: {
            kr: "무조건 존버. 지금 보내면 손해임.",
            vn: "Chờ đi. Gửi giờ là lỗ nặng.",
            kh: "រង់ចាំសិន។ ផ្ញើឥឡូវខាត។",
            mm: "စောင့်လိုက်။ အခုလွှဲရင် ရှုံးမယ်။",
            uz: "Kuting. Hozir yuborsangiz yutqazasiz.",
          },
        },
        {
          id: 302,
          author: "효자",
          company: "Logistics",
          visa: "H-2",
          likes: 12,
          time: "40m",
          content: {
            kr: "부모님이 편찮으셔서 어쩔 수 없이 보냄 ㅠㅠ",
            vn: "Bố mẹ ốm nên bắt buộc phải gửi huhu",
            kh: "ឪពុកម្តាយឈឺ ត្រូវតែផ្ញើទាំងបង្ខំ",
            mm: "မိဘနေမကောင်းလို့ မလွှဲမဖြစ်လွှဲလိုက်ရတယ်",
            uz: "Ota-onam kasal, majbur yubordim",
          },
        },
        {
          id: 303,
          author: "경제왕",
          company: "Samsung Elec",
          visa: "E-7",
          likes: 5,
          time: "10m",
          content: {
            kr: "다음달에 조금 떨어질 것 같아요.",
            vn: "Chắc tháng sau giảm chút đó.",
            kh: "ខែក្រោយប្រហែលចុះបន្តិច។",
            mm: "နောက်လကျရင် နည်းနည်းကျမယ်ထင်တယ်။",
            uz: "Keyingi oy ozgina tushsa kerak.",
          },
        },
      ],
    },
    {
      id: 4,
      topic: {
        kr: "썸·연애",
        vn: "Tình yêu",
        kh: "ស្នេហា",
        mm: "အချစ်ရေး",
        uz: "Sevgi",
      },
      title: {
        kr: "한국인 여자친구 사귀고 싶어요",
        vn: "Muốn có bạn gái Hàn Quốc",
        kh: "ចង់មានសង្សារកូរ៉េ",
        mm: "ကိုရီးယား ချစ်သူ လိုချင်တယ်",
        uz: "Koreys qiz bilan tanishmoqchiman",
      },
      content: {
        kr: "한국말 열심히 배우고 있는데 만날 기회가 없네요. 동호회나 모임 추천해주세요. 외로워요.",
        vn: "Đang chăm chỉ học tiếng Hàn mà không có cơ hội gặp gỡ. Ai biết CLB nào giới thiệu với. Cô đơn quá.",
        kh: "ខំរៀនកូរ៉េណាស់ តែគ្មានឱកាសជួបគេ។ ជួយណែនាំក្លឹប ឬកន្លែងជួបជុំផង។ ឯកាណាស់។",
        mm: "ကိုရီးယားစကား ကြိုးစားသင်နေပေမယ့် တွေ့ခွင့်မရှိဘူး။ အသင်းအဖွဲ့လေးတွေ ညွှန်းပေးပါဦး။ အထီးကျန်တယ်။",
        uz: "Koreys tilini o'rganayapman, lekin tanishishga imkon yo'q. Birorta to'garak tavsiya qiling. Zerikdim.",
      },
      author: "솔로탈출",
      company: "Cosmetic Co.",
      visa: "D-2",
      likes: 12,
      comments: 2,
      views: 890,
      time: "3h",
      commentList: [
        {
          id: 401,
          author: "현실적",
          company: "IT Service",
          visa: "F-5",
          likes: 30,
          time: "2h",
          content: {
            kr: "언어교환 모임 나가보세요.",
            vn: "Đi tham gia trao đổi ngôn ngữ đi.",
            kh: "ទៅចូលរួមកម្មវិធីផ្លាស់ប្តូរភាសាទៅ។",
            mm: "Language exchange ပွဲတွေ သွားကြည့်။",
            uz: "Til almashish klublariga boring.",
          },
        },
        {
          id: 402,
          author: "사랑꾼",
          company: "Factory",
          visa: "E-9",
          likes: 5,
          time: "1h",
          content: {
            kr: "일단 공장 밖으로 나가야 합니다 형님.",
            vn: "Trước tiên là phải ra khỏi nhà máy đã ông anh.",
            kh: "ជំហានដំបូងត្រូវចេញពីរោងចក្រសិនបងប្រុស។",
            mm: "အရင်ဆုံး စက်ရုံပြင်ထွက်ရမယ် အစ်ကိုရေ။",
            uz: "Avval zavoddan tashqariga chiqish kerak, aka.",
          },
        },
      ],
    },
    {
      id: 5,
      topic: {
        kr: "기숙사/생활",
        vn: "Ký túc xá",
        kh: "អន្តេវាសិកដ្ឋាន",
        mm: "အဆောင်",
        uz: "Yotoqxona",
      },
      title: {
        kr: "기숙사 보일러 고장남.. 얼어 죽겠어",
        vn: "Lò sưởi KTX hỏng rồi.. Lạnh chết mất",
        kh: "ម៉ាស៊ីនកំដៅខូច.. រងាជិតស្លាប់ហើយ",
        mm: "အဆောင် အပူပေးစက် ပျက်နေတယ်.. အေးလွန်းလို့ သေတော့မယ်",
        uz: "Yotoqxona isitgichi buzildi.. Muzlab qolyapman",
      },
      content: {
        kr: "3일째 안 고쳐줌. 전기장판으로 버티고 있는데 코가 시려워. 신고 가능?",
        vn: "3 ngày rồi chưa sửa. Đang đắp chăn điện mà mũi vẫn lạnh cóng. Báo cáo được không?",
        kh: "៣ ថ្ងៃហើយមិនទាន់ជួសជុល។ ប្រើភួយអគ្គិសនីតែនៅតែត្រជាក់។ ប្តឹងបានទេ?",
        mm: "၃ ရက်ရှိပြီ မပြင်ပေးဘူး။ လျှပ်စစ်စောင်နဲ့ နေနေရတယ် နှာခေါင်းတွေအေးခဲနေပြီ။ တိုင်လို့ရလား?",
        uz: "3 kun bo'ldi tuzatmayapti. Elektr ko'rpa bilan yotibman. Shikoyat qilsam bo'ladimi?",
      },
      author: "아이스맨",
      company: "Farm Village",
      visa: "E-9",
      likes: 60,
      comments: 2,
      views: 1100,
      time: "5h",
      commentList: [
        {
          id: 501,
          author: "법잘알",
          company: "Law Firm",
          visa: "F-2",
          likes: 40,
          time: "4h",
          content: {
            kr: "주거 시설 기준 위반으로 사업장 변경 사유 됩니다.",
            vn: "Vi phạm tiêu chuẩn nhà ở là lý do để chuyển xưởng đấy.",
            kh: "ល្មើសស្តង់ដារកន្លែងស្នាក់នៅ អាចប្តូរកន្លែងធ្វើការបាន។",
            mm: "နေထိုင်မှုစံနှုန်း မညီလို့ အလုပ်ပြောင်းခွင့်ရနိုင်တယ်။",
            uz: "Yashash sharoiti talabga javob bermasligi ish joyini o'zgartirishga asos bo'ladi.",
          },
        },
        {
          id: 503,
          author: "걱정",
          company: "Textile",
          visa: "H-2",
          likes: 2,
          time: "1h",
          content: {
            kr: "감기 조심하세요 따뜻한 물 드시고..",
            vn: "Cẩn thận cảm lạnh, uống nước ấm đi..",
            kh: "ប្រយ័ត្នផ្តាសាយ ញ៉ាំទឹកក្តៅ..",
            mm: "အအေးမိမယ် သတိထား၊ ရေနွေးသောက်..",
            uz: "Shamollab qolmang, issiq suv iching..",
          },
        },
      ],
    },
    {
      id: 6,
      topic: {
        kr: "맛집/푸드",
        vn: "Ẩm thực",
        kh: "អាហារ",
        mm: "အစားအသောက်",
        uz: "Ovqat",
      },
      title: {
        kr: "오늘 점심 메뉴 추천 좀 (회사밥 맛없어)",
        vn: "Gợi ý bữa trưa nay đi (Cơm công ty chán quá)",
        kh: "ជួយណែនាំម្ហូបថ្ងៃត្រង់ផង (បាយក្រុមហ៊ុនមិនឆ្ងាញ់)",
        mm: "ဒီနေ့ နေ့လည်စာ ဘာစားရမလဲ (ကုမ္ပဏီထမင်း မကောင်းဘူး)",
        uz: "Bugun tushlikka nima yeymiz (Oshxona ovqati bemazza)",
      },
      content: {
        kr: "공장 근처에 편의점밖에 없는데 컵라면 질렸어. 배달 시킬까 하는데 뭐 먹지? 매운거 땡겨.",
        vn: "Gần xưởng toàn cửa hàng tiện lợi, ngán mì ly rồi. Đặt đồ ăn thì ăn gì nhỉ? Thèm đồ cay.",
        kh: "ជិតរោងចក្រមានតែម៉ាត ធុញមីកំប៉ុងណាស់។ ចង់កម្មង់អីញ៉ាំ តើញ៉ាំអី? ចង់ញ៉ាំហិរ។",
        mm: "စက်ရုံနားမှာ စတိုးဆိုင်ပဲရှိတယ် ခေါက်ဆွဲပြုတ် ရိုးနေပြီ။ မှာစားမလားလို့ ဘာစားရင်ကောင်းမလဲ? စပ်တာ စားချင်တယ်။",
        uz: "Zavod yonida faqat magazin bor, ramen jonga tegdi. Dostavka qildirmoqchiman, nima yey? Achchiq narsa yegim kelyapti.",
      },
      author: "먹방요정",
      company: "Electronics",
      visa: "F-6",
      likes: 15,
      comments: 2,
      views: 300,
      time: "6h",
      commentList: [
        {
          id: 601,
          author: "마라탕",
          company: "Service",
          visa: "H-2",
          likes: 25,
          time: "5h",
          content: {
            kr: "스트레스 받을 땐 마라탕이 최고죠.",
            vn: "Stress thì Malatang là nhất.",
            kh: "ពេលស្ត្រេស ស៊ុបម៉ាឡាគឺល្អបំផុត។",
            mm: "စိတ်ဖိစီးရင် မာလာရှမ်းကော အကောင်းဆုံးပဲ။",
            uz: "Stress bo'lganda Malatang eng zo'ri.",
          },
        },
        {
          id: 602,
          author: "치킨",
          company: "Construction",
          visa: "E-9",
          likes: 18,
          time: "4h",
          content: {
            kr: "불닭볶음면 + 삼각김밥 조합 고고",
            vn: "Mì gà cay + Cơm nắm tam giác, triển thôi.",
            kh: "មីហិរ + បាយត្រីកោណ តោះ។",
            mm: "အစပ်ခေါက်ဆွဲ နဲ့ ထမင်းတြိဂံ တွဲစား။",
            uz: "Buldak ramen + kimbap yeb ko'ring.",
          },
        },
      ],
    },
    {
      id: 7,
      topic: {
        kr: "귀국/미래",
        vn: "Tương lai",
        kh: "អនាគត",
        mm: "အနာဂတ်",
        uz: "Kelajak",
      },
      title: {
        kr: "한국에서 번 돈으로 고향가서 뭐 할거야?",
        vn: "Về nước định làm gì với tiền kiếm được ở Hàn?",
        kh: "តើអ្នកនឹងធ្វើអ្វីនៅស្រុកកំណើតជាមួយលុយដែលរកបាននៅកូរ៉េ?",
        mm: "ကိုရီးယားမှာရှာထားတဲ့ ပိုက်ဆံနဲ့ ရွာပြန်ရင် ဘာလုပ်မှာလဲ?",
        uz: "Koreyada ishlagan pulingizga uyingizga borib nima qilasiz?",
      },
      content: {
        kr: "나는 땅 사서 집 짓고 작은 가게 하나 하고 싶어. 너네 계획은 어때? 5년 일하면 얼마나 모으려나.",
        vn: "Tôi định mua đất xây nhà rồi mở tiệm nhỏ. Kế hoạch của mọi người sao? Làm 5 năm thì để được bao nhiêu nhỉ.",
        kh: "ខ្ញុំចង់ទិញដីសង់ផ្ទះ និងបើកហាងតូចមួយ។ ចុះអ្នកទាំងអស់គ្នាវិញ? ធ្វើការ ៥ ឆ្នាំ សន្សំបានប៉ុន្មាន?",
        mm: "ကျွန်တော်က မြေဝယ် အိမ်ဆောက်ပြီး ဆိုင်လေးဖွင့်ချင်တယ်။ မင်းတို့အစီအစဉ်ကရော? ၅ နှစ်လုပ်ရင် ဘယ်လောက်စုမိမလဲ။",
        uz: "Men yer olib uy qurib, kichik do'kon ochmoqchiman. Sizlarning rejangiz qanday? 5 yil ishlasa qancha yig'sa bo'ladi.",
      },
      author: "드림컴트루",
      company: "Construction",
      visa: "E-9",
      likes: 200,
      comments: 3,
      views: 5000,
      time: "1d",
      commentList: [
        {
          id: 701,
          author: "현실주의",
          company: "Shipyard",
          visa: "E-7",
          likes: 80,
          time: "20h",
          content: {
            kr: "결혼 자금으로 다 나갈 듯..",
            vn: "Chắc đi tong vào tiền cưới xin hết..",
            kh: "ប្រហែលជាអស់ទៅលើការរៀបការ..",
            mm: "မင်္ဂလာဆောင်စရိတ်နဲ့တင် ကုန်မယ်ထင်တယ်..",
            uz: "Hammasi to'yga ketadi shekilli..",
          },
        },
        {
          id: 702,
          author: "사업가",
          company: "Trade",
          visa: "D-8",
          likes: 45,
          time: "15h",
          content: {
            kr: "한국 화장품 수입해서 팔 생각입니다.",
            vn: "Định nhập mỹ phẩm Hàn về bán.",
            kh: "គិតថានាំចូលគ្រឿងសម្អាងកូរ៉េទៅលក់។",
            mm: "ကိုရီးယား အလှကုန် တင်သွင်းပြီး ရောင်းမယ် စိတ်ကူးရှိတယ်။",
            uz: "Koreya kosmetikasini olib borib sotmoqchiman.",
          },
        },
        {
          id: 703,
          author: "농부",
          company: "Farm",
          visa: "E-9",
          likes: 30,
          time: "10h",
          content: {
            kr: "농기계 사서 크게 농사 지으려고요.",
            vn: "Mua máy nông nghiệp làm trang trại lớn.",
            kh: "ទិញគ្រឿងចក្រកសិកម្ម ធ្វើស្រែចម្ការធំ។",
            mm: "လယ်ယာသုံးစက်တွေဝယ်ပြီး စိုက်ပျိုးရေး အကြီးအကျယ်လုပ်မယ်။",
            uz: "Qishloq xo'jaligi texnikasi olib, katta dehqonchilik qilmoqchiman.",
          },
        },
      ],
    },
    {
      id: 8,
      topic: {
        kr: "쇼핑/중고",
        vn: "Mua sắm",
        kh: "ទិញទំនិញ",
        mm: "ဈေးဝယ်",
        uz: "Savdo",
      },
      title: {
        kr: "아이폰 16 프로 샀다! (자랑)",
        vn: "Mới mua iPhone 16 Pro! (Khoe tí)",
        kh: "ទិញ iPhone 16 Pro ហើយ! (បង្អួត)",
        mm: "iPhone 16 Pro ဝယ်လိုက်ပြီ! (ကြွားတာ)",
        uz: "iPhone 16 Pro sotib oldim! (Maqtanyapman)",
      },
      content: {
        kr: "3달치 월급 모아서 샀어. 카메라 진짜 좋네. 고향에 있는 여친이랑 영상통화 할 때 화질 대박이야.",
        vn: "Gom lương 3 tháng mới mua được. Camera đỉnh thật. Video call với bạn gái ở quê nét căng.",
        kh: "សន្សំប្រាក់ខែ ៣ ខែទើបទិញបាន។ កាមេរ៉ាល្អណាស់។ វីដេអូខលជាមួយសង្សារនៅស្រុកច្បាស់ល្អណាស់។",
        mm: "လစာ ၃ လစာစုပြီး ဝယ်လိုက်တယ်။ ကင်မရာ တကယ်ကောင်းတယ်။ ရွာက ကောင်မလေးနဲ့ ဗီဒီယိုပြောရင် ရုပ်ထွက်ရှယ်ပဲ။",
        uz: "3 oylik maoshimni yig'ib oldim. Kamerasi haqiqatdan zo'r. Uyda qolgan qiz o'rtog'im bilan gaplashganda tiniq ko'rsatyapti.",
      },
      author: "앱등이",
      company: "Car Parts",
      visa: "E-9",
      likes: 95,
      comments: 2,
      views: 2100,
      time: "2d",
      commentList: [
        {
          id: 801,
          author: "갤럭시파",
          company: "Samsung Display",
          visa: "E-7",
          likes: 10,
          time: "1d",
          content: {
            kr: "삼성 다니면서 아이폰 쓰다니.. 배신자 ㅋㅋ",
            vn: "Làm Samsung mà dùng iPhone.. Phản bội kk",
            kh: "ធ្វើការ Samsung ប្រើ iPhone.. ក្បត់ហើយ ហាហា",
            mm: "Samsung မှာလုပ်ပြီး iPhone သုံးတယ်.. သစ္စာဖောက် haha",
            uz: "Samsungda ishlab iPhone ishlatyapsizmi.. Sotqin xaxa",
          },
        },
        {
          id: 802,
          author: "부럽",
          company: "Textile",
          visa: "E-9",
          likes: 55,
          time: "1d",
          content: {
            kr: "부럽다.. 난 돈 아까워서 못 사겠던데.",
            vn: "Ghen tị quá.. Mình tiếc tiền không dám mua.",
            kh: "ច្រណែនណាស់.. ខ្ញុំស្តាយលុយមិនហ៊ានទិញទេ។",
            mm: "အားကျလိုက်တာ.. ငါက နှမြောလို့ မဝယ်ရဲဘူး။",
            uz: "Havasim keldi.. Men pulga achinib ololmayman.",
          },
        },
      ],
    },
  ];

  return RAW_DATA.map((item: any) => ({
    ...item,
    topic: l(item.topic),
    title: l(item.title),
    content: l(item.content),
    commentList: item.commentList.map((c: any) => ({
      ...c,
      content: l(c.content),
    })),
  }));
};

// =========================================================
// [Types]
// =========================================================
type ViewState = "list" | "detail" | "write";

interface Comment {
  id: number;
  author: string;
  company: string;
  visa: string;
  content: string;
  time: string;
  likes: number;
}
interface Post {
  id: number;
  topic: string;
  title: string;
  content: string;
  author: string;
  company: string;
  visa: string;
  likes: number;
  comments: number;
  views: number;
  time: string;
  isLike: boolean;
  commentList: Comment[];
}

// =========================================================
// [Component] 비자 뱃지
// =========================================================
const VisaBadge = ({ type }: { type: string }) => {
  let color = "bg-gray-100 text-gray-600";
  if (type.startsWith("E-9")) color = "bg-blue-100 text-blue-700";
  else if (type.startsWith("E-7")) color = "bg-indigo-100 text-indigo-700";
  else if (type.startsWith("F-2")) color = "bg-purple-100 text-purple-700";
  else if (type.startsWith("F-5")) color = "bg-yellow-100 text-yellow-800";
  else if (type.startsWith("F-6")) color = "bg-pink-100 text-pink-700";
  else if (type.startsWith("H-2")) color = "bg-green-100 text-green-700";
  else if (type.startsWith("D-2")) color = "bg-orange-100 text-orange-700";

  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ml-1.5 ${color}`}
    >
      {type}
    </span>
  );
};

// =========================================================
// [Main] Blind App
// =========================================================
export default function Blind({ lang }: { lang: string }) {
  const [view, setView] = useState<ViewState>("list");
  // [중요] 함수 호출하여 현재 언어 데이터 가져오기
  const [posts, setPosts] = useState<Post[]>(getMockPosts(lang));
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const t = UI_DICT[lang] || UI_DICT["kr"];

  // 언어가 바뀌면 게시글 목록도 갱신
  useMemo(() => {
    setPosts(getMockPosts(lang));
  }, [lang]);

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedPostId(null);
  };

  const handleWrite = () => setView("write");

  const handleWriteComplete = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now(),
      topic: "자유",
      title,
      content,
      author: "나그네",
      company: "My Company",
      visa: "E-9",
      likes: 0,
      comments: 0,
      views: 0,
      time: "방금 전",
      isLike: false,
      commentList: [],
    };
    setPosts([newPost, ...posts]);
    setView("list");
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  return (
    <div className="relative w-full h-full overflow-hidden font-sans bg-gray-50">
      {view === "list" && (
        <PostList
          posts={posts}
          onPostClick={handlePostClick}
          onWrite={handleWrite}
          t={t}
        />
      )}
      {view === "detail" && selectedPost && (
        <PostDetail
          post={selectedPost}
          onBack={handleBack}
          onUpdate={updatePost}
          t={t}
        />
      )}
      {view === "write" && (
        <WritePage onBack={handleBack} onComplete={handleWriteComplete} t={t} />
      )}
    </div>
  );
}

// ---------------------------------------------------------
// 1. 게시글 목록 (List)
// ---------------------------------------------------------
function PostList({ posts, onPostClick, onWrite, t }: any) {
  return (
    <div className="flex flex-col w-full h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 bg-white border-b border-gray-200 h-14 shrink-0">
        <h1 className="text-xl italic font-black tracking-tight text-red-600">
          BLIND
        </h1>
        <div className="flex gap-4 text-gray-400">
          <Search size={22} />
        </div>
      </header>

      <div className="flex-1 pb-20 overflow-y-auto">
        <div className="p-4 mb-2 bg-white border-b border-gray-100">
          <div className="mb-1 text-xs font-bold text-red-500">{t.best}</div>
          <h2 className="text-lg font-bold leading-snug text-gray-900">
            2025 E-7-4 비자 변경 점수표 총정리 (저장필수)
          </h2>
        </div>

        <div className="bg-white divide-y divide-gray-100">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              onClick={() => onPostClick(post.id)}
              className="p-4 transition cursor-pointer active:bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                  {post.topic}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-1 line-clamp-1">
                {post.title}
              </h3>
              <p className="h-10 mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-medium truncate max-w-[80px]">
                      {post.company}
                    </span>
                    <span>·</span>
                    <span>{post.author}</span>
                    <VisaBadge type={post.visa} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                  <div className="flex items-center gap-1">
                    <ThumbsUp
                      size={12}
                      className={post.likes > 0 ? "text-red-500" : ""}
                    />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={12} /> {post.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={12} /> {post.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onWrite}
        className="absolute bottom-6 right-5 bg-red-600 hover:bg-red-700 text-white p-3.5 rounded-full shadow-lg transition active:scale-95 flex items-center gap-2 z-20"
      >
        <PenLine size={20} />
        <span className="text-sm font-bold">{t.write}</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------
// 2. 게시글 상세 (Detail)
// ---------------------------------------------------------
function PostDetail({ post, onBack, onUpdate, t }: any) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleLike = () => {
    const newLikeState = !post.isLike;
    onUpdate({
      ...post,
      isLike: newLikeState,
      likes: post.likes + (newLikeState ? 1 : -1),
    });
  };

  const handleComment = () => {
    if (!input.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "나그네",
      company: "My Company",
      visa: "E-9",
      content: input,
      time: "방금 전",
      likes: 0,
    };
    onUpdate({
      ...post,
      comments: post.comments + 1,
      commentList: [...post.commentList, newComment],
    });
    setInput("");
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  return (
    <div className="flex flex-col w-full h-full duration-200 bg-white animate-in slide-in-from-right">
      <header className="sticky top-0 z-20 flex items-center justify-between px-2 bg-white border-b border-gray-100 h-14 shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-gray-800 rounded-full active:bg-gray-100"
        >
          <ChevronLeft size={26} />
        </button>
        <div className="text-sm font-bold text-gray-800">{post.topic}</div>
        <button className="p-2 text-gray-800 rounded-full active:bg-gray-100">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <div className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
        <div className="p-5 border-b border-gray-100">
          <h1 className="mb-4 text-xl font-bold leading-snug text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
              <span className="text-lg">🏢</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                <span>{post.author}</span>
                <VisaBadge type={post.visa} />
              </div>
              <div className="text-xs font-medium text-gray-500">
                {post.company} · {post.time}
              </div>
            </div>
          </div>

          <div className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[100px]">
            {post.content}
          </div>

          <div className="flex items-center gap-4 mt-8 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Eye size={14} /> {post.views}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} /> {post.comments}
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={14} /> {post.likes}
            </div>
          </div>
        </div>

        <div className="flex h-12 border-b border-gray-100">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold ${
              post.isLike ? "text-red-500" : "text-gray-500"
            }`}
          >
            <ThumbsUp size={18} fill={post.isLike ? "currentColor" : "none"} />
            {t.likes} {post.likes}
          </button>
          <div className="w-[1px] bg-gray-100 my-3"></div>
          <button className="flex items-center justify-center flex-1 gap-2 text-sm font-bold text-gray-500">
            <MessageCircle size={18} />
            {t.comments} {post.comments}
          </button>
        </div>

        <div className="bg-gray-50 min-h-[200px] p-4 space-y-4" ref={scrollRef}>
          {post.commentList.length === 0 ? (
            <div className="py-10 text-sm text-center text-gray-400">
              Empty...
            </div>
          ) : (
            post.commentList.map((cmt: Comment) => (
              <div key={cmt.id} className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 mt-1 text-xs bg-white border border-gray-200 rounded-full shrink-0">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-xs font-bold text-gray-900">
                      {cmt.author}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                      {cmt.company}
                    </span>
                    <VisaBadge type={cmt.visa} />
                  </div>
                  <div className="p-3 text-sm text-gray-800 bg-white border border-gray-200 shadow-sm rounded-r-xl rounded-bl-xl">
                    {cmt.content}
                  </div>
                  <div className="flex items-center gap-3 mt-1 ml-1">
                    <span className="text-[10px] text-gray-400">
                      {cmt.time}
                    </span>
                    <button className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5">
                      <ThumbsUp size={10} /> {cmt.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="absolute bottom-0 z-30 flex items-center w-full gap-2 p-3 bg-white border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputComment}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-red-200 transition"
        />
        <button
          onClick={handleComment}
          disabled={!input.trim()}
          className={`p-2.5 rounded-full transition ${
            input.trim()
              ? "bg-red-500 text-white shadow-md"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3. 글쓰기 화면 (Write)
// ---------------------------------------------------------
function WritePage({ onBack, onComplete, t }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col w-full h-full duration-300 bg-white animate-in slide-in-from-bottom">
      <header className="flex items-center justify-between px-4 border-b border-gray-100 h-14 shrink-0">
        <button onClick={onBack} className="text-sm text-gray-600">
          취소
        </button>
        <span className="font-bold text-gray-900">{t.write}</span>
        <button
          onClick={() => onComplete(title, content)}
          disabled={!title || !content}
          className={`text-sm font-bold ${
            title && content ? "text-red-500" : "text-gray-300"
          }`}
        >
          {t.register}
        </button>
      </header>
      <div className="flex flex-col h-full p-5 overflow-y-auto">
        <input
          type="text"
          placeholder={t.postTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-3 mb-4 text-lg font-bold placeholder-gray-300 border-b border-gray-100 outline-none shrink-0"
        />
        <textarea
          placeholder={t.postPlaceholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 resize-none outline-none text-base leading-relaxed placeholder-gray-300 min-h-[300px]"
        ></textarea>
      </div>
      <div className="flex gap-4 p-3 text-gray-400 border-t border-gray-100 shrink-0 safe-area-bottom">
        <Camera size={20} />
        <div className="w-[1px] h-5 bg-gray-200"></div>
        <span className="flex items-center text-xs"># Topic</span>
      </div>
    </div>
  );
}
