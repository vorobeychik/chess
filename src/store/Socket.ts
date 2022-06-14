import socketIo from "socket.io-client";
import {prodServerOrigin} from "../constants/constants";

const SERVER = prodServerOrigin;

export class Socket {
    socket = socketIo(SERVER, {
        withCredentials: true,
        transports: ["websocket"],
    });
}
