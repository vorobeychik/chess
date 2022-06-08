import { figureSkins } from "../constants/constants";
import { FigureNames } from "../types/types";
import { Colors } from "../enums/enums";

export class Figure {
    name: string;
    skin: string;
    color: Colors;

    constructor(name: FigureNames) {
        this.name = name;
        this.skin = figureSkins[name];
        this.color = name.toUpperCase() === name ? Colors.WHITE : Colors.BLACK;
    }
}
