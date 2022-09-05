<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte'
  export let className = ''
  export let adtitle = 'Collection name'
  export let description = 'Enter your advert description here.'
  export let buttonText = 'Vist our link'
  export let backgroundImage = 'images/ad-background.png'
  export let url = 'https://docs-testnet.zilkroad.io/docs/features/adverts'
  export let contractAddress
  const background = backgroundImage !== '' ? backgroundImage : 'images/ad-background.png'
</script>

<section
  class="md:w-full h-[420px] bg-cover rounded-lg flex flex-col space-y-5 px-4 md:pr-0 md:pl-20 justify-center {className}"
  style="background-image: url('{background}')"
>
  <div class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)]" />
  <div class="relative z-10 flex flex-col space-y-5">
    <h1 class="text-4xl font-medium">{adtitle}</h1>
    <p class="max-w-lg font-light text-white">{description}</p>
    <LinkButton className="w-min whitespace-nowrap" {url}>
      {buttonText}
    </LinkButton>
    {#if contractAddress}
      <LinkButton className="w-min whitespace-nowrap" {url}>View the collection</LinkButton>
    {/if}
  </div>
</section>
