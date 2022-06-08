import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./Modal.module.css";
import { store } from "../../store/store";
import { Panels } from "../../enums/enums";

const Modal = observer(() => {

    const closeModalClickHandler = () => {
        store.closeModal();
    };

    const backToMenuClickHandler = () => {
        store.closeModal();
        store.openPanel(Panels.Menu);
    };

    const gameTitle = store.isWinner ? "You Win" : "You lose";

    return (
        <div className={styles.modal}>
            <button onClick={closeModalClickHandler}>close</button>
            <p>
                {store.gameStatus.statusName === "draw" && "Draw"}
                {store.gameStatus.statusName === "mate" && gameTitle}
            </p>
            <button onClick={backToMenuClickHandler}>
                back to menu
            </button>
        </div>
    );
});

export default Modal;
