import { makeAutoObservable } from "mobx";
import { GameState, History as HistoryType, Timers } from "../types/types";
import { userAuth, socket } from "../services/services";
import { gameEndStatuses, Panels } from "../enums/enums";
import { createBoard } from "../utils/utils";
import { UIController } from "./UIController";
import { User } from "./User";
import { Game } from "./Game";
import { History } from "./History";
import { gameInitialState } from "../constants/constants";

export class Store {
    socket = socket;
    controller: UIController;
    history: History;
    user: User;
    game: Game;

    constructor() {
        makeAutoObservable(this);
        this.controller = new UIController();
        this.user = new User();
        this.game = new Game(socket);
        this.history = new History();

        this.socket.on("getGameState", (state: GameState, history: HistoryType[]) => {
            this.game.setGameState(state);
            this.history.setHistory(history);
        });

        this.socket.on("startGame", (roomName: string, players: any) => {
            this.game.setRoomName(roomName);
            this.game.setPlayer(players);
            this.controller.openPanel(Panels.Board, Panels.History);
        });

        this.socket.on("timerTick", (timers: Timers) => {
            if (this.user.userData) {
                this.game.setTimers(timers, this.user.userData?.id);
            }
        });

        this.socket.on("setTimers", (timers: Timers) => {
            if (this.user.userData) {
                this.game.setTimers(timers, this.user.userData?.id);
            }
        });

        this.socket.on("gameFinishedDraw", () => {
            this.game.setIsFinishGame(true);
            this.controller.openModal(gameEndStatuses.Draw);
        });

        this.socket.on("gameFinishedWin", () => {
            this.game.setIsFinishGame(true);
            this.controller.openModal(gameEndStatuses.Win);
        });

        this.socket.on("gameFinishedLose", () => {
            this.game.setIsFinishGame(true);
            this.controller.openModal(gameEndStatuses.Lose);
        });

        this.socket.on("gameFoundCreateRoom", (roomName: string) => {
            this.createRoom(roomName);
        });

        this.socket.on("gameFound", (roomName: string) => {
            this.joinRoom(roomName);
        });

        this.socket.on("offTimers", () => {
            this.game.turnOffTimers();
        });

        this.socket.on("offEnemyProfile", () => {
            this.game.turnOffEnemyProfile();
        });

        this.socket.on("setBotGame", () => {
            this.game.setBotGame(true);
        });
    }

    surrender() {
        this.socket.emit("surrender", this.game.roomName, this.user.userData, this.game.isBotGame);
    }

    findGame() {
        this.socket.emit("findGame", this.user.userData);
    }

    joinRoom(roomName: string) {
        this.socket.emit("joinRoom", roomName, this.user.userData);
    }

    createRoom(roomName: string) {
        this.socket.emit("createRoom", roomName, this.user.userData);
    }

    startGameWithBot(botLevel: number) {
        this.socket.emit("startGameWithBot", this.user.userData, botLevel);
    }

    move(to: string) {
        const move = { from: this.game.selectedCell?.position, to };
        this.socket.emit("move", this.game.roomName, move, this.user.userData, this.game.isBotGame);
    }

    reloadGameState() {
        this.game.gameState = gameInitialState;
        this.game.players = {};
        this.game.selectedCell = null;
        this.game.timers = {};
        this.game.withTimers = true;
        this.game.withEnemyProfile = true;
        this.game.isBotGame = false;
        this.game.isFinished = false;
        this.history.watchingHistory = false;
        this.history.historyPoints = [];
        this.history.currentHistoryPointIndex = 0;
    }

    async authorize() {
        this.user.isLoading = true;
        const user = await userAuth();
        if (user?.inGame) {
            this.socket.emit("reconnect", user.inGame, user);
        }
        this.user.isLoading = false;
        if (user) {
            this.user.setUserData(user);
        }
    }

    get historyPoint() {
        if (this.game.players.you.side) {
            return createBoard(this.game.players.you.side, this.history.historyPoints[this.history.currentHistoryPointIndex].currentHistoryState);
        }
    }
}

export const store = new Store();
