<script lang="ts">
  export let collection: {
    name: string
    verified: {
      '3_4_image': string
      description: string
    }
  }

  export let className = ''
</script>

<article class="relative w-full before:pt-[90%] before:block {className}">
  <img
    src={collection.verified['3_4_image']}
    alt={collection.name}
    class="w-full h-full object-cover rounded-lg z-[-1] absolute top-0 left-0"
    width="300"
    height="400"
  />
  <div class="px-10 pb-10">
    <h1 class="text-2xl font-medium">{collection.name}</h1>
    <p class="mt-5">{collection.verified.description}</p>
  </div>
</article>
