import socketIo from "socket.io-client";
import {devServerOrigin, prodServerOrigin} from "../constants/constants";


const server =  prodServerOrigin;

export class Socket {
    socket = socketIo(server, {
        withCredentials: true,
        transports: ["websocket"],
    });
}
