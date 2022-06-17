import { useState } from "react";
import { convertSecondsToTime } from "../utils/utils";

export function useTimer() {
    const [isStarted, setStarted] = useState(false);
    const [time, setTime] = useState(1);

    function startTimer() {
        setStarted(true);
        setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
    }

    return { time: convertSecondsToTime(time), isStarted, startTimer: startTimer };
}
