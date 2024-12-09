import { body } from "express-validator";

export interface Note {
    id: number;
    title: string;
    noteDescription: string;
    noteStatus: NoteStatus;
    dueDate: number;
    roomId: string;
}

export type NoteStatus = "To do" | "In progress" | "Completed" | "Expired" | "Deleted";

// const validator = () => {
//     return [
//         body("", "paperId field does not exist").exists(),
//         body("bidAmount", "bidAmount field does not exist").exists(),
//         body("bidAmount", "bidAmount field has to be larger than 0").isInt({ min: 1 }),
//     ];
// };
