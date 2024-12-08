<script lang="ts">
  import NoteCard from './components/NoteCard.svelte';
  import "./app.css";
  import "./assets/fonts.css"
  import "./assets/material-icons.css"
  import Header from './components/Header.svelte';
  import NoteColumn from './components/NoteColumn.svelte';
  import type Note from './types/Note';
  import type NoteStatus from './types/Note';
  
  let todoColumn: NoteColumn;
  let progressColumn: NoteColumn;
  let completedColumn: NoteColumn;
  
  const moveNote = (note: Note) => {
    console.log(note.noteStatus === "In progress")
    if(note.noteStatus === "To do") {todoColumn.addNote(note)}
    if(note.noteStatus === "In progress") {progressColumn.addNote(note)}
    if(note.noteStatus === "Completed") {completedColumn.addNote(note)}
  }
</script>

<main class="w-full max-w-screen min-h-screen bg-primary flex flex-col items-center">
  <Header />
  <div class="container flex flex-col md:flex-row md:flex-start gap-2"> 
    <NoteColumn moveNote={moveNote} categoryName="To do" bind:this={todoColumn}/>
    <NoteColumn moveNote={moveNote} categoryName="In progress" bind:this={progressColumn}/>
    <NoteColumn moveNote={moveNote} categoryName="Completed" bind:this={completedColumn}/>
  </div>
</main>

