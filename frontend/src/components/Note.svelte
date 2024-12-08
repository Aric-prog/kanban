<script lang="ts">
  import dayjs from 'dayjs';
  
  const statusColors: { [Key: string] : string} = {
    "Completed":"bg-emerald-200",
    "In progress": "bg-cyan-200",
    "To do" : "bg-amber-200"
  }

  let {noteId, noteStatus, noteTitle, dueDate, noteDescription} = $props();
  
  let editing: boolean = $state(false)

  let status: string = $state(noteStatus)
  let title: string = $state(noteTitle)
  let description: string = $state(noteDescription)
  let deadline: number = $state(dueDate)

  let backgroundColor = $derived(statusColors[status])
  let statusText = $derived(status.toUpperCase())
  let dateFormat = $derived(dayjs(deadline * 1000).format("DD/MM/YYYY").toString())
  let isDescriptionShown = $derived(description !== "" ? "" : "hidden")

  const applyChanges = () => {
    editing = false
  }
</script>

<div class="{backgroundColor} md:w-full grow-0 h-min transition p-2 mb-2">
  <div class=" w-full border-b flex justify-between border-complement p-1">
    <div class="break-words overflow-hidden w-full {editing ? "hidden" : ""}">{title} </div>
    <textarea class="break-words overflow-hidden w-full {editing ? "" : "hidden"}">{title} </textarea>
    <div class="shrink-0">
      <button class="{editing ? "invisible" : ""} material-icons material-symbols-outlined " onclick={() => {editing = !editing}}>edit</button>
      <button class="material-icons material-symbols-outlined">delete</button>
    </div>
  </div>
  <div class="border-complement p-1 text-xs font-ibmplex">{statusText} {deadline != 0 ? "| Due by: " + {dateFormat}: ""}</div>
  <div class="border-y w-100 border-complement p-1 break-words overflow-hidden {isDescriptionShown} {editing ? "hidden" : ""}">{description}</div>
  <div class="border-y w-100 border-complement p-1 break-words overflow-hidden {editing ? "" : "hidden"}" contenteditable="true" bind:innerHTML={description}></div>
  <div class="flex justify-end w-full p-2">
    <button class="{editing ? "" : "hidden"} bg-complement px-2 py-1 font-bold rounded text-primary" onclick={applyChanges}>Apply</button> 
  </div>
</div>