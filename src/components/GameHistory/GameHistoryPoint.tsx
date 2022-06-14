import React, { FC } from "react";
import styles from "./GameHistoryPoint.module.css";
import { History } from "../../types/types";
import { store } from "../../store/store";
import {observer} from "mobx-react-lite";
import classNames from "classnames";


interface GameHistoryPointProps {
    historyPoint: History;
    turn: number;
    isActive: boolean;
}

const GameHistoryPoint: FC<GameHistoryPointProps> = observer(({ historyPoint, turn,isActive }) => {

    const historyPointClickHandler = () => {
        console.log('нажал')
        store.history.watchHistory(historyPoint.currentHistoryState, turn);
    }



    const historyPointClassName = classNames(
        styles.history_point,

        turn % 2 === 0 ? styles.odd : styles.even,

    );

    const moveClassname = classNames(
        styles.moves_container,
/*        {[styles.turn_active]: isActive}*/
    )

    const turnClassName = classNames(
        styles.turn,
        {[styles.turn_active]: isActive}
    )

    return (
        <div className={historyPointClassName} onClick={historyPointClickHandler}>
            <span className={turnClassName}>{`${turn}.`}</span>
            <div className={moveClassname}>
                <p>{historyPoint.from}</p>
                <p>{historyPoint.to}</p>
            </div>
        </div>
    );
});

export default GameHistoryPoint;
