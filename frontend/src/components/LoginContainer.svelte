<script lang="ts">
  import { authHandlers } from "../api/auth";
  import { getRoomCode } from "../api/room"

  let joining = $state(false)
  let inputEnabled = $state(true)
  let roomCode = $state(getRoomCode()) 
  let error = $state("")
  let roomCodeInput: string = $state("")
  let password = $state("")

  let { authenticate } = $props()

  const submit = async () => {
    inputEnabled = false
    let message = ""
    if(!joining) {
      message = await authHandlers.registerRoom(await roomCode, password)
    } else{
      message = await authHandlers.login(roomCodeInput, password)
    }
    
    if (message !== "") {
      inputEnabled = true
      error = message
    } else {
      authenticate()
    }
  }
  
  const toggleJoining = () => {
    joining = !joining
  }


  $effect(() => {
    roomCodeInput = roomCodeInput.toUpperCase()
    if(roomCodeInput.length == 6) return;
  })
  
</script>
<div class="container max-w-lg p-2">
  <div class="flex w-full justify-center text-sm text-brown">Your room code :</div>
  {#if joining}
    <input bind:value={roomCodeInput} maxlength="6" type="text" class="w-full border border-complement rounded p-2 bg-primary focus:bg-white"/>
  {:else if !joining}
    <div class="flex w-full justify-center p-2 text-2xl text-brown font-bold ">
      {#await roomCode}
        ... 
      {:then roomCode} 
        {roomCode}
      {/await}
    </div>
  {/if}
  
  <div class="flex w-full justify-center text-sm text-brown py-2">Password : </div>
  <input bind:value={password} type="password" disabled={!inputEnabled} class="transition w-full border border-complement rounded p-2 bg-primary focus:bg-white {inputEnabled ? "" : "bg-gray-400 animate-pulse"}"/>
  <input type="submit" value={joining ? "Join room": "Create room"} onclick={submit} class="my-2 flex cursor-pointer justify-center w-full border bg-complement text-primary font-bold border-complement rounded px-2 py-1"/>
  <button disabled={!inputEnabled} class="flex cursor-pointer w-full justify-center text-xs text-brown underline" onclick={toggleJoining}>{joining ? "Create room" : "Join room"} instead</button>
  <span class="text-red-500 text-complement">{error}</span>
</div>