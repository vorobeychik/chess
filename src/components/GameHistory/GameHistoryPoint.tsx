import React, { FC } from "react";
import styles from "./GameHistoryPoint.module.css";
import { History } from "../../types/types";
import { store } from "../../store/store";

interface GameHistoryPointProps {
    historyPoints: History[];
}

const GameHistoryPoint: FC<GameHistoryPointProps> = ({ historyPoints }) => {
    const firstHistoryClickHandler = () => {
        store.watchHistory(historyPoints[0].currentHistoryState);
    };

    const secondHistoryClickHandler = () => {
        store.watchHistory(historyPoints[1].currentHistoryState);
    };

    return (
        <div className={styles.history_point}>
            <p onClick={firstHistoryClickHandler}>{historyPoints[0].to}</p>
            {historyPoints[1] && <p onClick={secondHistoryClickHandler}>{historyPoints[1].to}</p>}
        </div>
    );
};

export default GameHistoryPoint;
