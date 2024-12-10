<script lang="ts">
  import type UserData from "../types/UserData";
  let { userData, logout }: {userData: UserData, logout: () => void}  = $props()
  
</script>
<nav class="text-brown font-bold items-center flex justify-center border-b-2 border-l-0 px-3 py-2 w-full border-complement border-sketch">
  <div class="container flex justify-between items-center">
    {#if userData.authenticated}
      <span>
        Room code: {userData.roomId}
      </span>
      <button class="flex items-center" onclick={logout}>
        <div class="h-full align-middle material-icons material-symbols-outlined sm:mt-1">logout</div>
        <div class="hidden sm:block sm:px-1 mt-[2px]">Leave room</div>
      </button>
    {:else if !userData.authenticated}
      <span>
        No room joined
      </span>
    {/if}
</div>
</nav>