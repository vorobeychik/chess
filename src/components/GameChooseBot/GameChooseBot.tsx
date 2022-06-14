import React, { useState } from "react";
import { store } from "../../store/store";
import { Panels } from "../../enums/enums";
import styles from "./GameChooseBot.module.css";

const bots = [{
    name: "Sposob",
    difficultyDescription: "Well-trained monkey",
    description: "Jimmy wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 0,
}, {
    name: "Bibmbo",
    difficultyDescription: "Well-trained monkey",
    description: "Jimmy wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 1,
}, {
    name: "Lahat",
    difficultyDescription: "Well-trained monkey",
    description: "Jimmy wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 2,
}, {
    name: "Lahat",
    difficultyDescription: "Well-trained monkey",
    description: "Jimmy wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 3,
}, {
    name: "Lahat",
    difficultyDescription: "Well-trained monkey",
    description: "Jimmy wants to make sure you enjoy the game. He'll adapt to make it a little easier, or a little harder, depending on how you play.\n",
    level: 4,
}];

const GameChooseBot = () => {
    const [botState, setBot] = useState(bots[0]);

    const botButtons = bots.map((bot, index) => {
        return <button onClick={() => setBot(bot)} key={index}>{bot.level}</button>;
    });

    const buttonClickHandler = () => {
        store.startGameWithBot(botState.level);
        store.game.setBotGame(true);
    };

    return (
        <div className={styles.menu_container}>
            <p>{botState.name}</p>
            <p>{botState.difficultyDescription}</p>
            <p>{botState.description}</p>

            <div>
                {botButtons}
            </div>

            <button onClick={buttonClickHandler}>Выбрать</button>
        </div>
    );
};

export default GameChooseBot;
