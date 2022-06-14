import React, { useState } from "react";
import styles from "./PlayWithFriends.module.css";
import { store } from "../../store/store";

const PlayWithFriends = () => {
    const [inputValue, setInputValue] = useState("");

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const buttonJoinClickHandler = () => {
        store.createRoom(inputValue);
    };

    const buttonCreateClickHandler = () => {
        store.joinRoom(inputValue);
    };

    return (
        <div className={styles.menu_container}>
            <div className={styles.header_container}>
                <h1 className={styles.menu_header}>Play with friend</h1>
            </div>
            <div className={styles.content_container}>
                <input className={styles.input} placeholder="Room name" value={inputValue} onChange={changeHandler} />
                <button className={styles.button} onClick={buttonJoinClickHandler}>Create Room</button>
                <button className={styles.button} onClick={buttonCreateClickHandler}>Join Room</button>
            </div>
        </div>
    );
};

export default PlayWithFriends;
