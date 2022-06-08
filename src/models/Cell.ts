import { makeAutoObservable } from "mobx";
import { Figure } from "./Figure";
import { FigureNames } from "../types/types";
import { Colors } from "../enums/enums";

export class Cell {
    position: string;
    figure: Figure | null;
    color: Colors;
    available: boolean;
    id: number;

    constructor(position: string, available: boolean, color: Colors, figure: FigureNames | null) {
        this.position = position;
        this.figure = figure && new Figure(figure);
        this.color = color;
        this.available = available;
        this.id = Math.random();
        makeAutoObservable(this);
    }
}
