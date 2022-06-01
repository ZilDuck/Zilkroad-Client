<script>
  import ShapeImage from '$components/ShapeImage.svelte'
  import Header from '$components/Header.svelte'
  import JoinDiscord from '$components/JoinDiscord.svelte'

  // Team details
  const team = [
    {
      name: 'Nines',
      role: 'Founder & CEO',
      duck: '3'
    },
    {
      name: 'Bucko',
      role: 'Founder & Artist',
      duck: '2'
    },
    {
      name: '50Cal',
      role: 'Founder & Lead Designer',
      duck: '5'
    },
    {
      name: 'Badman',
      role: 'Founder & Lead Back-End Developer',
      duck: '1'
    },
    {
      name: 'Nicfusc',
      role: 'Founder & Lead Front-End Developer',
      duck: '6'
    },
    {
      name: 'Prodpeak',
      role: 'Founder & Lead Blockchain Developer',
      duck: '4'
    }
  ]
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40 mx-5 mb-[120px]">
  <h1 class="text-center text-5xl leading-[1.25] md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]">
    About us
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white text-center max-w-[860px]">
    Zilkroad is a creation made by a bunch of people wanting to make the best NFT marketplace for the Zilliqa
    blockchain. We are striving to create a product that enhances the experience for everyone using Zilliqa. The
    marketplace is made by a team of 8 people, with decades of collective experience.
  </p>
</div>

<main class="space-y-28 mx-5">
  <!-- <div class="grid grid-cols-1 gap-[24px] max-w-screen-xl md:mx-auto md:grid-cols-2">
    <div>
      <h2 class="text-4xl font-semibold text-white mb-5">What is Zilkroad?</h2>
      <p>
        Zilkroad is a creation made by a bunch of people wanting to make the best NFT marketplace for the Ziliqa chain.
        We are striving to create a product that enhances the experience for everyone using Zilliqa. The marketplace is
        made by a team of 8 people, with decades of collective experience.
      </p>
    </div>
    <div />
  </div> -->

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-screen-xl md:mx-auto">
    {#each team as teamMember}
      <div class="flex flex-col">
        <img
          src={`/static/images/team/${teamMember.duck}.png`}
          alt={teamMember.name + ' duck'}
          class="max-w-[100%] mb-5 rounded-lg"
        />
        <h3 class="text-white text-xl font-semibold">{teamMember.name}</h3>
        <p class="">{teamMember.role}</p>
      </div>
    {/each}
  </div>

  <JoinDiscord className="mx-auto max-w-screen-xl" />
</main>
