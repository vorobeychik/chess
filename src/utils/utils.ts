import { History } from "../types/types";

export function createMatrix(size: number): number[][] {
    return Array(size).fill(new Array(size).fill(0));
}

export function createPares(arr: History[]): History[][] {
    const result = [];

    for (let i = 0; i < arr.length; i += 2) {
        result.push(arr.slice(i, i + 2));
    }

    return result;
}

export function convertSecondsToTime(time: number) {
    let convertedTime = `${Math.floor(time / 60)}:`;
    const seconds: number = time % 60;
    if (seconds === 0) {
        convertedTime += `${seconds}0`;
    } else if (seconds < 10) {
        convertedTime += `0${seconds}`;
    } else {
        convertedTime += seconds;
    }
    return convertedTime;
}
