import { tiles } from "../constants/constants";

export type FigureNames = "q" | "Q" | "K" | "k" | "n" | "N" | "B" | "b" | "n" | "N" | "r" | "R" | "P" | "p";

export type Sides = "white" | "black";

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: null;
    blog: string;
    location: string;
    email: null;
    hireable: null;
    bio: null;
    twitter_username: null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    inGame: string;
    created_at: Date;
    updated_at: Date;
    iat: number;
    _id: string;
    gitHubId: number;
    rating: number;
    __v: number;
}

export type Pieces = Record<string, FigureNames>;

export interface History {
    previousHistoryState: GameState;
    currentHistoryState: GameState;
    from: string;
    to: string;
}

export type Timers = Record<string, number>;

export interface Player {
    userData: User;
    side: Sides;
    socketId: string;
}

export type Players = Record<string, Player>;

export type Moves = Record<string, string[]>;

export interface GameState {
    castling: {
        blackLong: boolean;
        blackShort: boolean;
        whiteLong: boolean;
        whiteShort: boolean;
    };
    check: boolean;
    checkMate: boolean;
    enPassant: null;
    fullMove: number;
    halfMove: number;
    isFinished: boolean;
    moves: Moves;
    pieces: Pieces;
    turn: Sides;
}
