<script>
  import Button from '$components/Button.svelte'

  export let className = ''
</script>

<section class="grid md:grid-cols-2 md:px-5 md:px-0 {className}">
  <div class="flex flex-col justify-center space-y-5">
    <h2 class="text-4xl font-medium">Join our discord</h2>
    <p class="text-zilkroad-gray-light font-light max-w-[500px]">
      Become an active member of the community by joining our discord server.
      Here you’ll find all the information on new drops, features coming to the
      platform and more.
    </p>
    <Button
      textColor="text-gray-zilkroad-dark"
      className="w-min whitespace-nowrap"
    >
      Join our discord
    </Button>
  </div>
  <div
    class="hidden w-full h-full md:grid grid-cols-3 grid-rows-[130px] gap-6 images"
  >
    <img
      src="https://cdn.discordapp.com/attachments/881284549433233428/919935609760522310/unknown.png"
      alt="blue waves aestethic"
      class="col-span-2 row-span-3 "
    />
    <img
      src="https://cdn.discordapp.com/attachments/843210402754330674/919993236372738089/unknown.png"
      alt="a e s t h e t i c"
    />
    <img
      src="https://cdn.discordapp.com/attachments/843210402754330674/919993269495152720/unknown.png"
      alt="a e s t h e t i c"
      class="row-span-2"
    />
  </div>
</section>

<style>
  .images img {
    @apply object-cover rounded-lg h-full w-full;
  }
</style>
