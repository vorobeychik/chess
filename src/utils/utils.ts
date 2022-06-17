import { GameState, Sides } from "../types/types";
import { Colors, gameEndStatuses } from "../enums/enums";
import { boardSize, letters } from "../constants/constants";
import { Cell } from "../models/Cell";

export function createMatrix(size: number): number[][] {
    return Array(size).fill(new Array(size).fill(0));
}

export function createBoard(playerSide: Sides, gameState: GameState) {
    return createMatrix(boardSize).map((row, rowIndex) => {
        return row.map((cell, elementIndex) => {
            const cellIndex = playerSide === "white" ? (8 - rowIndex) : rowIndex + 1;
            const position = letters[elementIndex] + cellIndex;
            const colorIndex = (rowIndex + elementIndex) % 2;
            const isRevesed = playerSide === "white" ? colorIndex === 0 : colorIndex !== 0;
            const cellColor = isRevesed ? Colors.WHITE : Colors.BLACK;
            if (gameState.pieces[position]) {
                return new Cell(position, false, cellColor, gameState.pieces[position]);
            }

            return new Cell(position, false, cellColor, null);
        });
    });
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

export function chooseRatingText(gameEndStatus: gameEndStatuses) {
    switch (gameEndStatus) {
        case gameEndStatuses.Draw:
            return "+0";
        case gameEndStatuses.Lose:
            return "-25";
        case gameEndStatuses.Win:
            return "+25";
    }
}
