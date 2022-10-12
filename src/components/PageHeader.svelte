<script lang="ts">
  export let title = 'The title.'
  export let description = 'A longer description for the title.'
</script>

<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40 mx-5">
  <h1
    class="text-4xl sm:text-5xl leading-relaxed md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]"
  >
    {title}
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white">{description}</p>
</div>
