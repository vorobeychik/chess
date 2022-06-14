import n from "../assets/images/bn.png";
import N from "../assets/images/wn.png";
import b from "../assets/images/bb.png";
import B from "../assets/images/wb.png";
import k from "../assets/images/bk.png";
import K from "../assets/images/wk.png";
import p from "../assets/images/bp.png";
import P from "../assets/images/wp.png";
import r from "../assets/images/br.png";
import R from "../assets/images/wr.png";
import q from "../assets/images/bq.png";
import Q from "../assets/images/wq.png";
import { GameState } from "../types/types";

export const figureSkins = {
    B,
    b,
    n,
    N,
    K,
    k,
    P,
    p,
    r,
    R,
    Q,
    q,
};

export const boardSize = 8;
export const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const tiles = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8",
    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "E1", "E2", "E3",
    "E4", "E5", "E6", "E7", "E8", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "G1", "G2", "G3", "G4", "G5", "G6",
    "G7", "G8", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"];
export const authUri = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GIT_HUB_APP_ID}&scope=user&redirect_uri=https://evo-chess-server.herokuapp.com/user/auth`;

export const gameInitialState: GameState = {
    halfMove: 0,
    castling: { blackLong: false, blackShort: false, whiteLong: false, whiteShort: false },
    check: false,
    checkMate: false,
    enPassant: null,
    fullMove: 0,
    isFinished: false,
    moves: {},
    pieces: {},
    turn: "white",

};

export const prodServerOrigin = 'https://evo-chess-server.herokuapp.com/';
export const devServerOrigin = 'http://localhost:4000/'
