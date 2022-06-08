import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Board.module.css";
import BoardCell from "./BoardCell";
import { store } from "../../store/store";

const Board = observer(() => {
    useEffect(() => {
        store.highLiteCells();
    }, [store.selectedCell]);

    const cells = useMemo(() => store.board.map((row, index) => (
        <React.Fragment key={index}>
            {row.map((cell) => (
                <BoardCell
                    available={cell.available}
                    cell={cell}
                    selected={cell.position === store.selectedCell?.position}
                    key={cell.id}
                />
            ))}
        </React.Fragment>
    ),
    ), [store.board, store.selectedCell]);

    return (
        <div>
            <div>
                <p>{store.players.oponent.userData.login}</p>
                <img src={store.players.oponent.userData.avatar_url} height="20px" />
                <p>{store.timers && store.timers.oponentTimer}</p>
            </div>
            <div className={styles.board}>
                {cells}
            </div>
            <div>
                <p>{store.players.you.userData.login}</p>
                <img src={store.players.you.userData.avatar_url} height="20px" />
                <p>{store.timers && store.timers.yourTimer}</p>
            </div>
        </div>
    );
});

export default Board;
