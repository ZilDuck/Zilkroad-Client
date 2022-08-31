<script context="module">
</script>

<script>
  import ShapeImage from '$components/ShapeImage.svelte'
  import AdBanner from '$components/AdBanner.svelte'
  import Header from '$components/Header.svelte'
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40 mx-5">
  <h1 class="text-center text-5xl leading-[1.25] md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]">
    Component testing
  </h1>
</div>
<main class="space-y-28 mt-20 mx-5">
  <AdBanner
    className="md:mx-auto max-w-screen-xl"
    backgroundImage="/images/biomes-bg.png"
    adtitle="Bizarre Biomes"
    description="The first project on Zilliqa to give you the ability to view your NFTs. Pickup an Biome and claim your new home now."
    buttonText="Purchase a Bizarre Biome"
    url="https://bizarrebiomes.com/"
  />
  <AdBanner
    className="md:mx-auto max-w-screen-xl"
    backgroundImage="/images/ducks-bg.png"
    adtitle="Non Fungible Ducks"
    description="Grab one of your 8192 NFDs today by buying a duck through Zilkroad. Here you’ll find ducks of all varieties. Purchases and add a nice ducky to your collection"
    buttonText="Purchase a Non Fungible Duck"
    url="https://duck.community/"
  />
</main>
