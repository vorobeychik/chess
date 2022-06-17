import React, { FC, useCallback, useState } from "react";
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
    historyMove: boolean;
}

const BoardCell: FC<BoardCellProps> = observer(({ cell, selected, historyMove }) => {
    const [isDragOver, setDragOver] = useState(false);

    const cellClassName = classNames(
        styles.cell,
        cell.color === Colors.BLACK ? styles.black : styles.white,
        { [styles.selected]: selected || historyMove },
        { [styles.drag]: isDragOver },
    );

    const positionClassName = classNames(
        styles.position,
        cell.color === Colors.BLACK ? styles.position_white : styles.position_black,
    );

    const availableClassName = classNames(
        styles.available,
        { [styles.can_eat]: cell.figure },
    );

    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
        if (store.history.watchingHistory) {
            store.history.backToGame();
        }
        if (!!cell.figure && cell.figure.color === store.game.players.you.side && store.game.isYourTurn) {
            store.game.setSelectedCell(cell);
        }
    };

    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        if (store.game.selectedCell && store.game.selectedCell !== cell && cell.available) {
            store.move(cell.position);
            store.game.setSelectedCell(null);
        }
    };

    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const dragLeaveHandler = () => {
        setDragOver(false);
    };

    const clickHandler = useCallback(() => {
        if (store.history.watchingHistory) {
            store.history.backToGame();
        } else if (store.game.selectedCell && store.game.selectedCell !== cell && cell.available) {
            store.move(cell.position);
            store.game.setSelectedCell(null);
        } else if (!!cell.figure && cell.figure.color === store.game.players.you.side && store.game.isYourTurn) {
            store.game.setSelectedCell(cell);
        }
    }, []);

    return (
        <div
            className={cellClassName}
            onClick={clickHandler}
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
        >
            <p className={positionClassName}> {cell.position}</p>
            {cell.available && <div className={availableClassName} />}
            {cell.figure?.skin && <img src={cell.figure.skin} alt="" draggable={true} onDragStart={dragStartHandler} />}
        </div>
    );
});

export default BoardCell;
