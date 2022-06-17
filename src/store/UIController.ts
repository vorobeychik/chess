import { makeAutoObservable } from "mobx";
import { gameEndStatuses, Panels } from "../enums/enums";

export class UIController {
    controller: Record<string, boolean> = {
        menu: true,
        board: false,
        chooseBot: false,
        history: false,
        friends: false,
    };

    gameEndModal: gameEndStatuses = gameEndStatuses.Draw;
    isModalOpen = false;

    constructor() {
        makeAutoObservable(this, {
        }, { autoBind: true });
    }

    openModal(status: gameEndStatuses) {
        this.gameEndModal = status;
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
}
