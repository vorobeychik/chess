import socketIo from "socket.io-client";
import {devServerOrigin, prodServerOrigin} from "../constants/constants";


const server =  process.env.NODE_ENV === 'production' ?  prodServerOrigin : devServerOrigin

export class Socket {
    socket = socketIo(server, {
        withCredentials: true,
        transports: ["websocket"],
    });
}
