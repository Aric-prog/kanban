import { ROOT_URL } from "../config/constants";
import type Note from "../types/Note";
import type UserData from "../types/UserData";
import { authHandlers } from "./auth";

export const noteHandlers = {
    createNote: async (note: Note) => {
        const token = localStorage.getItem("auth")!!;
        note.id = undefined;
        const response = await fetch(`${ROOT_URL}/api/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ note: note }),
        });
        const newNote: Note = (await response.json()).note;
        return newNote.id;
    },
    updateNote: async (note: Note) => {
        const token = localStorage.getItem("auth")!!;
        const response = await fetch(`${ROOT_URL}/api/note`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ note: note }),
        });
        const newNote: Note = (await response.json()).note;
        return newNote;
    },
};
