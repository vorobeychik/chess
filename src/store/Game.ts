import {makeAutoObservable} from "mobx";
import {Socket} from "./Socket";
import {GameState, History, Moves, Pieces} from "../types/types";
import {createMatrix} from "../utils/utils";
import {boardSize, letters} from "../constants/constants";
import {Cell} from "../models/Cell";
import {Colors} from "../enums/enums";
import board from "../components/Board/Board";

export class Game{



    constructor(public socket: Socket) {

      /*  this.socket.socket.emit('newGame');*/

        makeAutoObservable(this, {
            socket: false,
        },{autoBind: true});



    }


}