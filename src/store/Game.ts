import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { Cell } from "../models/Cell";
import { GameState, Players } from "../types/types";
import { gameInitialState } from "../constants/constants";
import { convertSecondsToTime, createBoard } from "../utils/utils";

export class Game {
    players: Players = {};
    roomName = "";
    selectedCell: Cell | null = null;
    gameState: GameState = gameInitialState;
    timers: Record<string, string> = {};
    withTimers = true;
    withEnemyProfile = true;
    isBotGame = false;
    isFinished = false;

    constructor(public socket: Socket) {
        this.socket = socket;

        makeAutoObservable(this, {
            socket: false,
        }, { autoBind: true });
    }

    setGameState(gameState: GameState) {
        this.gameState = gameState;
    }

    setTimers(timers: Record<string, number>, userId: number) {
        const timerKeys = Object.keys(timers);
        const convertedTimers: Record<string, string> = {};

        timerKeys.forEach((key) => {
            convertedTimers[userId.toString() === key ? "you" : "oponent"] = convertSecondsToTime(timers[key]);
        });

        this.timers = convertedTimers;
    }

    setPlayer(players: Players) {
        this.players = players;
    }

    setRoomName(roomName: string) {
        this.roomName = roomName;
    }

    get isYourTurn() {
        return this.players.you.side === this.gameState.turn;
    }

    setSelectedCell(cell: Cell | null) {
        this.selectedCell = cell;
    }

    highLiteCells() {
        this.board.forEach((row) => {
            row.forEach((cell) => {
                if (this.availableMoves && this.availableMoves.includes(cell.position)) {
                    cell.available = true;
                } else {
                    cell.available = false;
                }
            });
        });
    }

    setIsFinishGame(isFinished: boolean) {
        this.isFinished = isFinished;
    }

    setBotGame(isBotGame: boolean) {
        this.isBotGame = isBotGame;
    }

    get board() {
        if (this.players.you) {
            return createBoard(this.players.you.side, this.gameState);
        }
        return [];
    }

    get availableMoves() {
        if (this.selectedCell) {
            return this.gameState.moves[this.selectedCell?.position];
        }
    }

    turnOffTimers() {
        this.withTimers = false;
    }

    turnOnTimers() {
        this.withTimers = true;
    }

    turnOffEnemyProfile() {
        this.withEnemyProfile = false;
    }
}
