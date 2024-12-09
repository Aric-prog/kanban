<script lang="ts">
  import type Note from "../types/Note";
  import Category from "./Category.svelte";
  import NoteColumn from "./NoteColumn.svelte";

  let { allNotes, roomId }: {allNotes: Note[], roomId: string} = $props();

  let todoColumn: NoteColumn;
  let progressColumn: NoteColumn;
  let completedColumn: NoteColumn;

  let todoNotes: Note[] = $state([])
  let inProgressNotes: Note[] = $state([])
  let completedNotes: Note[] = $state([])
  
  for(const i of allNotes) {
    if(i.noteStatus === "To do") {todoNotes.push(i)}
    else if(i.noteStatus === "In progress") {inProgressNotes.push(i)}
    else if(i.noteStatus === "Completed") {completedNotes.push(i)}
  }
  
  const moveNote = (note: Note, editable: boolean = false) => {
    if(note.noteStatus === "To do") {todoColumn.addNote(note, editable)}
    else if(note.noteStatus === "In progress") {progressColumn.addNote(note, editable)}
    else if(note.noteStatus === "Completed") {completedColumn.addNote(note, editable)}
  }
</script>

<nav class="text-brown font-ibmplex bg-complement justify-center flex border-b-2 flex-start border-l-0 p-2 px-3 mb-2 mb-2 w-full border-complement">
  <div class="container flex flex-col sm:flex-row sm:items-center gap-2">
  <span class="font-ibmplex text-primary sm:pr-3 text-sm">
      Category: 
  </span>
  <Category categoryName="To do" />
  <Category categoryName="In progress" />
  <Category categoryName="Completed" />
  </div>
</nav>
<div class="container flex flex-col md:flex-row md:flex-start gap-2"> 
  <NoteColumn allNotes={todoNotes} moveNote={moveNote} categoryName="To do" bind:this={todoColumn}/>
  <NoteColumn allNotes={inProgressNotes} moveNote={moveNote} categoryName="In progress" bind:this={progressColumn}/>
  <NoteColumn allNotes={completedNotes} moveNote={moveNote} categoryName="Completed" bind:this={completedColumn}/>
</div>