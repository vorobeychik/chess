import React, {useState} from "react";
import styles from "./GameMenu.module.css";
import { store } from "../../store/store";
import { Panels } from "../../enums/enums";
import blitzIcon from '../../assets/images/blitz.webp';
import botIcon from '../../assets/images/computer.webp'
import friendIcon from '../../assets/images/friend.webp'
import {useTimer} from "../../hook/useTimer";


const GameMenu = () => {
    const {isStarted, startTimer, time} = useTimer();

    const playBotClickHandler = () => {
        store.controller.openPanel(Panels.Bot);
    };

    const playFriendsClickHandler = () => {
        store.controller.openPanel(Panels.Friends);
    };

    const playWithRandom = () => {
        startTimer();
        store.findGame()
    }


    return (
        <div className={styles.menu_container}>
            <div className={styles.header_container}>
                <h1 className={styles.menu_header}>Play chess</h1>
            </div>
            {
                isStarted && <div className={styles.menu_item} onClick={playWithRandom}>
                    <div className={styles.menu_item_timer_container}>
                        <p className={styles.menu_item_title}>Finding opponent:  {time}</p>

                    </div>

                </div>
            }
            {
                !isStarted && <div className={styles.menu_item} onClick={playWithRandom}>
                    <img src={blitzIcon} className={styles.menu_item_icon}/>
                    <div className={styles.menu_item_text_container}>
                        <p className={styles.menu_item_title}>Play with random opponent</p>
                        <p className={styles.menu_item_description}>Play with an opponent of the same level</p>
                    </div>
                </div>
            }

            <div className={styles.menu_item} onClick={playFriendsClickHandler}>
                <img src={friendIcon} className={styles.menu_item_icon}/>
                <div className={styles.menu_item_text_container}>
                    <p className={styles.menu_item_title}>Play with Friends</p>
                    <p className={styles.menu_item_description}>Invite a friend to a game of chess</p>
                </div>
            </div>
            <div className={styles.menu_item} onClick={playBotClickHandler}>
                <img src={botIcon} className={styles.menu_item_icon}/>
                <div className={styles.menu_item_text_container}>
                    <p className={styles.menu_item_title}>Play with bot</p>
                    <p className={styles.menu_item_description}>Play with bots: from beginners to masters</p>
                </div>
            </div>
        </div>
    );
};

export default GameMenu;
