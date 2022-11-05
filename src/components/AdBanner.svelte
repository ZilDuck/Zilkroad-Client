<script lang="ts">
  import LinkButton from '$components/LinkButton.svelte'
  import { onMount } from 'svelte'
  import SweepingGradient from './SweepingGradient.svelte'
  export let className = ''
  export let adtitle = 'Collection name'
  export let description = 'Enter your advert description here.'
  export let buttonText = 'Vist our link'
  export let background = '/images/ad-background.png'
  export let url = 'https://docs-testnet.zilkroad.io/features/adverts'
  export let contractAddress
  export let advert
  let loaded = false
  let valid = true

  onMount(async () => {
    const res = await fetch(`/banner.json`)
    advert = await res.json()
    if (advert?.advertise_start_unixtime === '') {
      valid = false
    }
    if (advert?.advertise_start_unixtime >= 0) {
      adtitle = advert.adtitle
      description = advert.description
      url = advert.advertise_uri
      contractAddress = advert.nonfungible_address
      background = advert.desktop_image_uri ?? advert.mobile_image_uri
    }
    loaded = true
  })
</script>

{#if valid}
  <section
    data-cy="banner-image"
    class="md:w-full h-[420px] rounded-lg flex flex-col mt-20 px-4 md:pr-0 md:pl-20 justify-center relative {className} overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full h-full blur-xl bg-cover mt-0"
      style="background-image: url('{background}')"
    />
    {#if loaded}
      <div class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]" />
      <div class="relative z-10 flex flex-col space-y-5">
        <h1 class="text-4xl font-medium">{adtitle}</h1>
        <p class="max-w-xl font-light text-white">{description}</p>
        <div class="flex items-center justify-start gap-5">
          <LinkButton className="w-min whitespace-nowrap" {url}>
            {buttonText}
          </LinkButton>
          {#if contractAddress}
            <LinkButton className="w-min whitespace-nowrap" url="/collections/{contractAddress}"
              >View the collection</LinkButton
            >
          {/if}
        </div>
      </div>
    {/if}
    {#if !loaded}
      <div class="h-16 w-48 rounded-lg overflow-hidden">
        <SweepingGradient />
      </div>
      <div class="h-12 w-56 rounded-lg overflow-hidden">
        <SweepingGradient />
      </div>
      <div class="h-12 w-36 rounded-lg overflow-hidden">
        <SweepingGradient />
      </div>
    {/if}
  </section>
{/if}
