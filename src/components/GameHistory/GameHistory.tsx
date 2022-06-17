import React from "react";
import { observer } from "mobx-react-lite";
import {
    CaretLeftOutlined,
    CaretRightOutlined,
    FlagOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
} from "@ant-design/icons";
import styles from "./GameHistory.module.css";
import { store } from "../../store/store";
import GameHistoryPoint from "./GameHistoryPoint";
import { Panels } from "../../enums/enums";

const GameHistory = observer(() => {
    const historyPoints = store.history.historyPoints.map((historyPoint, index) => (
        <GameHistoryPoint
            key={index}
            turn={index}
            isActive={index === store.history.currentHistoryPointIndex}
            historyPoint={historyPoint}
        />
    ));

    const backToMenuClickHandler = () => {
        store.controller.closeModal();
        store.controller.openPanel(Panels.Menu);
        store.reloadGameState();
    };

    const nextHistoryClickHandler = () => {
        store.history.nextHistory();
        store.game.setSelectedCell(null);
    };

    const firstHistoryClickHandler = () => {
        store.history.firstHistory();
        store.game.setSelectedCell(null);
    };

    const lastHistoryClickHandler = () => {
        store.history.lastHistory();
        store.game.setSelectedCell(null);
    };

    const replayHistoryClickHandler = () => {
        store.history.watchReplay();
        store.game.setSelectedCell(null);
    };

    const stopReplayHistoryClickHandler = () => {
        store.history.stopReplay();
        store.game.setSelectedCell(null);
    };

    const prevHistoryClickHandler = () => {
        store.history.prevHistory();
        store.game.setSelectedCell(null);
    };

    const surrenderClick = () => {
        store.surrender();
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.header_container}>
                <h1 className={styles.menu_header}>History</h1>
            </div>
            <div className={styles.history_points_container}>
                {historyPoints}
            </div>
            <div className={styles.history_controls}>
                <FlagOutlined onClick={surrenderClick} className={styles.button_icon} />
                <StepBackwardOutlined onClick={firstHistoryClickHandler} className={styles.button_icon} />
                <CaretLeftOutlined onClick={prevHistoryClickHandler} className={styles.button_icon} />
                {
                    store.history.isWatchingReplay ?
                        <PauseCircleOutlined onClick={stopReplayHistoryClickHandler} className={styles.button_icon} /> :
                        <PlayCircleOutlined onClick={replayHistoryClickHandler} className={styles.button_icon} />
                }
                <CaretRightOutlined onClick={nextHistoryClickHandler} className={styles.button_icon} />
                <StepForwardOutlined onClick={lastHistoryClickHandler} className={styles.button_icon} />
            </div>
            <div className={styles.back_button_container}>
                <button
                    className={styles.back_button}
                    onClick={backToMenuClickHandler}
                    disabled={!store.game.isFinished}
                >
                    back to menu
                </button>
            </div>
        </div>
    );
});

export default GameHistory;
