import socketIo from "socket.io-client";

const SERVER = "http://localhost:4000";

export class Socket {
    socket = socketIo(SERVER, {
        withCredentials: true,
        transports: ["websocket"],
    });
}
