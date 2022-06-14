import {makeAutoObservable} from "mobx";
import {Socket} from "./Socket";
import {GameState, History as HistoryType} from "../types/types";
import {userAuth} from "../services/services";
import {gameEndStatuses, Panels} from "../enums/enums";
import {createBoard} from "../utils/utils";
import {UIController} from "./UIController";
import {User} from "./User";
import {Game} from "./Game";
import {History} from "./History";
import {stat} from "fs";

const socket = new Socket();

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

        this.socket.socket.on("getGameState", (state: GameState, history: HistoryType[]) => {
            console.log('сработал')
            console.log(state)
            this.game.setGameState(state);
            this.history.setHistory(history);
        });

        this.socket.socket.on("startGame", (roomName: string, players: any) => {
            console.log('началась',players)
            this.game.setRoomName(roomName);
            this.game.setPlayer(players);
            this.controller.openPanel(Panels.Board, Panels.History);
        });

        this.socket.socket.on("timerTick", (timers: any) => {
            if( this.user.userData){
                this.game.setTimers(timers, this.user.userData?.id);
            }

        });

        this.socket.socket.on("setTimers", (timers: any) => {
            console.log('сработали таймеры',timers);
            if( this.user.userData){
                this.game.setTimers(timers, this.user.userData?.id);
            }
        });

        this.socket.socket.on("gameFinishedDraw", (gameStatus) => {
            console.log('ничья')
            this.controller.openModal(gameEndStatuses.Draw);
        });

        this.socket.socket.on("gameFinishedWin", (gameStatus) => {
            console.log('выйграл')
            this.controller.openModal(gameEndStatuses.Win);
        });

        this.socket.socket.on("gameFinishedLose", (gameStatus) => {
            console.log('проиграл')
            this.controller.openModal(gameEndStatuses.Lose);
        });

        this.socket.socket.on("gameFoundCreateRoom", (roomName: string) => {
            console.log('found create')
                this.createRoom(roomName);
        })

        this.socket.socket.on("gameFound", (roomName: string) => {
            console.log('found ')
            this.joinRoom(roomName);
        })

        this.socket.socket.on("offTimers",() => {
            this.game.turnOffTimers()
        })

        this.socket.socket.on("offEnemyProfile",() => {
            this.game.turnOffEnemyProfile();
        })

        this.socket.socket.on('setBotGame', () => {
            this.game.setBotGame(true);
        })
    }

    surrender(){
        this.socket.socket.emit('surrender', this.game.roomName, this.user.userData, this.game.isBotGame)
    }

    findGame(){
        this.socket.socket.emit("findGame", this.user.userData);
    }

    joinRoom(roomName: string) {
        this.socket.socket.emit("joinRoom", roomName, this.user.userData);
    }

    createRoom(roomName: string) {
        this.socket.socket.emit("createRoom", roomName, this.user.userData);
    }

    startGameWithBot(botLevel: number) {
        this.socket.socket.emit("startGameWithBot", this.user.userData ,botLevel);
    }

    move(to: string) {
        const move = { from: this.game.selectedCell?.position, to };
        this.socket.socket.emit("move", this.game.roomName, move, this.user.userData, this.game.isBotGame);
    }

    async authorize() {
        this.user.isLoading = true;
        const user = await userAuth();
        if(!!user?.inGame){
            this.socket.socket.emit("reconnect", user.inGame,user);
        }
        this.user.isLoading = false;
        if (user) {
            this.user.setUserData(user);
        }
    }



    get historyPoint(){
        if(this.game.players.you.side){
            return createBoard(this.game.players.you.side,this.history.historyPoints[this.history.currentHistoryPointIndex].currentHistoryState);
        }

    }
}

export const store = new Store();
