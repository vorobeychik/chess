import axios from "axios";
import socketIo from "socket.io-client";
import { User } from "../types/types";

import { devServerOrigin, prodServerOrigin } from "../constants/constants";

export const api = axios.create({ baseURL: "http://localhost:4000" });

// const server =  prodServerOrigin;
export const socket = socketIo("http://localhost:4000", {
    withCredentials: true,
    transports: ["websocket"],
});

export async function userAuth(): Promise<User | null> {
    try {
        const res = await api.get(
            `/user/`,
            {
                withCredentials: true,
            },
        );
        return res.data;
    } catch (error) {
        return null;
    }
}
