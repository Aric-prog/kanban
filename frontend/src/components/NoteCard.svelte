<script lang="ts">
  import dayjs from 'dayjs';
    import type Note from '../types/Note';
    import { noteHandlers } from '../api/note';
  
  const statusColors: { [Key: string] : string} = {
    "Completed":"bg-emerald-200",
    "In progress": "bg-cyan-200",
    "To do" : "bg-amber-200"
  };

  let { noteData, moveNote, editable = false} : {
    noteData: Note, 
    moveNote: (note: Note) => void, 
    editable?: boolean} = $props();

  // This is to make it reactive
  let note: Note = $state({...noteData})
  let initialStatus = noteData.noteStatus;
  
  note.title = note.title.trim();
  note.noteDescription = note.noteDescription ?? "".trim();
  
  let mounted: boolean = $state(false)
  let deleted: boolean = $state(false);
  let rootClass: string = $state("");
  let error: string = $state("");
  
  let isDescriptionShown = $derived(note.noteDescription !== "" ? "" : "hidden");
  let backgroundColor = $derived(statusColors[note.noteStatus]);
  
  let dueDate = $state(note.dueDate)
  let currentEpoch = dayjs().unix()
  // svelte-ignore state_referenced_locally
  let dateInput = $state(dayjs((currentEpoch) * 1000).format("YYYY-MM-DD"));
  let dateText = $derived(dueDate ? "| Due by: " + dayjs(dueDate!! * 1000).format("DD-MM-YYYY") : "")

  let errorVisible = $derived(error === "" ? "hidden" : "");

  const applyChanges = async () => {
    if(note.title === "")  {
      error = "Title cannot be empty";
      return;
    }
    error = "";
    editable = false;

    if(note.id == -1) {
      await noteHandlers.createNote(note)
    } else {
      rootClass += "animate-pulse"
      await noteHandlers.updateNote(note)
    }

    rootClass = ""
    if(note.noteStatus !== initialStatus) {
      hideSelf()
      moveNote(note)
    }
  };

  const updateDate = () => {
    note.dueDate = dayjs(dateInput, "YYYY-MM-DD").unix();
    dueDate = dayjs(dateInput, "YYYY-MM-DD").unix()
  };

  const deleteSelf = async () => {
    hideSelf()
    note.noteStatus = "Deleted"
    await noteHandlers.updateNote(note)
  }
  const hideSelf = async () => {
    deleted = true
    setTimeout(() => {
      rootClass += "hidden"
    }, 400);
  }

  setTimeout(() => {
    mounted=true
  }, 100)
</script>

<div class="root {backgroundColor} {rootClass} origin-top w-full md:max-w-5xl grow-0 h-min ease-out transition-all duration-300 p-2 mb-2 
  {deleted ? "scale-y-0" : "scale-y-1"}
  {mounted ? "scale-y-1" : "scale-y-0"}"
  >
  <div class=" w-full border-b flex justify-between border-complement p-1">
    {#if !editable}
      <div class="break-words overflow-hidden w-full ">{note.title}</div>
    {:else if editable}
      <textarea required class="overflow-hidden transition-all duration-300 w-full text-start {backgroundColor}" bind:value={note.title}>{note.title}</textarea>
    {/if}

    <div class="shrink-0">
    {#if !editable}
      <button class="{editable ? "invisible" : ""} material-icons material-symbols-outlined hover:invert transition" onclick={() => {editable = !editable}}>edit</button>
    {/if}
      <button class="material-icons material-symbols-outlined hover:invert transition" onclick={deleteSelf}>delete</button>
    </div>
  </div>
    {#if !editable}
      <div class="border-complement p-1 text-xs font-ibmplex">{note.noteStatus.toUpperCase()} {dateText}</div>
    {:else if editable}
      <div class="border-complement p-1 text-xs font-ibmplex transition-all duration-300">
        <select class="{backgroundColor} transition-all duration-300" bind:value={note.noteStatus}>
          <option value="To do">TO DO</option>
          <option value="In progress">IN PROGRESS</option>
          <option value="Completed">COMPLETED</option>
        </select>
        | Due by: 
        <input type="date" placeholder="dd-mm-yyyy" onchange={updateDate} bind:value={dateInput}/>
      </div>
    {/if}

    {#if !editable}
      <div class="border-y w-100 border-complement p-1 break-words overflow-hidden {isDescriptionShown} {editable ? "hidden" : ""}">{note.noteDescription}</div>
    {:else if editable}
      <textarea class="border-y w-full border-complement p-1 break-words overflow-hidden {backgroundColor} transition-all duration-300" bind:value={note.noteDescription}></textarea>
    {/if}

    {#if editable}
      <div class="flex justify-end w-full p-2">
        <button onclick={applyChanges} class="transition material-icons material-symbols-outlined {editable ? "" : "hidden"} bg-complement px-2 py-1 font-bold rounded text-primary hover:text-complement hover:bg-primary">
          save
        </button>
      </div>
    {/if}
  <div class="p-1 font-ibmplex text-red-600 {errorVisible}">{error}</div>
</div>