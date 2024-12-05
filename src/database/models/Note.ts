export interface Note {
    id: number;
    title: string;
    noteDescription: string;
    noteStatus: NoteStatus;
    dueDate: number;
}

export type NoteStatus = "To do" | "In progress" | "Completed" | "Expired" | "Deleted";
