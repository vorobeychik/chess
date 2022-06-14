import axios from "axios";
import { User } from "../types/types";

export const api = axios.create({ baseURL: "http://localhost:4000" });

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
