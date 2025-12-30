import { useState, useEffect, useRef } from "react";





export function useAnimatedNumber(targetValue: number) {
    const [displayValue, setDisplayValue] = useState(targetValue);
    const startTimeRef = useRef<number | null>(null);
    const startValueRef = useRef(targetValue);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (targetValue === displayValue) return;
        startValueRef.current = displayValue;
        startTimeRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const duration = 500;
            const progress = Math.min(
                (timestamp - startTimeRef.current) / duration,
                1
            );
            const easedProgress = progress * (2 - progress);
            const nextValue =
                startValueRef.current +
                (targetValue - startValueRef.current) * easedProgress;
            setDisplayValue(nextValue);
            if (progress < 1) rafRef.current = requestAnimationFrame(animate);
            else setDisplayValue(targetValue);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [targetValue]);
    return displayValue;
}