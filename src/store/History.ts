import {makeAutoObservable} from "mobx";
import { Socket } from "./Socket";
import {GameState} from "../types/types";
import {History as HistoryType} from "../types/types";
import {gameInitialState} from "../constants/constants";

export class History {

    watchingHistory = false;
    isWatchingReplay = false;
    replayInterval: ReturnType<typeof setInterval> |  null = null;
    historyPoints: HistoryType[] = [];
    currentHistoryPointIndex: number = this.historyPoints.length;

    constructor() {


        makeAutoObservable(this, {
        }, { autoBind: true, deep: true });
    }

    setHistory(historyPoints:HistoryType[]){
        if(historyPoints.length){
            this.historyPoints = historyPoints;
            this.currentHistoryPointIndex = historyPoints.length - 1;
        }
    }


    watchHistory(gameState: GameState, turn: number) {
        this.watchingHistory = true;
        this.currentHistoryPointIndex = turn;
        this.stopReplay()
    }

    nextHistory(){
        if(this.currentHistoryPointIndex !== this.historyPoints.length - 1){
            this.watchingHistory = true;
            this.currentHistoryPointIndex += 1;
            this.stopReplay()
        }
    }

    watchReplay(){
        this.isWatchingReplay = true;
        this.replayInterval = setInterval(() =>  {
            if(this.currentHistoryPointIndex !== this.historyPoints.length - 1){
                this.watchingHistory = true;
                this.currentHistoryPointIndex += 1;
            }else if(this.replayInterval){
                clearInterval(this.replayInterval);
            }
        },(1350))
    }

    stopReplay(){
        if(this.replayInterval){
            this.isWatchingReplay = false;
            clearInterval(this.replayInterval);
        }
    }

    firstHistory(){
        this.watchingHistory = true;
        this.currentHistoryPointIndex = 0;
        this.stopReplay()
    }

    lastHistory(){
        this.watchingHistory = true;
        this.currentHistoryPointIndex = this.historyPoints.length - 1;
        this.stopReplay()
    }

    prevHistory(){
        if(this.currentHistoryPointIndex > 0){
            this.watchingHistory = true;
            this.currentHistoryPointIndex -= 1;
            this.stopReplay()
        }
    }


    backToGame() {
        this.watchingHistory = false;
        this.currentHistoryPointIndex = this.historyPoints.length - 1;
        this.stopReplay()
    }
}
