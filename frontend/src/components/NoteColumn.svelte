<script lang="ts">
  import type Note from "../types/Note";
  import NoteCard from "./NoteCard.svelte";
  
  let { allNotes, categoryName, moveNote }: {
    allNotes: Note[], 
    categoryName: string, 
    moveNote: (note: Note) => void
  } = $props()
  
  let placeholder: Note = {
    id: -1,
    title: "",
    noteDescription: "",
    noteStatus: categoryName,
    dueDate: 0,
  }
  type NoteProps = {note: Note, editable: boolean};

  let notes: NoteProps[] = $state([]);
  
  for(const i of allNotes) {
    notes.push({note: i, editable: false});
  };

  export const addNote = (note: Note, editable: boolean = false) => {
    notes.push({note: note, editable: editable});
  };
  
  const addEmptyNote = () => {
    addNote(placeholder, true)
  }

</script>

<div class="md:w-1/3 lg:w-1/3">
  <span class="font-ibmplex ml-3 sm:m-0 text-complement border-b pb-1 border-complement">{categoryName}</span>
  <div class="column flex flex-col flex-wrap items-center py-2">
    {#each notes as note}
      <NoteCard noteData={note.note} moveNote={moveNote} editable={note.editable}/>
    {/each}
    <button class="material-icons material-symbols-outlined text-5xl w-min text-complement hover:invert transition" onclick={addEmptyNote}>
      add_circle
    </button>
  </div>
</div>