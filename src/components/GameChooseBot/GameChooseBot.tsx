import React, { useState } from "react";
import classNames from "classnames";
import { store } from "../../store/store";
import styles from "./GameChooseBot.module.css";
import { bots } from "../../constants/constants";

const GameChooseBot = () => {
    const [botState, setBot] = useState(bots[0]);

    const botButtons = bots.map((bot, index) => {
        const buttonClassName = classNames(
            styles.bot_button_image,
            { [styles.bot_button_image_selected]: botState.name === bot.name },
        );

        return (
            <img
                src={bot.img_url}
                className={buttonClassName}
                onClick={() => setBot(bot)}
                key={index}
            />
        );
    });

    const buttonClickHandler = () => {
        store.startGameWithBot(botState.level);
        store.game.setBotGame(true);
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.header_container}>
                <h1 className={styles.menu_header}>Choose Bot</h1>
            </div>
            <div className={styles.content_container}>
                <img src={botState.img_url} className={styles.bot_image} />
                <div className={styles.rating_container}>
                    <p className={styles.bot_name}>{botState.name}</p>
                    <p className={styles.bot_rating}>({botState.rating})</p>
                </div>
                <p className={styles.bot_description}>{botState.description}</p>
                <div className={styles.bot_button_container}>
                    {botButtons}
                </div>
            </div>
            <div className={styles.select_bot_button_container}>
                <button className={styles.select_bot_button} onClick={buttonClickHandler}>Start play</button>
            </div>
        </div>
    );
};

export default GameChooseBot;
