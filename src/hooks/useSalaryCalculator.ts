import { useMemo } from "react";
import type { WorkLog, Settings, SalaryResult } from "../types";
import { HOLIDAYS, TAX_RATES_DETAILED } from "../constants";

export function useSalaryCalculator(
    workLog: WorkLog,
    year: number,
    month: number,
    settings: Settings
): SalaryResult {
    return useMemo(() => {
        let totalBasic = 0;
        let totalOt = 0;
        let juhyuCount = 0;
        const weeklyHours = [0, 0, 0, 0, 0, 0];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();

        // 1. 근로 시간 계산
        for (let d = 1; d <= daysInMonth; d++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const log = workLog[dateKey];
            if (log) {
                const dayOfWeek = new Date(year, month, d).getDay();
                const isHoli = !!HOLIDAYS[dateKey];
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const weekIdx = Math.floor((d + firstDayIndex - 1) / 7);

                // 휴일/주말은 전체 1.5배, 평일은 1.0배
                if (isWeekend || isHoli) {
                    totalOt += (log.basic + log.ot) * settings.wage * 1.5;
                } else {
                    totalBasic += log.basic * settings.wage;
                    totalOt += log.ot * settings.wage * 1.5;
                    weeklyHours[weekIdx] += log.basic;
                }
            }
        }

        // 2. 주휴수당
        weeklyHours.forEach((h) => {
            if (h >= 15) juhyuCount++;
        });
        const totalJuhyu = juhyuCount * 8 * settings.wage;
        const gross = totalBasic + totalOt + totalJuhyu + settings.bonus;

        // 3. 세금 계산 (여기가 고도화 포인트)
        let deductions = {
            national: 0, health: 0, care: 0, employment: 0, incomeTax: 0
        };
        let taxTotal = 0;

        if (settings.taxMode === "fourMajor") {
            // [TODO] 여기에 나중에 갑근세(소득세) 표 로직 추가 가능
            deductions.national = Math.floor(gross * TAX_RATES_DETAILED.national);
            deductions.health = Math.floor(gross * TAX_RATES_DETAILED.health);
            deductions.care = Math.floor(deductions.health * TAX_RATES_DETAILED.care); // 건보료의 %
            deductions.employment = Math.floor(gross * TAX_RATES_DETAILED.employment);

            // 간이세액표 대신 일단 단순 합산 (추후 고도화 대상)
            taxTotal = deductions.national + deductions.health + deductions.care + deductions.employment;
        } else if (settings.taxMode === "freelance") {
            taxTotal = Math.floor(gross * TAX_RATES_DETAILED.freelance);
            deductions.incomeTax = taxTotal;
        }

        const net = gross - taxTotal - settings.dorm - settings.advance;

        return {
            totalBasic, totalOt, totalJuhyu, juhyuCount,
            gross, tax: taxTotal, net, deductions
        };
    }, [workLog, year, month, settings]);
}