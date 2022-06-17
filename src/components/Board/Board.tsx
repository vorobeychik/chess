import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Board.module.css";
import BoardCell from "./BoardCell";
import { store } from "../../store/store";
import UserProfile from "./UserProfile";

const Board = observer(() => {
    useEffect(() => {
        store.game.highLiteCells();
    }, [store.game.selectedCell]);

    const board = store.history.watchingHistory ? store.historyPoint! : store.game.board;
    const history = store.history;
    const cells = useMemo(() => board.map((row) => {
        const isHistoryAvailable = history.historyPoints.length;
        return row.map((cell) => (
            <BoardCell
                available={cell.available}
                cell={cell}
                historyMove={isHistoryAvailable ? history.historyPoints[history.currentHistoryPointIndex].from === cell.position || history.historyPoints[history.currentHistoryPointIndex].to === cell.position : false}
                selected={cell.position === store.game.selectedCell?.position}
                key={cell.id}
            />
        ));
    },
    ), [board, store.game.selectedCell]);

    return (
        <div className={styles.board_container}>
            {
                store.game.withEnemyProfile && (
                    <UserProfile
                        avatar={store.game.players.oponent.userData.avatar_url}
                        name={store.game.players.oponent.userData.login}
                        rating={store.game.players.oponent.userData.rating}
                        timer={store.game.timers.oponent}
                    />
                )
            }

            <div className={styles.board}>
                {cells}
            </div>
            <UserProfile
                avatar={store.game.players.you.userData.avatar_url}
                name={store.game.players.you.userData.login}
                rating={store.game.players.you.userData.rating}
                timer={store.game.timers.you}
            />
        </div>
    );
});

export default Board;
