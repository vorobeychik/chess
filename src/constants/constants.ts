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
import botImage from '../assets/images/bot1.png'
import botImage2 from '../assets/images/bot2.png'
import botImage3 from '../assets/images/bot3.png'
import botImage4 from '../assets/images/bot4.png'
import botImage5 from '../assets/images/bot5.png'

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
export const authUri = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GIT_HUB_APP_ID}&scope=user&redirect_uri=http://localhost:4000/user/auth`;

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

export const bots = [{
    name: "Pavel",
    img_url: botImage,
    rating: 800,
    description: "Pavel wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 0,
}, {
    name: "Aron",
    img_url: botImage2,
    rating: 1000,
    description: "Aron is new to chess, but learning quickly. Try to beat him now while you still can.",
    level: 1,
}, {
    name: "Fabian",
    img_url: botImage3,
    rating: 1200,
    description: "Fabian hasn't been playing for long, but he's improving quickly. He's been studying old games and developing a positional style.",
    level: 2,
}, {
    name: "Zara",
    img_url: botImage4,
    rating: 1400,
    description: "Zara loves to play creative chess games and come up with her own ideas. Be careful or she'll trick you with her unique tactics.",
    level: 3,
}, {
    name: "Oliver",
    img_url: botImage5,
    rating: 1600,
    description: "Oliver loves to have fun and surprise his opponents. Pay close attention or he might just unleash an attack out of nowhere.\n",
    level: 4,
}];

export const prodServerOrigin = 'https://evo-chess-server.herokuapp.com/';
export const devServerOrigin = 'http://localhost:4000/'
