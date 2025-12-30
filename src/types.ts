export type LangCode = "kr" | "vn" | "kh" | "mm" | "uz";
export type TaxMode = "fourMajor" | "freelance" | "none";

export interface DayLog {
    basic: number;
    ot: number;
}

export interface WorkLog {
    [date: string]: DayLog; // "YYYY-MM-DD": { basic, ot }
}

export interface Settings {
    wage: number;
    taxMode: TaxMode;
    bonus: number;
    dorm: number;
    advance: number;
}

export interface SalaryResult {
    totalBasic: number;
    totalOt: number;
    totalJuhyu: number;
    juhyuCount: number;
    gross: number; // 세전
    tax: number;   // 공제총액
    net: number;   // 세후(실수령)
    deductions: {  // 4대보험 상세 내역 확장을 위해 객체로 분리
        national: number; // 국민연금
        health: number;   // 건강보험
        care: number;     // 요양보험
        employment: number; // 고용보험
        incomeTax: number;  // 소득세
    };
}