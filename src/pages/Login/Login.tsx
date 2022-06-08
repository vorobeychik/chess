import React, { useEffect } from "react";
import { authUri } from "../../constants/constants";
import { store } from "../../store/store";

const Login = () => {
    useEffect(() => {
        (async () => {
            await store.authorize();
        })();
    }, []);

    return (
        <div>
            <p>Войдите через гит хаб</p>
            <a href={authUri}>
                <button>Войти</button>
            </a>
        </div>
    );
};

export default Login;
