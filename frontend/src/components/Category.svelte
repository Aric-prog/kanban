<script lang="ts">
  let { categoryName, activated = true } = $props()

  let check = $state(activated)
</script>
<button onclick={() => {check = !check}} class="text-xs font-ibmplex flex cursor-pointer items-center 
  px-2 border border-sketch transition border-primary
  {check ? "bg-primary text-complement": "text-primary"}">
  <span class=" text-lg material-icons material-symbols-outlined 
    border border-sketch text-complement
    {check ? " border-complement": "border-primary "}">
    check
  </span>
  <span class="text-ibmplex  text-lg px-2">
    { categoryName }
  </span>
</button>