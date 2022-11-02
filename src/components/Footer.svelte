<script>
  import CoolLine from './CoolLine.svelte'
  import Discord from './icons/Discord.svelte'
  import Telegram from './icons/Telegram.svelte'
  import Twitter from './icons/Twitter.svelte'
  export let className = 'mt-28'
  
  const thisYear = new Date().getFullYear()
</script>

<CoolLine top={true} bottom={true} {className}>
  <div class="mx-5">
    <footer class="py-20 mx-auto max-w-screen-xl grid md:grid-cols-4">
      <div>
        <h2>Zilkroad</h2>
        <ul>
          <li><a href={'/marketplace'}>Marketplace</a></li>
          <li><a href={'/collections'}>Collections</a></li>
          <li><a href={'/wallet-activity'}>Wallet activity</a></li>
          <!-- <li><a href={'/launchpad'}>Launchpad</a></li> -->
        </ul>
      </div>
      <div>
        <h2>Info</h2>
        <ul>
          <li>
            <a href={'https://docs-testnet.zilkroad.io'}>Documentation</a>
          </li>
          <li><a href={'/about-us'}>About us</a></li>
        </ul>
      </div>
      <div>
        <h2>Other</h2>
        <ul>
          <li><a href={'/privacy-policy'}>Privacy policy</a></li>
        </ul>
      </div>
      <div>
        <h2>Social</h2>
        <ul class="flex flex-row space-x-5 !space-y-0">
          <li><Discord /></li>
          <li><Twitter /></li>
        </ul>
      </div>
    </footer>
  </div>
</CoolLine>

<div class="mx-5"><p class="py-10 mx-auto max-w-screen-xl">© {thisYear} Zilkroad</p></div>

<style lang="postcss">
  footer > div:first-of-type {
    @apply mt-0;
  }
  footer > div {
    @apply mt-10 md:mt-0;
  }
  footer > div > h2 {
    @apply font-medium;
  }
  ul > li > a {
    @apply font-light text-zilkroad-gray-light;
  }

  ul {
    @apply space-y-5 pt-5;
  }
</style>
