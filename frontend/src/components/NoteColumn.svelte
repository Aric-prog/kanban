<script lang="ts">
  import type Note from "../types/Note";
  import NoteCard from "./NoteCard.svelte";
  let { categoryName, moveNote } = $props()
  
  let lol: Note = {
    id: 0,
    title: "asdf",
    noteDescription: "undefined",
    noteStatus: "To do",
    dueDate: 123
  }

  let notes: Note[] = $state([lol])

  export const addNote = (note: Note) => {
    notes.push(note)
  }
</script>

<div class="md:w-1/3 lg:w-1/4">
  <span class="font-ibmplex ml-3 sm:m-0 text-complement border-b pb-1 border-complement">{categoryName}</span>
  <div class="column flex flex-col flex-wrap py-2">
    {#each notes as note}
      <NoteCard noteData={note} moveNote={moveNote} />
    {/each}
  </div>
</div>