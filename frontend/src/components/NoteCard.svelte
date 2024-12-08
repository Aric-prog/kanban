<script lang="ts">
  import dayjs from 'dayjs';
    import type Note from '../types/Note';
  
  const statusColors: { [Key: string] : string} = {
    "Completed":"bg-emerald-200",
    "In progress": "bg-cyan-200",
    "To do" : "bg-amber-200"
  };

  let { noteData, moveNote } : {noteData: Note, moveNote: (note: Note) => void} = $props();
  // This is to make it reactive
  let note: Note = $state({...noteData})
  let initialStatus = noteData.noteStatus;
  note.title = note.title.trim();
  note.noteDescription = note.noteDescription ?? "".trim();
  
  let mounted: boolean = $state(false)
  let editing: boolean = $state(false);
  let deleted: boolean = $state(false);
  let rootClass: string = $state("");
  let error: string = $state("");

  let isDescriptionShown = $derived(note.noteDescription !== "" ? "" : "hidden");
  
  let backgroundColor = $derived(statusColors[note.noteStatus]);
  let dateInput = $state(dayjs(note.dueDate ?? 0 * 1000).format("YYYY-MM-DD"));
  let dateFormat = $derived(dayjs(note.dueDate ?? 0 * 1000).format("DD-MM-YYYY"));

  let errorVisible = $derived(error === "" ? "hidden" : "");

  const applyChanges = () => {
    if(note.title === "")  {
      error = "Title cannot be empty";
      return;
    }
    error = "";
    editing = false;

    console.log(note.noteStatus, initialStatus)
    if(note.noteStatus !== initialStatus) {
      deleteSelf()
      moveNote(note)
    }
  };

  const updateDate = () => {
    note.dueDate = dayjs(dateInput, "YYYY-MM-DD").unix();
  };

  const deleteSelf = () => {
    deleted = true
    setTimeout(() => {
      rootClass += "hidden"
    }, 400);
  }

  setTimeout(() => {
    mounted=true
  }, 100)
</script>

<div class="root {backgroundColor} {rootClass} origin-top md:w-full grow-0 h-min ease-out transition-all duration-300 p-2 mb-2 
  {deleted ? "scale-y-0" : "scale-y-1"}
  {mounted ? "scale-y-1" : "scale-y-0"}"
  >
  <div class=" w-full border-b flex justify-between border-complement p-1">
    {#if !editing}
      <div class="break-words overflow-hidden w-full ">{note.title}</div>
    {:else if editing}
      <textarea required class="overflow-hidden transition-all duration-300 w-full text-start {backgroundColor}" bind:value={note.title}>{note.title}</textarea>
    {/if}

    <div class="shrink-0">
    {#if !editing}
      <button class="{editing ? "invisible" : ""} material-icons material-symbols-outlined " onclick={() => {editing = !editing}}>edit</button>
    {/if}
      <button class="material-icons material-symbols-outlined" onclick={deleteSelf}>delete</button>
    </div>
  </div>
    {#if !editing}
      <div class="border-complement p-1 text-xs font-ibmplex">{note.noteStatus.toUpperCase()} {note.dueDate != 0 ? "| Due by: " + dateFormat : ""}</div>
    {:else if editing}
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

    {#if !editing}
      <div class="border-y w-100 border-complement p-1 break-words overflow-hidden {isDescriptionShown} {editing ? "hidden" : ""}">{note.noteDescription}</div>
    {:else if editing}
      <textarea class="border-y w-full border-complement p-1 break-words overflow-hidden {backgroundColor} transition-all duration-300" bind:value={note.noteDescription}></textarea>
    {/if}

    {#if editing}
      <div class="flex justify-end w-full p-2">
        <button class="{editing ? "" : "hidden"} bg-complement px-2 py-1 font-bold rounded text-primary" onclick={applyChanges}>Apply</button> 
      </div>
    {/if}
  <div class="p-1 font-ibmplex text-red-600 {errorVisible}">{error}</div>
</div>