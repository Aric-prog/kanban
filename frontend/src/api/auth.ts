import { ROOT_URL } from "../config/constants";
import type UserData from "../types/UserData";

export const authHandlers = {
    registerRoom: async (roomCode: string, password: string) => {
        const response = await fetch(`${ROOT_URL}/api/room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId: roomCode, password: password }),
        });
        const output = await response.json();
        if (response.status !== 200) return output.message;

        localStorage.setItem("auth", `Bearer ${output.token}`);
        localStorage.setItem("roomId", `${output.roomId}`);
        return "";
    },

    login: async (roomCode: string, password: string) => {
        const response = await fetch(`${ROOT_URL}/api/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId: roomCode, password: password }),
        });
        const tokenData = await response.json();
        if (response.status != 200) return tokenData.message;

        localStorage.setItem("auth", `Bearer ${tokenData.token}`);
        localStorage.setItem("roomId", JSON.stringify({}));
        return "";
    },

    logout: () => {
        localStorage.removeItem("roomId");
        localStorage.removeItem("auth");
    },

    checkAuth: async (): Promise<UserData> => {
        const token = localStorage.getItem("auth");

        if (!token) return { authenticated: false };
        if (!token.split(" ").length) return { authenticated: false };

        const response = await fetch(`${ROOT_URL}/api/note`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (response.status != 200) return { authenticated: false };

        const { roomId, notes } = await response.json();
        return { authenticated: true, roomId: roomId, notes: notes };
    },
};
