<script>
  import LinkButton from '$components/LinkButton.svelte'

  export let className = ''
</script>

<section class="grid md:grid-cols-2 md:px-5 md:px-0 {className}">
  <div class="flex flex-col justify-center space-y-5">
    <h2 class="text-4xl font-medium">Join our discord</h2>
    <p class="text-zilkroad-gray-light font-light max-w-[500px]">
      Become an active member of the community by joining our discord server. Here you’ll find all the information on
      new drops, features coming to the platform and more.
    </p>
    <LinkButton href="discord.gg/CJbgkYyPXB" className="w-min whitespace-nowrap">
      Join our discord
    </LinkButton>
  </div>
  <div class="hidden w-full h-full md:flex images">
    <img src="/images/join-discord.png" alt="blue waves aestethic" class="col-span-2 row-span-3 " />
  </div>
</section>

<style>
  .images img {
    @apply object-cover rounded-lg h-full w-full;
  }
</style>
