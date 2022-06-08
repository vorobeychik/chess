import { makeAutoObservable } from "mobx";
import { Cell } from "../models/Cell";
import { Socket } from "./Socket";
import { GameState, History, User } from "../types/types";
import { userAuth } from "../services/services";
import { Colors, Panels } from "../enums/enums";
import { convertSecondsToTime, createMatrix } from "../utils/utils";
import { boardSize, gameInitialState, letters } from "../constants/constants";

const socket = new Socket();

type Controller = Record<string, boolean>;

export class Store {
    user: User | null = null;
    isLoading = false;
    isStarted = false;
    selectedCell: Cell | null = null;
    watchingHistory = false;
    history: History[] = [];
    socket = socket;
    players: any = {};
    roomName = "";
    timers: Record<string, string> = {};
    gameStatus: Record<string, string> = {};
    isModalOpen = false;
    gameState: GameState = gameInitialState;
    currentGameState: GameState = gameInitialState;

    controller: Controller = {
        menu: true,
        board: false,
        chooseBot: false,
        history: false,
        friends: false,
    };

    constructor() {
        makeAutoObservable(this);

        this.socket.socket.on("getGameState", (sate: GameState, history: History[]) => {
            this.gameState = sate;
            this.currentGameState = sate;
            this.history = history;
        });

        this.socket.socket.on("startGame", (roomName: string, players: any) => {
            this.setRoomName(roomName);
            this.setPlayer(players);
            this.openPanel(Panels.Board, Panels.History);
        });

        this.socket.socket.on("timerTick", (timers: any) => {
            this.setTimers(timers);
        });

        this.socket.socket.on("setTimers", (timers: any) => {
            this.setTimers(timers);
        });

        this.socket.socket.on("gameFinished", (gameStatus) => {
            this.openModal();
            this.setGameStatus(gameStatus);
        });
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    openPanel(...panelNames: Panels[]) {
        Object.keys(this.controller).forEach((key) => {
            this.controller[key] = !!panelNames.find((panel) => panel === key);
        });
    }

    setGameStatus(gameStatus: Record<string, string>) {
        this.gameStatus = gameStatus;
    }

    setTimers(timers: Record<string, number>) {
        const timerKeys = Object.keys(timers);
        const convertedTimers: Record<string, string> = {};
        if (this.user) {
            timerKeys.forEach((key) => {
                convertedTimers[this.user?.id.toString() === key ? "yourTimer" : "oponentTimer"] = convertSecondsToTime(timers[key]);
            });
        }

        this.timers = convertedTimers;
    }

    setPlayer(players: any) {
        const playerKeys = Object.keys(players);
        const result: Record<string, any> = {};
        playerKeys.forEach((key) => {
            if (this.user?.id && key === this.user?.id.toString()) {
                result.you = players[key];
            } else {
                result.oponent = players[key];
            }
        });

        this.players = result;
    }

    async authorize() {
        this.isLoading = true;
        const user = await userAuth();
        this.isLoading = false;
        if (user) {
            this.user = user;
        }
    }

    setRoomName(roomName: string) {
        this.roomName = roomName;
    }

    get isAuth() {
        return !!this.user;
    }

    get isYourTurn() {
        return this.players.you.side === this.gameState.turn;
    }

    setSelectedCell(cell: Cell | null) {
        this.selectedCell = cell;
    }

    joinRoom(roomName: string) {
        this.socket.socket.emit("joinRoom", roomName, this.user);
    }

    createRoom(roomName: string) {
        this.socket.socket.emit("createRoom", roomName, this.user);
    }

    startGameWithBot(botLevel: number) {
        this.socket.socket.emit("gameWithBot", botLevel);
        this.isStarted = true;
    }

    watchHistory(gameState: GameState) {
        this.watchingHistory = true;
        this.gameState = gameState;
    }

    backToGame() {
        this.watchingHistory = false;
        this.gameState = this.currentGameState;
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

    move(to: string) {
        const move = { from: this.selectedCell?.position, to };
        this.socket.socket.emit("move", this.roomName, move);
    }

    setStartGame(isGameStarted: boolean) {
        this.isStarted = isGameStarted;
    }

    get isWinner() {
        if (this.user) {
            return this.gameStatus.winner === this.user.id.toString();
        }

        return false;
    }

    get board() {
        return createMatrix(boardSize).map((row, rowIndex) => {
            return row.map((cell, elementIndex) => {
                const cellIndex = this.players.you.side === "white" ? (8 - rowIndex) : rowIndex + 1;
                const position = letters[elementIndex] + cellIndex;
                const cellColor = (rowIndex + elementIndex) % 2 === 0 ? Colors.WHITE : Colors.BLACK;
                if (this.gameState.pieces[position]) {
                    return new Cell(position, false, cellColor, this.gameState.pieces[position]);
                }

                return new Cell(position, false, cellColor, null);
            });
        });
    }

    get availableMoves() {
        if (this.selectedCell) {
            return this.gameState.moves[this.selectedCell?.position];
        }
    }
}

export const store = new Store();
