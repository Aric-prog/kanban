import { ROOT_URL } from "../config/constants";

export const getRoomCode = async () => {
    const response = await fetch(`${ROOT_URL}/api/room`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const roomId = (await response.json()).message;
    return roomId;
};
