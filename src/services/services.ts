import axios from "axios";
import { User } from "../types/types";
import {prodServerOrigin} from "../constants/constants";

export const api = axios.create({ baseURL: prodServerOrigin });

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
