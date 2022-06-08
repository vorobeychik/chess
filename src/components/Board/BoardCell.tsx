import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import styles from "./BoardCell.module.css";
import { Cell } from "../../models/Cell";
import { Colors } from "../../enums/enums";
import { store } from "../../store/store";

interface BoardCellProps {
    cell: Cell;
    available: boolean;
    selected: boolean;
}

const BoardCell: FC<BoardCellProps> = observer(({ cell, selected }) => {
    const cellClassName = classNames(
        styles.cell,
        cell.color === Colors.BLACK ? styles.black : styles.white,
        { [styles.selected]: selected },
        { [styles.availableFigure]: cell.available && cell.figure },
    );

    const clickHandler = useCallback(() => {
        if (store.watchingHistory) {
            store.backToGame();
        } else if (store.selectedCell && store.selectedCell !== cell && cell.available) {
            store.move(cell.position);
            store.setSelectedCell(null);
        } else if (!!cell.figure && cell.figure.color === store.players.you.side && store.isYourTurn) {
            store.setSelectedCell(cell);
        }
    }, []);

    return (
        <div className={cellClassName} onClick={clickHandler}>
            {cell.available && !cell.figure && <div className={styles.available} />}
            {cell.figure?.skin && <img src={cell.figure.skin} alt="" />}
        </div>
    );
});

export default BoardCell;
