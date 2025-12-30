// src/utils/e74Logic.ts

export interface VisaFormData {
    // [1] 기본 요건 및 정보
    birthYear: number;
    entryDate: string;       // 입국일 (4년 체류 확인용)
    income: number;          // 연소득 (만 원)
    koreanScore: number;     // TOPIK/KIIP 등급 (0~6)

    // [2] 가점 항목
    recType: 'none' | 'central' | 'local' | 'company'; // 추천서 (중앙부처/광역/고용기업)
    continuousWork3Yr: boolean; // 현 근무처 3년 이상 근속
    remoteArea3Yr: boolean;     // 인구감소지역/읍면동 3년 이상 근무
    licenseOrDegree: boolean;   // 자격증 또는 국내 학위
    driverLicense: boolean;     // 국내 운전면허증

    // [3] 감점 항목 (위반 횟수 0~3)
    penaltyFineCount: number;        // 벌금 100만원 미만 횟수
    penaltyTaxCount: number;         // 조세 체납 횟수
    penaltyImmigrationCount: number; // 출입국관리법 위반 횟수
}

export interface VisaResult {
    totalScore: number;
    breakdown: {
        income: number;
        korean: number;
        age: number;
        bonus: number;
        penalty: number;
    };
    durationText: string;     // 체류 기간 텍스트
    isEligibilityMet: boolean; // 기본 요건 충족 여부
    eligibilityFailReason?: string; // 탈락 사유
    isPass: boolean;          // 최종 합격 여부
    gap: number;              // 부족 점수
}

// ✅ 점수표 매핑 로직 (이미지 기준)
const SCORE_RULES = {
    // ① 나이 (최대 60점)
    AGE: (birthYear: number): number => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        if (age < 19) return 0;
        if (age <= 26) return 40; // 19~26세
        if (age <= 33) return 60; // 27~33세 (최고점)
        if (age <= 40) return 30; // 34~40세
        return 10;                // 41세 이상
    },

    // ② 평균 소득 (최대 120점)
    INCOME: (amount: number): number => {
        // 신청 요건: 기본 2600 이상 (농축산은 2500이지만 일반 제조업 기준 2600 적용 권장)
        if (amount < 2500) return 0; // 과락
        if (amount >= 5000) return 120; // 5,000만 ~
        if (amount >= 4500) return 110; // 4,500만 ~
        if (amount >= 4000) return 95;  // 4,000만 ~
        if (amount >= 3500) return 80;  // 3,500만 ~
        if (amount >= 3000) return 65;  // 3,000만 ~
        return 50;                      // 2,500 ~ 3,000만
    },

    // ③ 한국어 능력 (최대 120점)
    KOREAN: (level: number): number => {
        if (level < 2) return 0;   // 2급 미만 점수 없음
        if (level >= 4) return 120; // 4급 이상 만점
        if (level === 3) return 80; // 3급
        return 50;                  // 2급
    },

    // ④ 가점 (이미지 하단 표 참조)
    BONUS: (data: VisaFormData): number => {
        let score = 0;

        // 1. 추천 (중복 불가, 택1)
        if (data.recType === 'central') score += 30; // ① 중앙부처
        else if (data.recType === 'local') score += 30; // ② 광역지자체
        else if (data.recType === 'company') score += 50; // ③ 고용기업체 (이미지에 50점으로 표기됨)

        // 2. 기타 가점 (중복 가능)
        if (data.continuousWork3Yr) score += 20; // ③ 현근무처 3년 이상
        if (data.remoteArea3Yr) score += 20;     // ④ 인구감소지역 3년 이상
        if (data.licenseOrDegree) score += 20;   // ⑤ 자격증/학위
        if (data.driverLicense) score += 10;     // ⑥ 운전면허증

        return score; // *참고: 총점 제한은 없으나 일반적으로 합산 적용
    },

    // ⑤ 감점 (횟수별 차등 적용)
    PENALTY: (data: VisaFormData): number => {
        let penalty = 0;

        // ① 벌금 100만원 미만 (최대 20)
        const fineScores = [0, 5, 10, 20]; // 0회, 1회, 2회, 3회이상
        penalty += fineScores[Math.min(data.penaltyFineCount, 3)];

        // ② 조세 체납 (최대 15)
        const taxScores = [0, 5, 10, 15];
        penalty += taxScores[Math.min(data.penaltyTaxCount, 3)];

        // ③ 출입국법 위반 (최대 15)
        const immigScores = [0, 5, 10, 15];
        penalty += immigScores[Math.min(data.penaltyImmigrationCount, 3)];

        return penalty;
    }
};

export const calculateScore = (data: VisaFormData): VisaResult => {
    // 체류 기간 계산
    const start = new Date(data.entryDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const displayYears = Math.floor(diffYears);
    const displayMonths = Math.floor((diffYears - displayYears) * 12);
    const durationText = `${displayYears}년 ${displayMonths}개월`;

    // 점수 계산
    const ageScore = SCORE_RULES.AGE(data.birthYear);
    const incomeScore = SCORE_RULES.INCOME(data.income);
    const koreanScore = SCORE_RULES.KOREAN(data.koreanScore);
    const bonusScore = SCORE_RULES.BONUS(data);
    const penaltyScore = SCORE_RULES.PENALTY(data);

    const totalScore = Math.max(0, ageScore + incomeScore + koreanScore + bonusScore - penaltyScore);

    // [자격 요건 검증]
    // 1. 체류기간 4년 이상 (이미지: 최근 10년간 4년 이상)
    let eligibility = true;
    let failReason = '';

    if (diffYears < 4) {
        eligibility = false;
        failReason = '체류 기간이 4년 미만입니다.';
    }
    // 2. 소득 2600만 이상 (일반 기준)
    else if (data.income < 2600) {
        eligibility = false;
        failReason = '연 소득이 2,600만원 미만입니다.';
    }
    // 3. 기본항목(소득+한국어) 최소점수 요건 (소득50점 + 한국어50점 이상) 
    // *이미지 주석: "기본항목의 A평균소득 및 B한국어능력 각각 최소점(50점) 이상자"
    else if (incomeScore < 50 || koreanScore < 50) {
        // 특례(한국어 미달 시 유예)가 있지만, 원칙적으로는 Fail 처리 후 안내하는 것이 안전
        // 여기서는 Strict Rule 적용
        eligibility = false;
        failReason = '소득 2,600만 이상 및 한국어 2급 이상이 필수입니다.';
    }

    const isPass = eligibility && totalScore >= 200;

    return {
        totalScore,
        breakdown: {
            income: incomeScore,
            korean: koreanScore,
            age: ageScore,
            bonus: bonusScore,
            penalty: penaltyScore
        },
        durationText,
        isEligibilityMet: eligibility,
        eligibilityFailReason: failReason,
        isPass,
        gap: Math.max(0, 200 - totalScore)
    };
};