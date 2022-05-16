<script>
  export let collection;
</script>

<article class="relative w-full before:pt-[90%] before:block">
  <img
    src="https://cdn.discordapp.com/attachments/863213867797577728/880546001373511720/ezgif.com-gif-maker_25.gif"
    alt={collection.name}
    class="w-full h-full object-cover rounded-lg z-[-1] absolute top-0 left-0"
    width="300"
    height="400"
  />
  <div class="px-10 pb-10">
    <h1 class="text-2xl font-medium">{collection.name}</h1>
    <p class="mt-5">{collection.description}</p>
  </div>
</article>