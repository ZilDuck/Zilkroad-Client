<script lang="ts">
  import Footer from '$components/Footer.svelte'
  import Toast from '$components/Toast.svelte'
  import '../app.css'
  import PreloadingComponent from '../components/PreloadingComponent.svelte'
  import { navigating } from '$app/stores'
  import CoolLine from '$components/CoolLine.svelte'
  import MobileNav from '$nav/MobileNav.svelte'
  import MobileMenu from '$nav/MobileMenu.svelte'
  import Navbar from '$nav/Navbar.svelte'
  export let className = ''
  export let light = false
  export let displayMenu = false
</script>

{#if $navigating}
  <PreloadingComponent />
{/if}

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="w-full">
  <div class="bg-black">
    <CoolLine bottom={false} {light}>
      <Navbar {light} />
      <MobileNav on:toggle={() => (displayMenu = !displayMenu)} />
    </CoolLine>
  </div>
  {#if displayMenu}
    <MobileMenu />
  {/if}
</div>
<slot />
<Footer />
<Toast />
