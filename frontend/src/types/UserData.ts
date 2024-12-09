import type Note from "./Note";

export default interface UserData {
    authenticated: boolean;
    roomId?: string;
    notes?: Note[];
}
