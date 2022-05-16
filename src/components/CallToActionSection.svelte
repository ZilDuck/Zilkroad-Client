<script lang="ts">
  import Button from '$components/Button.svelte'

  export let className = ''
  export let title = 'Feature your collection'
  export let description =
    'Make your collection stand out by becoming a featured collection on Zilkroad. You will get featured banners, the featured tick and more by featuring your collection.'
  export let buttonText = 'Feature your collection'
  export let backgroundImage = '/static/images/launchpad.png'
  const background =
    backgroundImage !== '' ? backgroundImage : '/static/images/launchpad.png'
</script>

<section
  class="md:w-full h-[420px] bg-cover rounded-lg flex flex-col space-y-5 px-4 md:pr-0 md:pl-20 justify-center {className}"
  style="background-image: url('{background}')"
>
  <h1 class="text-4xl font-medium">{title}</h1>
  <p class="max-w-lg font-light">{description}</p>
  <Button className="w-min whitespace-nowrap">
    {buttonText}
  </Button>
</section>
