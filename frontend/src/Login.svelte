<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import "./app.css";
  import "./assets/fonts.css"
  import "./assets/material-icons.css"
</script>

<main class="w-full h-screen bg-primary flex flex-col">
  <nav class="text-brown font-bold flex border-b-2 justify-between border-l-0 p-2 pl-3 w-full border-complement border-sketch">
    <span>
      Room not joined yet
    </span>
    <button class="hidden material-symbols-outlined">logout</button>
  </nav>
  
  <div class="container p-2">
    <div class="flex w-full justify-center text-sm text-brown">Your room code :</div>
    <div class="flex w-full justify-center p-2 text-2xl text-brown font-bold ">ABCDEF</div>
    <div class="flex w-full justify-center text-sm text-brown py-2">Password : </div>
    <input type="password" class="w-full border border-complement rounded p-2 bg-primary focus:bg-white"/>
    <input type="submit" class="my-2 flex justify-center w-full border bg-complement text-primary font-bold border-complement rounded px-2 py-1"/>
  </div>
</main>

