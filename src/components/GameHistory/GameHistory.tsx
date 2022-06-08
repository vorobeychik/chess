import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./GameHistory.module.css";
import { store } from "../../store/store";
import GameHistoryPoint from "./GameHistoryPoint";
import { createPares } from "../../utils/utils";

const GameHistory = observer(() => {
    const historyPoints = createPares(store.history).map((historyPoints, index) => (
        <GameHistoryPoint
            key={index}
            historyPoints={historyPoints}
        />
    ));

    return (
        <div className={styles.menu_container}>
            История
            <div>
                {historyPoints}
            </div>
            <div />
        </div>
    );
});

export default GameHistory;
