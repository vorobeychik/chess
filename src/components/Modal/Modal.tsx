import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import styles from "./Modal.module.css";
import {store} from "../../store/store";
import {gameEndStatuses, Panels} from "../../enums/enums";
import classNames from "classnames";
import {CloseOutlined} from "@ant-design/icons";
import {chooseRatingText} from "../../utils/utils";

interface ModalProps{
    status: gameEndStatuses
}

const Modal:FC<ModalProps> = observer(({ status }) => {

    const closeModalClickHandler = () => {
        store.controller.closeModal();
    };

    const backToMenuClickHandler = () => {
        store.controller.closeModal();
        store.controller.openPanel(Panels.Menu);
        store.reloadGameState();
    };

    const isWinner = status === gameEndStatuses.Win;
    const ratingAdded = chooseRatingText(status);

    const playerIconStyles = classNames( styles.playerIcon, {[styles.playerIconWin] : isWinner} );
    const oponentIconStyles = classNames( styles.playerIcon, {[styles.playerIconWin] : !isWinner} );

    const headerContainerClassName = classNames(
        styles.header_container,
        {[styles.header_container_win]: isWinner}
    )

    const playerNameClassName = classNames(styles.player_name, {[styles.player_name_winner]: isWinner});
    const opponentNameClassName = classNames(styles.player_name, {[styles.player_name_winner]: !isWinner});
    const ratingAddedClassName = classNames(styles.rating_added,{
        [styles.rating_added_winner]: isWinner
    })


    return (
        <div className={styles.modal}>
            <div className={headerContainerClassName}>
                <div className={styles.close_button_container}>
                    <CloseOutlined  className={styles.close_button} onClick={closeModalClickHandler}/>
                </div>
                <h1 className={styles.modal_header}>{status}</h1>
                <p className={styles.modal_description}>Game finished</p>
            </div>
            <div className={styles.player_containers}>
                <div className={styles.player}>
                    <img src={store.game.players.you.userData.avatar_url} className={playerIconStyles}/>
                    <p className={playerNameClassName}>{store.game.players.you.userData.login}</p>
                </div>
                <div className={styles.opponent}>
                    <img src={store.game.players.oponent.userData.avatar_url} className={oponentIconStyles}/>
                    <p className={opponentNameClassName}>{store.game.players.oponent.userData.login}</p>
                </div>
            </div>
            <div className={styles.rating_container}>
                <p className={styles.rating_title}>Rapid rating</p>
                <div className={styles.rating_amount_container}>
                    <p className={styles.rating}>{store.game.players.you.userData.rating}</p>
                    {
                     !store.game.isBotGame && <p className={ratingAddedClassName}>{ratingAdded}</p>
                    }

                </div>

            </div>
            <div className={styles.back_button_container}>
                <button className={styles.back_button} onClick={backToMenuClickHandler}>
                    back to menu
                </button>
            </div>

        </div>
    );
});

export default Modal;
