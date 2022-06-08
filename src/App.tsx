import React from "react";
import styles from "./App.module.css";
import Routes from "./routes/routes";

function App() {
    return (
        <div className={styles.app}>
            <Routes />
        </div>
    );
}

export default App;
