import React from "react";
import styles from "./GameMenu.module.css";
import { store } from "../../store/store";
import { Panels } from "../../enums/enums";

const GameMenu = () => {
    const playBotClickHandler = () => {
        store.openPanel(Panels.Bot);
    };

    const playFriendsClickHandler = () => {
        store.openPanel(Panels.Friends);
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.menu_item} onClick={playFriendsClickHandler}>
                Play with Friends
            </div>
            <div className={styles.menu_item} onClick={playBotClickHandler}>
                Play with bot
            </div>
        </div>
    );
};

export default GameMenu;
