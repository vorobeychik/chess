import React from "react";
import { observer } from "mobx-react-lite";
import Board from "../../components/Board/Board";
import styles from "./Game.module.css";
import { store } from "../../store/store";
import GameHistory from "../../components/GameHistory/GameHistory";
import GameMenu from "../../components/GameMenu/GameMenu";
import GameChooseBot from "../../components/GameChooseBot/GameChooseBot";
import PlayWithFriends from "../../components/PlayWithFriends/FlayWithFriends";
import Modal from "../../components/Modal/Modal";
import {createBoard} from "../../utils/utils";

const Game = observer(() => {



    return (
        <div className={styles.game_container}>
            {store.controller.isModalOpen && <Modal status={store.controller.gameEndModal}/>}
            {store.controller.controller.board && <Board />}
            {store.controller.controller.menu && <GameMenu />}
            {store.controller.controller.chooseBot && <GameChooseBot />}
            {store.controller.controller.history && <GameHistory />}
            {store.controller.controller.friends && <PlayWithFriends />}
        </div>
    );
});

export default Game;
