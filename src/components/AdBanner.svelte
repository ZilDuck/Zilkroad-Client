<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte'
  export let className = ''
  export let title = 'Collection name'
  export let description = 'Enter your advert description here.'
  export let buttonText = 'Vist the collection'
  export let backgroundImage = '/images/launchpad.png'
  export let url = 'https://docs-testnet.zilkroad.io/docs/features/adverts'
  const background = backgroundImage !== '' ? backgroundImage : 'images/ad-background.png'
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
