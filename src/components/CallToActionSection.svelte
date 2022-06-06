<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte'

  export let className = ''
  export let title = 'Feature your collection'
  export let description =
    'Make your collection stand out by becoming a featured collection on Zilkroad. You will get featured banners, the featured tick and more by featuring your collection.'
  export let buttonText = 'Feature your collection'
  export let backgroundImage = '/images/launchpad.png'
  export let url = 'https://docs-testnet.zilkroad.io/docs/features/adverts'
  const background = backgroundImage !== '' ? backgroundImage : 'images/launchpad.jpg'
</script>

<section
  class="md:w-full h-[420px] bg-cover rounded-lg flex flex-col space-y-5 px-4 md:pr-0 md:pl-20 justify-center {className}"
  style="background-image: url('{background}')"
>
  <h1 class="text-4xl font-medium">{title}</h1>
  <p class="max-w-lg font-light text-white">{description}</p>
  <LinkButton className="w-min whitespace-nowrap" {url}>
    {buttonText}
  </LinkButton>
</section>
