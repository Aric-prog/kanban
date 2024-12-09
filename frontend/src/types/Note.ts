export default interface Note {
    id: number | undefined;
    title: string;
    noteDescription: string | undefined;
    noteStatus: string;
    dueDate: number | undefined;
}
