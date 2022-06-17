import React, { useEffect } from "react";
import { authUri } from "../../constants/constants";
import styles from "./Login.module.css";
import { store } from "../../store/store";
import gitIcon from "../../assets/images/git_icon.png";

const Login = () => {
    useEffect(() => {
        (async () => {
            await store.authorize();
        })();
    }, []);

    return (
        <div className={styles.login_container}>
            <div className={styles.login_content}>
                <h1 className={styles.chess_header}>
                    Evo-chess
                </h1>
                <a href={authUri}>
                    <button className={styles.login_button}>
                        <img src={gitIcon} className={styles.icon} />
                        <p className={styles.button_text}>Log in with github</p>
                    </button>
                </a>
            </div>
            <div className={styles.git_registration_container}>
                <p className={styles.registration_paragraph}>New to github ? </p>
                <a className={styles.registration_link} href="https://github.com/signup">Sign up - and start playing chess!</a>
            </div>
        </div>
    );
};

export default Login;
