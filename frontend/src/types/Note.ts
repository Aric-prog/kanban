export default interface Note {
    id: number;
    title: string;
    noteDescription: string | undefined;
    noteStatus: string;
    dueDate: number | undefined;
}
