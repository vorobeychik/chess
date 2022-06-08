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
            <input placeholder="Room name" value={inputValue} onChange={changeHandler} />
            <button onClick={buttonJoinClickHandler}>Create Room</button>
            <button onClick={buttonCreateClickHandler}>Join Room</button>
        </div>
    );
};

export default PlayWithFriends;
