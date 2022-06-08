import {tiles} from "../constants/constants";

export type FigureNames = 'q' | "Q" | 'K' | 'k' | 'n' | 'N' | 'B' | 'b' | 'n' | 'N' | 'r' | 'R';

export type Sides = "white" | "black";

export type User = {
 id: number
}

export interface Pieces {
    [key: string]: FigureNames;
}

export interface History{
    previousHistoryState: GameState,
    currentHistoryState: GameState,
    from: string,
    to: string,
}


export interface Moves {
    [key: string]: string[];
}

export interface GameState{
    castling: {
        blackLong: boolean,
        blackShort: boolean,
        whiteLong: boolean,
        whiteShort: boolean,
    },
    check: boolean,
    checkMate: boolean,
    enPassant: null,
    fullMove: number,
    halfMove: number,
    isFinished: boolean,
    moves: Moves,
    pieces: Pieces,
    turn: Sides,
}