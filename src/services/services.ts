import axios from "axios";
import { User } from "../types/types";
import {devServerOrigin, prodServerOrigin} from "../constants/constants";

const server =  prodServerOrigin;

export const api = axios.create({ baseURL:server});

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
