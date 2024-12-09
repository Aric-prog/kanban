<script lang="ts">
  import "./app.css";
  import "./assets/fonts.css"
  import "./assets/material-icons.css"
  import Header from './components/Header.svelte';
  import LoginContainer from "./components/LoginContainer.svelte";
  
  import { authHandlers } from "./api/auth";
  import NoteContainer from "./components/NoteContainer.svelte";

  let userData = $state(authHandlers.checkAuth())
  
  let logout = async () => {
    userData = Promise.resolve({authenticated: false})
    authHandlers.logout()
  }

  let authenticate = () => {
    userData = authHandlers.checkAuth()
  }
</script>

<main class="w-full max-w-screen min-h-screen bg-primary flex flex-col items-center">
  {#await userData}
    <span class="flex h-screen justify-center items-center">Loading data...</span>   
  {:then userData} 
    <Header userData={userData} logout={logout}/>
    {#if userData.authenticated}
      <NoteContainer allNotes={userData.notes!!} roomId={userData.roomId!!} />
    {:else}
      <LoginContainer authenticate={authenticate}/>  
    {/if}
  {/await}
</main>

