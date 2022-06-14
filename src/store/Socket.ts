import socketIo from "socket.io-client";
import {devServerOrigin, prodServerOrigin} from "../constants/constants";

// const server =  prodServerOrigin;

export class Socket {
    socket = socketIo('http://localhost:4000', {
        withCredentials: true,
        transports: ["websocket"],
    });
}
