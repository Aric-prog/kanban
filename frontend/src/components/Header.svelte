<script>
  import Category from "./Category.svelte";
</script>

<nav class="text-brown font-bold items-center flex justify-center border-b-2 border-l-0 px-3 py-2 w-full border-complement border-sketch">
<div class="container flex justify-between items-center">
  <span>
  Room code: ABCDEF
  </span>
  <button class="flex items-center">
    <div class="h-full align-middle material-icons material-symbols-outlined sm:mt-1">logout</div>
    <div class="hidden sm:block sm:px-1 mt-[2px]">Leave room</div>
  </button>
</div>
</nav>
<nav class="text-brown font-ibmplex bg-complement justify-center flex border-b-2 flex-start border-l-0 p-2 px-3 mb-2 mb-2 w-full border-complement">
<div class="container flex flex-col sm:flex-row sm:items-center gap-2">
  <span class="font-ibmplex text-primary sm:pr-3 text-sm">
    Category: 
  </span>
  <Category categoryName="To do" />
  <Category categoryName="In progress" />
  <Category categoryName="Completed" />
</div>
</nav>