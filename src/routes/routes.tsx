import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes as RouterRotes,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import Login from "../pages/Login/Login";
import Game from "../pages/Game/Game";

const Routes = observer(() => {
    if (store.isAuth) {
        return (
            <Router>
                <RouterRotes>
                    <Route path="/" element={<Game />} />
                </RouterRotes>
            </Router>
        );
    }

    return (
        <Router>
            <RouterRotes>
                <Route path="/" element={<Login />} />
            </RouterRotes>
        </Router>
    );
});

export default Routes;
